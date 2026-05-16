import { and, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

import { ListingForm } from "@/components/listings/listing-form";
import { Container } from "@/components/ui/container";
import { Typography } from "@/components/ui/typography";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { listingPhotos, listings as listingsTable } from "@/lib/db/schema";

export interface EditListingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditListingPage({
  params,
}: EditListingPageProps) {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;
  const listing = await db.query.listings.findFirst({
    where: and(eq(listingsTable.id, id), eq(listingsTable.userId, user.id)),
    with: {
      photos: {
        orderBy: [listingPhotos.sortOrder],
      },
    },
  });

  if (!listing) {
    notFound();
  }

  return (
    <Container className="max-w-none px-0">
      <main>
        <div className="mx-auto max-w-3xl px-4 py-6 md:py-10">
          <div className="mb-6">
            <Typography variant="h1">Edit listing</Typography>
            <Typography className="mt-1" variant="muted">
              Update listing details and images.
            </Typography>
          </div>
          <ListingForm listing={listing} mode="edit" />
        </div>
      </main>
    </Container>
  );
}
