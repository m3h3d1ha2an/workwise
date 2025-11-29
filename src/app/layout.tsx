import "~/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "~/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  <html className={inter.variable} lang="en" suppressHydrationWarning>
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
