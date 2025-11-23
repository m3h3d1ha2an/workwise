import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "WorkWise - Smart Task Manager",
    template: "%s | WorkWise",
  },
  description: "Manage your tasks efficiently with WorkWise, the smart task manager.",
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <TRPCReactProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
      <Toaster position="top-center" richColors />
    </TRPCReactProvider>
  );
};

export default RootLayout;
