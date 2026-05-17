"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./logout-button";

export function HeaderAuth({ user }: { user: { name: string } | null }) {
  return (
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
      <Link
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
        )}
        href="/claims"
      >
        Claims
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
            href="/features/login"
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
  );
}
