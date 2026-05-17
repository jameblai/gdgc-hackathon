import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import "./globals.css";
<<<<<<< Updated upstream
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Header } from "@/components/layout/header";
=======
>>>>>>> Stashed changes
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Repstation",
  description: "A marketplace for sharing items.",
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", dmSans.variable)}
    >
      <body className="flex min-h-full flex-col">
<<<<<<< Updated upstream
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <TooltipProvider>
          <Header />
          <div className="flex-1">{children}</div>
        </TooltipProvider>
=======
        <TooltipProvider>{children}</TooltipProvider>
>>>>>>> Stashed changes
      </body>
    </html>
  );
}
