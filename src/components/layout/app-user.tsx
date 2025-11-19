"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

const AppUser = () => {
  const { signOut, openUserProfile } = useClerk();
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    // Handle loading state
    return null;
  }

  if (!isSignedIn) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="size-8 rounded-lg cursor-pointer">
              <AvatarImage src={user.imageUrl} alt={user.firstName ?? "PP"} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={"bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.imageUrl} alt={user.firstName ?? "PP"} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{`${user.firstName} ${user.lastName}`}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.primaryEmailAddress?.emailAddress}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => openUserProfile()}>
              <IconUserCircle />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              variant="destructive"
              onClick={() => signOut({ redirectUrl: "/" })}
            >
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default AppUser;
