import { PlusIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
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
                  <SidebarMenuButton tooltip="New Listing" variant="outline">
                    <PlusIcon />
                    <span className="group-data-[collapsible=icon]:sr-only">
                      New Listing
                    </span>
                  </SidebarMenuButton>
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
