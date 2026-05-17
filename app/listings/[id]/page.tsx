import { and, eq } from "drizzle-orm";
<<<<<<< Updated upstream
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DeleteListingButton } from "@/components/listings/delete-listing-button";
import { ListingDetail } from "@/components/listings/listing-detail";
import { ListingPhotoGrid } from "@/components/listings/listing-photo-grid";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { listingPhotos, listings as listingsTable } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
=======
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ListingDetail } from "@/components/listings/listing-detail";
import { ListingPhotoGrid } from "@/components/listings/listing-photo-grid";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Typography } from "@/components/ui/typography";
import { db } from "@/lib/db";
import { listingPhotos, listings as listingsTable } from "@/lib/db/schema";
>>>>>>> Stashed changes

export interface ListingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
<<<<<<< Updated upstream
  const { user } = await validateRequest();
=======
>>>>>>> Stashed changes

  const listing = await db.query.listings.findFirst({
    where: and(eq(listingsTable.id, id), eq(listingsTable.status, "active")),
    with: {
      photos: {
        orderBy: [listingPhotos.sortOrder],
      },
      user: true,
    },
  });

  if (!listing) {
    notFound();
  }

<<<<<<< Updated upstream
  const isOwner = user?.id === listing.userId;

  return (
    <Container>
      <main className="py-6 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="space-y-4">
            <div>
              <Link
                className={cn(
                  buttonVariants({
                    className: "px-0",
                    variant: "link",
                  }),
                )}
                href="/listings"
              >
                <ArrowLeftIcon />
                Back to listings
              </Link>
=======
  return (
    <Container className="max-w-none px-0">
      <main>
        <header className="flex h-14 items-center gap-2 border-b px-4 md:hidden">
          <SidebarTrigger />
          <Typography variant="label">Listings</Typography>
        </header>

        <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="space-y-4">
            <div className="space-y-2">
              <Button asChild className="px-0" variant="link">
                <Link href="/listings">
                  <ArrowLeftIcon />
                  Back to listings
                </Link>
              </Button>
>>>>>>> Stashed changes
            </div>

            <ListingPhotoGrid listing={listing} />
          </section>

<<<<<<< Updated upstream
          <aside className="space-y-3 lg:sticky lg:top-6 lg:self-start">
            <ListingDetail listing={listing} />
            {isOwner ? (
              <div className="bg-card space-y-2 rounded-lg border p-5">
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      className: "w-full",
                    }),
                  )}
                  href={`/listings/${listing.id}/edit`}
                >
                  <PencilIcon />
                  Edit listing
                </Link>
                <DeleteListingButton listingId={listing.id} />
              </div>
            ) : null}
=======
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <ListingDetail listing={listing} />
>>>>>>> Stashed changes
          </aside>
        </div>
      </main>
    </Container>
  );
}
