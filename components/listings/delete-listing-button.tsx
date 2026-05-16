"use client";

import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";

import { deleteListingAction } from "@/lib/listings/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function DeleteListingButton({ listingId }: { listingId: string }) {
  const router = useRouter();
  const action = useAction(deleteListingAction, {
    onSuccess: () => {
      router.push("/listings");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button className="w-full" variant="destructive" />}
      >
        <Trash2Icon />
        Delete listing
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes the listing and its images.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={action.isPending}
            onClick={() => action.execute({ id: listingId })}
            variant="destructive"
          >
            {action.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { DeleteListingButton };
