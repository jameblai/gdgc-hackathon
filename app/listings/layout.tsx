import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Typography } from "@/components/ui/typography";

export interface ListingsLayoutProps {
  children: React.ReactNode;
}

export default function ListingsLayout({ children }: ListingsLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-sidebar-border border-b p-2">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <Typography
              className="px-2 group-data-[collapsible=icon]:hidden"
              variant="label"
            >
              Picasa
            </Typography>
            <SidebarTrigger className="ml-auto group-data-[collapsible=icon]:ml-0" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link
                    className={buttonVariants({
                      className:
                        "group/menu-button h-8 w-full justify-start gap-2 p-2 text-sm group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
                    })}
                    href="/listings/new"
                  >
                    <PlusIcon />
                    <span className="group-data-[collapsible=icon]:sr-only">
                      New Listing
                    </span>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
