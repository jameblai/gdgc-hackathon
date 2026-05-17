"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";

import type { ClaimWithUser } from "@/lib/db/types";
import type { Attestation } from "@/lib/db/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ShieldIcon, ShieldQuestionMarkIcon, XIcon } from "lucide-react";
import { Typography } from "../ui/typography";
import {
  createOrUpdateAttestationAction,
  deleteAttestationAction,
} from "@/lib/claims/actions";

type AttestationType = "support" | "oppose" | "unsure";

export function Claim({
  claim,
  userAttestation,
}: {
  claim: ClaimWithUser;
  userAttestation?: Attestation;
}) {
  const [attestation, setAttestation] = useState<Attestation | undefined>(
    userAttestation,
  );

  const upsertAction = useAction(createOrUpdateAttestationAction, {
    onSuccess: ({ data }) => {
      if (data && "id" in data) {
        setAttestation(data as Attestation);
      }
    },
  });

  const deleteAction = useAction(deleteAttestationAction, {
    onSuccess: ({ data }) => {
      if (data && "id" in data) {
        setAttestation(undefined);
      }
    },
  });

  const isPending = upsertAction.isPending || deleteAction.isPending;

  function handleAttest(type: AttestationType) {
    upsertAction.execute({ claimId: claim.id, type });
  }

  function handleRemove() {
    if (!attestation) return;
    deleteAction.execute({ id: attestation.id });
  }

  const selectedType = attestation?.type;

  return (
    <div className="flex gap-4 items-start">
      <Avatar className="size-10 shrink-0">
        {claim.user.avatarUrl && (
          <AvatarImage src={claim.user.avatarUrl} alt={claim.user.name} />
        )}
        <AvatarFallback>{claim.user.name[0]}</AvatarFallback>
      </Avatar>

      <div className="space-y-2 flex-1">
        <div className="space-y-1">
          <Typography variant="label">{claim.user.name} claims</Typography>
          <Typography variant="smallMuted">{claim.details}</Typography>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Button
            size="sm"
            variant={selectedType === "support" ? "default" : "outline"}
            disabled={isPending}
            onClick={() => handleAttest("support")}
          >
            Support <ShieldIcon className="ml-1 h-4 w-4 text-green-600" />
          </Button>
          <Button
            size="sm"
            variant={selectedType === "oppose" ? "default" : "outline"}
            disabled={isPending}
            onClick={() => handleAttest("oppose")}
          >
            Oppose <ShieldIcon className="ml-1 h-4 w-4 text-red-600" />
          </Button>
          <Button
            size="sm"
            variant={selectedType === "unsure" ? "default" : "outline"}
            disabled={isPending}
            onClick={() => handleAttest("unsure")}
          >
            Unsure
            <ShieldQuestionMarkIcon className="ml-1 h-4 w-4 text-amber-600" />
          </Button>

          {attestation && (
            <Button
              size="sm"
              variant="ghost"
              disabled={isPending}
              onClick={handleRemove}
              className="text-muted-foreground hover:text-destructive"
            >
              <XIcon className="mr-1 h-4 w-4" />
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
