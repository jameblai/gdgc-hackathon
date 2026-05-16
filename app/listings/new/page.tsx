import { redirect } from "next/navigation";

import { ListingForm } from "@/components/listings/listing-form";
import { Container } from "@/components/ui/container";
import { Typography } from "@/components/ui/typography";
import { validateRequest } from "@/lib/auth";

export default async function NewListingPage() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  return (
    <Container className="max-w-none px-0">
      <main>
        <div className="mx-auto max-w-3xl px-4 py-6 md:py-10">
          <div className="mb-6">
            <Typography variant="h1">New listing</Typography>
            <Typography className="mt-1" variant="muted">
              Create a marketplace listing for items you can share.
            </Typography>
          </div>
          <ListingForm mode="create" />
        </div>
      </main>
    </Container>
  );
}
