import Link from "next/link";
import { MapPinIcon } from "lucide-react";

import { Typography } from "@/components/ui/typography";
import type { ListingWithUserAndPhotos } from "@/lib/db/types";
import { cn } from "@/lib/utils";

import { ListingImage } from "./listing-image";
import { categoryLabels } from "./utils";

function ListingCard({
  imageLoading,
  isActive = false,
  listing,
}: {
  imageLoading?: "eager" | "lazy";
  isActive?: boolean;
  listing: ListingWithUserAndPhotos;
}) {
  return (
    <Link
      className="focus-visible:ring-ring block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      href={`/listings/${listing.id}`}
    >
      <article
        className={cn(
          "bg-card hover:bg-muted/40 overflow-hidden rounded-lg border transition-colors",
          isActive && "border-primary ring-primary/20 ring-2",
        )}
      >
        <div className="bg-muted relative aspect-[4/3] overflow-hidden">
          <ListingImage listing={listing} loading={imageLoading} />
        </div>
        <div className="space-y-2 p-4">
          <div>
            <Typography variant="h3">{listing.name}</Typography>
            <Typography
              className="mt-1 flex items-center gap-1"
              variant="smallMuted"
            >
              <MapPinIcon className="size-3.5" />
              {listing.location}
            </Typography>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Typography variant="muted">
              {categoryLabels[listing.category]}
            </Typography>
            <Typography variant="muted">By {listing.user.name}</Typography>
          </div>
        </div>
      </article>
    </Link>
  );
}

export { ListingCard };
