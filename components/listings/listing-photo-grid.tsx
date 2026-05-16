import Image from "next/image";

import type { ListingWithUserAndPhotos } from "@/lib/db/types";

import { ListingImage } from "./listing-image";

function ListingPhotoGrid({ listing }: { listing: ListingWithUserAndPhotos }) {
  if (listing.photos.length === 0) {
    return (
      <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-lg border">
        <ListingImage listing={listing} />
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {listing.photos.map((photo, index) => (
        <div
          className="bg-muted relative aspect-[4/3] overflow-hidden rounded-lg border"
          key={photo.id}
        >
          <Image
            alt={listing.name}
            className="size-full"
            fill
            loading={index === 0 ? "eager" : "lazy"}
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
            src={photo.url}
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}

export { ListingPhotoGrid };
