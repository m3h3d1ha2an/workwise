import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cookies } from "next/headers";
import { Content, Header, Sidebar, SidebarProvider } from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "WorkWise - Smart Task Manager",
    template: "%s | WorkWise",
  },
  description: "Manage your tasks efficiently with WorkWise, the smart task manager.",
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SidebarProvider defaultOpen={defaultOpen}>
            <Sidebar variant="inset" />
            <Content>
              <Header />
              <div className="flex flex-1 flex-col">{children}</div>
            </Content>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
