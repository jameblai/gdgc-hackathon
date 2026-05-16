import { redirect } from "next/navigation";

import { ListingForm } from "@/components/listings/listing-form";
import { Container } from "@/components/ui/container";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
        <header className="flex h-14 items-center gap-2 border-b px-4 md:hidden">
          <SidebarTrigger />
          <Typography variant="label">New listing</Typography>
        </header>

        <div className="mx-auto max-w-3xl p-4 md:p-6">
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
