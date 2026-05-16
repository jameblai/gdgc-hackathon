import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Typography } from "@/components/ui/typography";
import { validateRequest } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./logout-button";

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

          <nav className="flex items-center gap-2">
            <Link
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
              )}
              href="/listings"
            >
              Listings
            </Link>
            {user ? (
              <LogoutButton />
            ) : (
              <>
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                  )}
                  href="/login"
                >
                  Log in
                </Link>
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "default",
                    }),
                  )}
                  href="/register"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}
