import Image from "next/image";

import { Typography } from "@/components/ui/typography";
import type { ListingWithUserAndPhotos } from "@/lib/db/types";
import { cn } from "@/lib/utils";

function ListingImage({
  listing,
  className,
  loading = "lazy",
  sizes = "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  className?: string;
  listing: ListingWithUserAndPhotos;
  loading?: "eager" | "lazy";
  sizes?: string;
}) {
  const photo = listing.photos[0];

  if (photo) {
    return (
      <Image
        alt={listing.name}
        className={cn("size-full", className)}
        fill
        loading={loading}
        sizes={sizes}
        src={photo.url}
        style={{ objectFit: "cover" }}
      />
    );
  }

  return (
    <div
      className={cn(
        "bg-muted text-muted-foreground flex size-full items-center justify-center",
        className,
      )}
    >
      <Typography variant="smallMuted">No image</Typography>
    </div>
  );
}

export { ListingImage };
