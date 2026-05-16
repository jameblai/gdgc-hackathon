import * as React from "react";

import { cn } from "@/lib/utils";

import { Container } from "./container";

function Page({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <Container>
      <main
        data-slot="page"
        className={cn(
          "flex min-h-screen flex-col py-4 md:py-8 lg:py-16",
          className,
        )}
        {...props}
      />
    </Container>
  );
}

export { Page };
