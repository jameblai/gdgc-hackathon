import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      h1: "text-2xl font-bold tracking-tight",
      h2: "text-xl font-bold tracking-tight",
      h3: "text-lg font-semibold tracking-tight",
      body: "text-base",
      lead: "text-foreground/80",
      small: "text-sm",
      smallMuted: "text-sm text-foreground/80",
      label: "leading-none font-bold tracking-tight",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

const typographyElements = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  lead: "p",
  small: "p",
  smallMuted: "p",
  label: "p",
  muted: "p",
} satisfies Record<
  NonNullable<VariantProps<typeof typographyVariants>["variant"]>,
  keyof React.JSX.IntrinsicElements
>;

function Typography({
  className,
  variant = "body",
  ...props
}: React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants>) {
  const Comp = typographyElements[variant ?? "body"];

  return (
    <Comp
      data-slot="typography"
      data-variant={variant}
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Typography, typographyVariants };
