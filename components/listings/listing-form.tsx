"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImageIcon, Trash2Icon, XIcon } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useAction } from "next-safe-action/hooks";

import {
  createListingAction,
  updateListingAction,
} from "@/lib/listings/actions";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/ui/typography";
import type {
  ListingCategory,
  ListingPhoto,
  ListingWithPhotos,
} from "@/lib/db/types";

import { categoryLabels } from "./utils";

type UploadedListingImage = {
  fileKey: string;
  url: string;
};

type ListingFormValues = {
  category: ListingCategory;
  description: string;
  location: string;
  name: string;
};

type EditListing = ListingWithPhotos & {
  photos: ListingPhoto[];
};

type ListingFormProps =
  | {
      mode: "create";
    }
  | {
      listing: EditListing;
      mode: "edit";
    };

const categoryOptions: ListingCategory[] = [
  "medical",
  "food",
  "apparel",
  "electronics",
  "entertainment",
];

function renderFieldErrors(errors: unknown[]) {
  if (errors.length === 0) {
    return null;
  }

  return <FieldError>{String(errors[0])}</FieldError>;
}

function ListingForm(props: ListingFormProps) {
  const router = useRouter();
  const createAction = useAction(createListingAction, {
    onSuccess: ({ data }) => {
      if (data && "id" in data) {
        router.push(`/listings/${data.id}`);
      }
    },
  });
  const updateAction = useAction(updateListingAction, {
    onSuccess: ({ data }) => {
      if (data && "id" in data) {
        router.push(`/listings/${data.id}`);
      }
    },
  });
  const [existingPhotos, setExistingPhotos] = useState<ListingPhoto[]>(
    props.mode === "edit" ? props.listing.photos : [],
  );
  const [uploadedImages, setUploadedImages] = useState<UploadedListingImage[]>(
    [],
  );
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const totalImages = existingPhotos.length + uploadedImages.length;
  const isPending = createAction.isPending || updateAction.isPending;
  const actionError =
    props.mode === "edit" &&
    updateAction.result.data &&
    "error" in updateAction.result.data
      ? updateAction.result.data.error
      : undefined;

  const form = useForm({
    defaultValues: {
      category: props.mode === "edit" ? props.listing.category : "medical",
      description: props.mode === "edit" ? props.listing.description : "",
      location: props.mode === "edit" ? props.listing.location : "",
      name: props.mode === "edit" ? props.listing.name : "",
    } satisfies ListingFormValues,
    onSubmit: ({ value }) => {
      if (props.mode === "create") {
        createAction.execute({
          ...value,
          images: uploadedImages,
        });
        return;
      }

      updateAction.execute({
        ...value,
        existingPhotoIds: existingPhotos.map((photo) => photo.id),
        id: props.listing.id,
        images: uploadedImages,
      });
    },
  });

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              value.trim().length === 0 ? "Enter a listing name." : undefined,
          }}
        >
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                value={field.state.value}
              />
              {renderFieldErrors(field.state.meta.errors)}
            </Field>
          )}
        </form.Field>

        <form.Field
          name="location"
          validators={{
            onChange: ({ value }) =>
              value.trim().length === 0 ? "Enter a location." : undefined,
          }}
        >
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Location</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                value={field.state.value}
              />
              {renderFieldErrors(field.state.meta.errors)}
            </Field>
          )}
        </form.Field>

        <form.Field name="category">
          {(field) => (
            <Field>
              <FieldLabel>Category</FieldLabel>
              <Select
                onValueChange={(value) =>
                  field.handleChange(value as ListingCategory)
                }
                value={field.state.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>{categoryLabels[field.state.value]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category} value={category}>
                      {categoryLabels[category]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        </form.Field>

        <form.Field
          name="description"
          validators={{
            onChange: ({ value }) =>
              value.trim().length === 0 ? "Enter a description." : undefined,
          }}
        >
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Textarea
                className="min-h-32"
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                value={field.state.value}
              />
              {renderFieldErrors(field.state.meta.errors)}
            </Field>
          )}
        </form.Field>

        <Field>
          <FieldLabel>Images</FieldLabel>
          <FieldDescription>
            Upload up to 6 images. Uploaded images are saved when you submit the
            listing.
          </FieldDescription>

          {totalImages > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {existingPhotos.map((photo) => (
                <div
                  className="bg-muted relative aspect-4/3 overflow-hidden rounded-md border"
                  key={photo.id}
                >
                  <Image
                    alt="Listing image"
                    className="size-full object-cover"
                    fill
                    sizes="(min-width: 1024px) 240px, 50vw"
                    src={photo.url}
                  />
                  <Button
                    aria-label="Remove image"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      setExistingPhotos((photos) =>
                        photos.filter((item) => item.id !== photo.id),
                      )
                    }
                    size="icon"
                    type="button"
                    variant="secondary"
                  >
                    <XIcon />
                  </Button>
                </div>
              ))}

              {uploadedImages.map((image) => (
                <div
                  className="bg-muted relative aspect-4/3 overflow-hidden rounded-md border"
                  key={image.fileKey}
                >
                  <Image
                    alt="Uploaded listing image"
                    className="size-full object-cover"
                    fill
                    sizes="(min-width: 1024px) 240px, 50vw"
                    src={image.url}
                  />
                  <Button
                    aria-label="Remove uploaded image"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      setUploadedImages((images) =>
                        images.filter((item) => item.fileKey !== image.fileKey),
                      )
                    }
                    size="icon"
                    type="button"
                    variant="secondary"
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground flex aspect-4/1 min-h-28 items-center justify-center rounded-md border border-dashed">
              <ImageIcon className="size-5" />
            </div>
          )}

          {totalImages < 6 ? (
            <UploadDropzone
              endpoint="listingImageUploader"
              onClientUploadComplete={(files) => {
                const availableSlots = 6 - totalImages;
                setUploadedImages((images) => [
                  ...images,
                  ...files.slice(0, availableSlots).map((file) => ({
                    fileKey: file.key,
                    url: file.url,
                  })),
                ]);
                setIsUploading(false);
              }}
              onUploadBegin={() => {
                setUploadError(null);
                setIsUploading(true);
              }}
              onUploadError={(error) => {
                setUploadError(error.message);
                setIsUploading(false);
              }}
            />
          ) : (
            <Typography variant="smallMuted">
              This listing already has the maximum number of images.
            </Typography>
          )}
          {uploadError ? <FieldError>{uploadError}</FieldError> : null}
        </Field>
      </FieldGroup>

      {actionError ? <FieldError>{actionError}</FieldError> : null}

      <Button
        className="w-full"
        disabled={isPending || isUploading}
        size="lg"
        type="submit"
      >
        {isPending
          ? "Saving..."
          : props.mode === "create"
            ? "Create listing"
            : "Save changes"}
      </Button>
    </form>
  );
}

export { ListingForm };
