"use client";
import { HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Fragment, useMemo } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "../ui/button";
import AppUser from "./app-user";

export const AppHeader = () => {
  const pathname = usePathname();

  // Faux breadcrumbs for demo.
  const breadcrumbs = useMemo(() => {
    return pathname
      .split("/")
      .filter((path) => path !== "")
      .map((path, index, array) => ({
        label: path,
        href: `/${array.slice(0, index + 1).join("/")}`,
      }));
  }, [pathname]);

  return (
    <header data-slot="site-header" className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex w-full items-center gap-2 p-2 px-4">
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="capitalize">
                <HomeIcon className="size-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {breadcrumbs.map((breadcrumb, index) =>
              index === breadcrumbs.length - 1 ? (
                <BreadcrumbItem key={breadcrumb.href}>
                  <BreadcrumbPage className="capitalize">{breadcrumb.label}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <Fragment key={breadcrumb.href}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={breadcrumb.href} className="capitalize">
                      {breadcrumb.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </Fragment>
              ),
            )}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <AppUser />
          </Button>
        </div>
      </div>
    </header>
  );
};
