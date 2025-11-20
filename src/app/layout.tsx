import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
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
    <ClerkProvider>
      <TRPCReactProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
