"use client";

import { ChevronsUpDown, LogOutIcon, Shield, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { signoutAction } from "~/server/auth/signout";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const AppUser = () => {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-background text-foreground">
                <Avatar>
                  <AvatarImage alt="User Avatar" src="/avatar.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Jhon Doe</span>
                <span className="truncate text-xs">john.doe@example.com</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="mb-4 w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuItem
              className="cursor-pointer gap-2 p-2"
              onClick={() => console.log("Account Clicked")}
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <User2 className="size-4 shrink-0" />
              </div>
              Account
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer gap-2 p-2"
              onClick={() => console.log("Security Clicked")}
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <Shield className="size-4 shrink-0" />
              </div>
              Security
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer gap-2 p-2"
              onClick={() => signoutAction()}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <LogOutIcon className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Sign Out</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
