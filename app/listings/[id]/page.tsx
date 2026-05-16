import { and, eq } from "drizzle-orm";
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

export interface ListingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;

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
            </div>

            <ListingPhotoGrid listing={listing} />
          </section>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <ListingDetail listing={listing} />
          </aside>
        </div>
      </main>
    </Container>
  );
}
