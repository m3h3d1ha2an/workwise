import { Folder, House, LayoutList, type LucideIcon, UsersRound } from "lucide-react";
import type { Route } from "next";

type NavItem = {
  title: string;
  url: Route;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: Route;
  }[];
  disabled?: boolean;
};

const navigations: NavItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: House,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Folder,
  },
  {
    title: "Teams",
    url: "/teams",
    icon: UsersRound,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: LayoutList,
  },
];

export default navigations;
