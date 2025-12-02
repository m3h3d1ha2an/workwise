"use client";

import { motion } from "framer-motion";
import { CheckSquare, FolderKanban, Home, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "~/app/icon.png";
import { AppNav } from "~/components/layout/appnav";
import { AppUser } from "~/components/layout/appuser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";
import { ThemeToggler } from "../theme-toggler";
import type { Route } from "./appnav";

const dashboardRoutes: Route[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home className="size-4" />,
    link: "/",
  },
  {
    id: "teams",
    title: "Teams",
    icon: <Users className="size-4" />,
    link: "/teams",
  },
  {
    id: "projects",
    title: "Projects",
    icon: <FolderKanban className="size-4" />,
    link: "/projects",
  },
  {
    id: "tasks",
    title: "Tasks",
    icon: <CheckSquare className="size-4" />,
    link: "/tasks",
  },
];

export const Appbar = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader
        className={cn(
          "flex md:pt-3.5",
          isCollapsed
            ? "flex-row items-center justify-between gap-y-4 md:flex-col md:items-start md:justify-start"
            : "flex-row items-center justify-between"
        )}
      >
        <Link className="flex items-center gap-2" href="#">
          <Image
            alt="Logo"
            className="ml-2"
            height={20}
            src={logo}
            width={20}
          />
          {!isCollapsed && (
            <span className="font-semibold text-black dark:text-white">
              WorkWise
            </span>
          )}
        </Link>

        <motion.div
          animate={{ opacity: 1 }}
          className={cn(
            "flex items-center gap-2",
            isCollapsed ? "flex-row md:flex-col-reverse" : "flex-row"
          )}
          initial={{ opacity: 0 }}
          key={isCollapsed ? "header-collapsed" : "header-expanded"}
          transition={{ duration: 0.8 }}
        >
          <ThemeToggler className="cursor-pointer" />
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="gap-4 px-2 py-4">
        <AppNav routes={dashboardRoutes} />
      </SidebarContent>
      <SidebarFooter className="px-2">
        <AppUser />
      </SidebarFooter>
    </Sidebar>
  );
};
