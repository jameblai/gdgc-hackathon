import {
  FlagIcon,
  MapPinIcon,
  MessageSquareIcon,
  Share2Icon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import type { ListingWithUserAndPhotos } from "@/lib/db/types";

import { getInitials } from "./utils";
import Link from "next/link";

function ListingDetail({ listing }: { listing: ListingWithUserAndPhotos }) {
  return (
    <aside className="bg-card rounded-lg border">
      <div className="space-y-4 p-5">
        <div>
          <Typography variant="h2">{listing.name}</Typography>
          <Typography
            className="mt-1 flex items-center gap-1"
            variant="smallMuted"
          >
            <MapPinIcon className="size-3.5" />
            {listing.location}
          </Typography>
        </div>

        <Link
          className={cn(buttonVariants({ size: "lg", className: "w-full" }))}
          href="/features/chats"
        >
          <MessageSquareIcon />
          Send Offer
        </Link>

        <div className="-mt-2 grid grid-cols-2 gap-2">
          <Button variant="outline">
            <Share2Icon />
            Share
          </Button>
          <Button variant="outline">
            <FlagIcon />
            Report
          </Button>
        </div>

        <Separator />

        <section>
          <Typography className="leading-relaxed" variant="small">
            {listing.description}
          </Typography>
        </section>

        <Separator />

        <section>
          <Link
            className="flex items-center gap-2"
            href="/features/profilePage"
          >
            <Avatar size="lg">
              {listing.user.avatarUrl ? (
                <AvatarImage
                  alt={listing.user.name}
                  src={listing.user.avatarUrl}
                />
              ) : null}
              <AvatarFallback>{getInitials(listing.user.name)}</AvatarFallback>
            </Avatar>
            <Typography>{listing.user.name}</Typography>
          </Link>
        </section>
      </div>
    </aside>
  );
}

export { ListingDetail };
