import { DashboardSidebar } from "~/components/sidebar-03/app-sidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="relative flex h-screen w-full">
      <DashboardSidebar />
      <SidebarInset className="flex flex-col">{children}</SidebarInset>
    </div>
  </SidebarProvider>
);

export default ProtectedLayout;
