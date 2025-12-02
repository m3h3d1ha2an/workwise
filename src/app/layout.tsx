import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "~/components/theme-provider";
import { cn } from "~/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html
    className={cn(geistSans.variable, geistMono.variable, "antialiased")}
    lang="en"
    suppressHydrationWarning
  >
    <body>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
      >
        {children}
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
