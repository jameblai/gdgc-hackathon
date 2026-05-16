import { desc, eq } from "drizzle-orm";

import { ListingCard } from "@/components/listings/listing-card";
import { Container } from "@/components/ui/container";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Typography } from "@/components/ui/typography";
import { db } from "@/lib/db";
import { listingPhotos, listings as listingsTable } from "@/lib/db/schema";

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
    <Container className="max-w-none px-0">
      <main>
        <header className="flex h-14 items-center gap-2 border-b px-4 md:hidden">
          <SidebarTrigger />
          <Typography variant="label">Listings</Typography>
        </header>

        <div className="p-4 md:p-6">
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
