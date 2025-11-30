import "~/styles/globals.css";

import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "~/components/theme-provider";
import { cn } from "~/lib/utils";

const spacegrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-space-grotesk",
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
    className={cn(spacegrotesk.variable, "antialiased")}
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
