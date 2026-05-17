"use client";

<<<<<<< Updated upstream
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
=======
import * as React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";
>>>>>>> Stashed changes

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
<<<<<<< Updated upstream
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
=======
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
>>>>>>> Stashed changes
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
