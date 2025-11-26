import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "~/components/theme-provider";
import { ThemeToggler } from "~/components/theme-toggler";

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

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html className={geist.variable} lang="en" suppressHydrationWarning>
    <body>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
      >
        <ThemeToggler className="cursor-pointer" />
        {children}
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
