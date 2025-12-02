"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type ThemeTogglerProps = React.ComponentPropsWithoutRef<"button"> & {
  duration?: number;
};

export const ThemeToggler = ({
  className,
  duration = 400,
  ...props
}: ThemeTogglerProps) => {
  const { setTheme, resolvedTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) {
      return;
    }
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme); // Use setTheme from next-themes
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [resolvedTheme, setTheme, duration]);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      className={cn(className)}
      onClick={toggleTheme}
      ref={buttonRef}
      size="icon"
      variant="link"
      {...props}
    >
      {resolvedTheme === "dark" ? (
        <Sun
          className={cn(
            "size-5 transition-all",
            resolvedTheme === "dark"
              ? "rotate-0 scale-100"
              : "-rotate-90 scale-0"
          )}
        />
      ) : (
        <Moon
          className={cn(
            "absolute size-5 transition-all",
            resolvedTheme !== "dark"
              ? "rotate-0 scale-100"
              : "rotate-90 scale-0"
          )}
        />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
