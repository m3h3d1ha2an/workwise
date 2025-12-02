import { Appbar } from "~/components/layout/appbar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="relative flex h-screen w-full">
      <Appbar />
      <SidebarInset className="m-2 flex flex-col rounded-md border border-primary">
        {children}
      </SidebarInset>
    </div>
  </SidebarProvider>
);

export default ProtectedLayout;
