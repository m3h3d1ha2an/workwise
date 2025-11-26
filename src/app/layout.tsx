import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  description:
    "Manage your tasks efficiently with WorkWise, the smart task manager.",
  title: {
    default: "WorkWise - Smart Task Manager",
    template: "%s | WorkWise",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html className={geist.variable} lang="en">
    <body>{children}</body>
  </html>
);

export default RootLayout;
