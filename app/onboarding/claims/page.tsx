import { Claim } from "@/components/claims/claim";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

export default async function AttestationsPage() {
  const claims = await db.query.claims.findMany({
    with: {
      user: true,
    },
  });

  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-8 px-4 py-4 md:py-8 lg:py-16">
      <div className="flex flex-1 flex-col gap-8">
        <section className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Suggested Claims
          </h1>
          <p className="text-foreground/80">
            We found these people you may know in your circle. Create
            attestations to verify their claims.
          </p>
        </section>
        <section className="space-y-6">
          {claims.map((claim) => (
            <Claim key={claim.id} claim={claim} />
          ))}
        </section>
      </div>

      <section>
        <Button className="w-full" size="lg">
          Continue
        </Button>
      </section>
    </main>
  );
}
