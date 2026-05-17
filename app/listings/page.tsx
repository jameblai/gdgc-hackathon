<<<<<<< Updated upstream
import Link from "next/link";
import { PlusIcon } from "lucide-react";

import { ListingCard } from "@/components/listings/listing-card";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { db } from "@/lib/db";
import { listingPhotos, listings as listingsTable } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
=======
import { desc, eq } from "drizzle-orm";

import { ListingCard } from "@/components/listings/listing-card";
import { Container } from "@/components/ui/container";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Typography } from "@/components/ui/typography";
import { db } from "@/lib/db";
import { listingPhotos, listings as listingsTable } from "@/lib/db/schema";
>>>>>>> Stashed changes

export const dynamic = "force-dynamic";

export default async function ListingsPage() {
  const listings = await db.query.listings.findMany({
    orderBy: [desc(listingsTable.createdAt)],
    where: eq(listingsTable.status, "active"),
    with: {
      photos: {
        orderBy: [listingPhotos.sortOrder],
      },
      user: true,
    },
  });

  return (
<<<<<<< Updated upstream
    <Container>
      <main className="space-y-8 py-6 md:py-10">
        <div className="space-y-8">
          <section className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Typography variant="h1">Listings</Typography>
              <Typography variant="lead">
                Browse active marketplace listings or create your own.
              </Typography>
            </div>
            <Link
              className={cn(
                buttonVariants({
                  variant: "default",
                }),
              )}
              href="/listings/new"
            >
              <PlusIcon />
              New Listing
            </Link>
          </section>

=======
    <Container className="max-w-none px-0">
      <main>
        <header className="flex h-14 items-center gap-2 border-b px-4 md:hidden">
          <SidebarTrigger />
          <Typography variant="label">Listings</Typography>
        </header>

        <div className="p-4 md:p-6">
>>>>>>> Stashed changes
          <section className="space-y-4">
            {listings.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {listings.map((listing, index) => (
                  <ListingCard
                    imageLoading={index === 0 ? "eager" : "lazy"}
                    key={listing.id}
                    listing={listing}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <Typography variant="h3">No active listings</Typography>
                <Typography className="mt-1" variant="smallMuted">
                  Create a new listing to get started.
                </Typography>
              </div>
            )}
          </section>
        </div>
      </main>
    </Container>
  );
}
