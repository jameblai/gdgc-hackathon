import type { ClaimWithUser } from "@/lib/db/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ShieldIcon, ShieldQuestionMarkIcon } from "lucide-react";

export function Claim({ claim }: { claim: ClaimWithUser }) {
  return (
    <div className="flex gap-2">
      <Avatar className="size-10">
        {claim.user.avatarUrl && (
          <AvatarImage src={claim.user.avatarUrl} alt={claim.user.name} />
        )}
        <AvatarFallback>{claim.user.name[0]}</AvatarFallback>
      </Avatar>

      <div className="space-y-2">
        <div className="space-y-1">
          <p className="leading-none font-bold tracking-tight">
            {claim.user.name} claims
          </p>
          <p className="text-foreground/80 text-sm">{claim.details}</p>
        </div>

        <div className="flex gap-1">
          <Button size="sm" variant="outline">
            Attest <ShieldIcon className="text-green-600" />
          </Button>
          <Button size="sm" variant="outline">
            Denounce
            <ShieldIcon className="text-red-600" />
          </Button>
          <Button size="sm" variant="outline">
            Unsure
            <ShieldQuestionMarkIcon className="text-amber-600" />
          </Button>
        </div>
      </div>
    </div>
  );
}
