"use client";

import { motion } from "framer-motion";
import { type InputHTMLAttributes, type Ref, useState } from "react";

import { cn } from "~/lib/utils";

type AnimatedInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ref?: Ref<HTMLInputElement>;
};

export const AnimatedInput = ({
  className,
  type,
  icon,
  rightIcon,
  ref,
  ...props
}: AnimatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  // isHovered state and its handlers are removed, replaced by Framer Motion's whileHover

  // Refactor nested ternary for opacity to a clearer if/else if/else
  let borderAnimationOpacity = 0;
  if (isFocused) {
    borderAnimationOpacity = 1;
  }
  // The hover opacity (0.4) will now be managed by whileHover property on motion.rect
  // when not focused.

  return (
    <div
      className="relative"
      // onMouseEnter and onMouseLeave handlers are removed from here
      role="presentation"
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full rounded-xl"
        role="presentation"
        style={{ overflow: "visible" }}
      >
        <motion.rect
          animate={{
            strokeDashoffset: isFocused ? 0 : 1000,
            opacity: borderAnimationOpacity,
          }}
          fill="none"
          height="calc(100% - 1px)"
          rx="12"
          ry="12"
          stroke="hsl(var(--primary))"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          strokeWidth="2"
          style={{
            strokeLinecap: "round",
          }}
          transition={{
            strokeDashoffset: { duration: 0.6, ease: "easeInOut" },
            opacity: { duration: 0.2 },
          }}
          whileHover={{
            opacity: isFocused ? 1 : 0.4, // Keep 1 if focused, otherwise 0.4 on hover
          }}
          width="calc(100% - 1px)"
          x="0.5"
          y="0.5"
        />
      </svg>

      {/* Animated glow effect */}
      <motion.div
        animate={{
          opacity: isFocused ? 0.5 : 0,
          scale: isFocused ? 1 : 0.95,
        }}
        className="-inset-0.5 pointer-events-none absolute rounded-xl blur-md"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--primary)/0.3) 0%, transparent 50%, hsl(var(--primary)/0.3) 100%)",
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative flex items-center">
        {icon && (
          <motion.div
            animate={{
              color: isFocused
                ? "hsl(var(--primary))"
                : "hsl(var(--muted-foreground))",
              scale: isFocused ? 1.1 : 1,
            }}
            className="absolute left-4 z-10 text-muted-foreground"
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        )}

        <input
          className={cn(
            "flex h-12 w-full rounded-xl border border-border/50 bg-secondary/50 px-4 py-3 text-base transition-colors",
            "file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm",
            "placeholder:text-muted-foreground/60",
            "focus:border-transparent focus:outline-none focus:ring-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "relative z-1",
            icon && "pl-12",
            rightIcon && "pr-12",
            className
          )}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          ref={ref}
          type={type}
          {...props}
        />

        {rightIcon && <div className="absolute right-4 z-10">{rightIcon}</div>}
      </div>
    </div>
  );
};

AnimatedInput.displayName = "AnimatedInput";
