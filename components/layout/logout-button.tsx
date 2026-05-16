"use client";

import { useAction } from "next-safe-action/hooks";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/auth/actions";

export function LogoutButton() {
  const action = useAction(logoutAction);

  return (
    <button
      className={cn(
        buttonVariants({
          variant: "ghost",
        }),
      )}
      disabled={action.isPending}
      onClick={() => action.execute()}
      type="button"
    >
      Log out
    </button>
  );
}
