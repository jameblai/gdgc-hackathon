import { Claim } from "@/components/claims/claim";
import { Container } from "@/components/ui/container";
import { Typography } from "@/components/ui/typography";
import { requireUser } from "@/lib/auth/require-user";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { attestations } from "@/lib/db/schema";

export default async function ClaimsPage() {
  const user = await requireUser();

  const claims = await db.query.claims.findMany({
    with: {
      user: true,
    },
  });

  const userAttestations = await db.query.attestations.findMany({
    where: eq(attestations.userId, user.id),
  });

  const attestationMap = new Map(userAttestations.map((a) => [a.claimId, a]));

  return (
    <Container>
      <main className="space-y-8 py-6 md:py-10">
        <div className="space-y-8">
          <section className="space-y-1">
            <Typography variant="h1">Claims</Typography>
            <Typography variant="lead">
              View and attest to claims made by people in your network. Support,
              oppose, or express uncertainty about each claim.
            </Typography>
          </section>

          <section className="space-y-6">
            {claims.map((claim) => (
              <Claim
                key={claim.id}
                claim={claim}
                userAttestation={attestationMap.get(claim.id)}
              />
            ))}
          </section>
        </div>
      </main>
    </Container>
  );
}
