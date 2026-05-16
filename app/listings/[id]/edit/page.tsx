import { and, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

import { ListingForm } from "@/components/listings/listing-form";
import { Container } from "@/components/ui/container";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
        <header className="flex h-14 items-center gap-2 border-b px-4 md:hidden">
          <SidebarTrigger />
          <Typography variant="label">Edit listing</Typography>
        </header>

        <div className="mx-auto max-w-3xl p-4 md:p-6">
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
