import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Typography } from "@/components/ui/typography";
import { validateRequest } from "@/lib/auth";

import { HeaderAuth } from "./header-auth";

export async function Header() {
  const { user } = await validateRequest();

  return (
    <header className="border-b">
      <Container>
        <div className="flex h-14 items-center justify-between gap-4">
          <Link className="flex items-center gap-2" href="/">
            <Typography className="font-bold" variant="h3">
              Repstation
            </Typography>
          </Link>

          <HeaderAuth user={user} />
        </div>
      </Container>
    </header>
  );
}
