import { cookies } from "next/headers";
import { Content, Header, Sidebar, SidebarProvider } from "@/components/layout";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar variant="inset" className="border-r p-0" />
      <Content className="m-0!">
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
      </Content>
    </SidebarProvider>
  );
};

export default DashboardLayout;
