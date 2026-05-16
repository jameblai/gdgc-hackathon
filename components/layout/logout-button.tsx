"use client";

import { useAction } from "next-safe-action/hooks";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/auth/actions";

export function LogoutButton() {
  const action = useAction(logoutAction);

  return (
    <form
      action={() => {
        action.execute();
      }}
    >
      <button
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
        )}
        type="submit"
      >
        Log out
      </button>
    </form>
  );
}
