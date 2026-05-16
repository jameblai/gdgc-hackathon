import { Claim } from "@/components/claims/claim";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Typography } from "@/components/ui/typography";
import { db } from "@/lib/db";

export default async function AttestationsPage() {
  const claims = await db.query.claims.findMany({
    with: {
      user: true,
    },
  });

  return (
    <Container>
      <main className="space-y-8 py-4 md:py-8 lg:py-16">
        <div className="space-y-8">
          <section className="space-y-1">
            <Typography variant="h1">Suggested Claims</Typography>
            <Typography variant="lead">
              We found these people you may know in your circle. Create
              attestations to verify their claims.
            </Typography>
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
    </Container>
  );
}
