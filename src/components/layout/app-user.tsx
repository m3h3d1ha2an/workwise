"use client";

import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { authClient } from "@/server/better-auth/client";

const AppUser = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  const user = data?.user;

  const handleLogout = async () => {
    const { data, error } = await authClient.signOut();
    if (error) {
      console.error(error);
      toast.error(error.message);
    }
    if (data?.success) {
      toast.success("Logged out successfully");
      router.push("/auth/sign-in");
    }
  };

  if (isPending) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <Avatar className="size-8 rounded-lg animate-pulse bg-gray-200 dark:bg-gray-700">
            <AvatarFallback className="rounded-lg">...</AvatarFallback>
          </Avatar>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="size-8 rounded-lg cursor-pointer">
              {user?.image && <AvatarImage src={user.image} alt={user?.name ?? "PP"} />}
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side={"bottom"} align="end" sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {user?.image && <AvatarImage src={user.image} alt={user?.name ?? "PP"} />}
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="text-muted-foreground truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <IconUserCircle />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" variant="destructive" onClick={handleLogout}>
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
