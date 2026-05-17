import type { ClaimWithUser } from "@/lib/db/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ShieldIcon, ShieldQuestionMarkIcon } from "lucide-react";
import { Typography } from "../ui/typography";

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
          <Typography variant="label">{claim.user.name} claims</Typography>
          <Typography variant="smallMuted">{claim.details}</Typography>
        </div>

        <div className="flex gap-1">
          <Button size="sm" variant="outline">
            Support <ShieldIcon className="text-green-600" />
          </Button>
          <Button size="sm" variant="outline">
            Oppose
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
