"use client";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import type React from "react";
import {
  type FormEvent,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatedInput } from "~/components/animated-input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

type AuthMode = "signin" | "signup";

// Animation variants (moved outside the component)
const fadeVariants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { duration: 0.35, ease: easeInOut },
  },
  exit: { opacity: 0, transition: { duration: 0.2, ease: easeInOut } },
};

const staggerContainer = {
  center: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  enter: { opacity: 0, y: 15 },
  center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeInOut } },
  exit: { opacity: 0, y: -10 },
};

// --- Extracted Sub-Components ---

const AuthHeader = ({ mode }: { mode: AuthMode }) => (
  <motion.div
    animate={{ opacity: 1, y: 0 }}
    className="mb-10 text-center"
    initial={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <motion.div className="relative mb-6 inline-flex h-20 w-20 cursor-pointer items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 shadow-lg transition-colors duration-300 hover:from-primary/90 hover:to-primary/70">
      <Sparkles className="h-10 w-10 text-primary-foreground" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
        className="absolute inset-0 rounded-2xl bg-primary/20"
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          ease: "easeInOut",
        }}
      />
    </motion.div>

    <AnimatePresence mode="wait">
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        key={mode}
        transition={{ duration: 0.25 }}
      >
        <h1 className="font-bold text-3xl text-foreground tracking-tight">
          {mode === "signin" ? "Welcome back" : "Get started"}
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          {mode === "signin"
            ? "Enter your credentials to continue"
            : "Create your account in seconds"}
        </p>
      </motion.div>
    </AnimatePresence>
  </motion.div>
);

const AuthCard = ({
  mode,
  formHeight,
  formRef,
  handleSubmit,
  children,
}: {
  mode: AuthMode;
  formHeight: number | "auto";
  formRef: RefObject<HTMLDivElement | null>;
  handleSubmit: (e: FormEvent) => Promise<void>;
  children: React.ReactNode;
}) => (
  <motion.div
    animate={{ opacity: 1, y: 0 }}
    className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-8 shadow-xl backdrop-blur-sm"
    initial={{ opacity: 0, y: 30 }}
    transition={{ duration: 0.5, delay: 0.1 }}
  >
    {/* Decorative corner accents */}
    <div className="pointer-events-none absolute top-0 left-0 h-16 w-16 rounded-tl-3xl border-primary/20 border-t-2 border-l-2" />
    <div className="pointer-events-none absolute right-0 bottom-0 h-16 w-16 rounded-br-3xl border-primary/20 border-r-2 border-b-2" />

    <motion.div
      animate={{ height: formHeight }}
      style={{ overflow: "hidden" }}
      transition={{ duration: 0.35, ease: easeInOut }}
    >
      <div ref={formRef}>
        <AnimatePresence mode="wait">
          <motion.form
            animate="center"
            className="space-y-5"
            exit="exit"
            initial="enter"
            key={mode}
            onSubmit={handleSubmit}
            variants={fadeVariants}
          >
            <motion.div
              animate="center"
              initial="enter"
              variants={staggerContainer}
            >
              {children}
            </motion.div>
          </motion.form>
        </AnimatePresence>
      </div>
    </motion.div>
  </motion.div>
);

const AuthFormFields = ({
  mode,
  showPassword,
  setShowPassword,
}: {
  mode: AuthMode;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}) => (
  // This motion.div is the single direct child for staggerContainer
  <motion.div
    className={
      mode === "signup"
        ? "grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2" // Grid for signup
        : "space-y-5" // Stacked for signin
    } // This block animates into view as one item
    // Conditionally apply layout classes inside AuthFormFields
    variants={itemVariants}
  >
    {/* Full Name field (signup only) */}
    {mode === "signup" && (
      <motion.div
        animate={{ height: "auto", opacity: 1 }}
        initial={{ height: 0, opacity: 0 }}
        style={{ overflow: "hidden" }}
        transition={{ duration: 0.35, ease: easeInOut }}
      >
        <div className="space-y-2">
          <Label className="font-medium text-foreground text-sm" htmlFor="name">
            Full Name
          </Label>
          <AnimatedInput
            icon={<User className="h-5 w-5" />}
            id="name"
            placeholder="John Doe"
            required={mode === "signup"}
            type="text"
          />
        </div>
      </motion.div>
    )}

    {/* Email field */}
    <div className="space-y-2">
      <Label className="font-medium text-foreground text-sm" htmlFor="email">
        Email
      </Label>
      <AnimatedInput
        icon={<Mail className="h-5 w-5" />}
        id="email"
        placeholder="you@example.com"
        required
        type="email"
      />
    </div>

    {/* Password field */}
    <div className="space-y-2">
      <Label className="font-medium text-foreground text-sm" htmlFor="password">
        Password
      </Label>
      <AnimatedInput
        icon={<Lock className="h-5 w-5" />}
        id="password"
        placeholder="••••••••"
        required
        rightIcon={
          <button
            className="cursor-pointer text-muted-foreground transition-colors duration-200 hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            <AnimatePresence mode="wait">
              <motion.div
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                initial={{ opacity: 0, rotate: -90 }}
                key={showPassword ? "hide" : "show"}
                transition={{ duration: 0.15 }}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        }
        type={showPassword ? "text" : "password"}
      />
    </div>

    {/* Confirm Password field (signup only) */}
    {mode === "signup" && (
      <motion.div
        animate={{ height: "auto", opacity: 1 }}
        initial={{ height: 0, opacity: 0 }}
        style={{ overflow: "hidden" }}
        transition={{ duration: 0.35, ease: easeInOut }}
      >
        <div className="space-y-2">
          <Label
            className="font-medium text-foreground text-sm"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </Label>
          <AnimatedInput
            icon={<Lock className="h-5 w-5" />}
            id="confirmPassword"
            placeholder="••••••••"
            required={mode === "signup"}
            type={showPassword ? "text" : "password"}
          />
        </div>
      </motion.div>
    )}
  </motion.div>
);

const AuthSubmitButton = ({
  isLoading,
  mode,
}: {
  isLoading: boolean;
  mode: AuthMode;
}) => (
  <motion.div className="pt-6" variants={itemVariants}>
    <Button
      className="relative h-12 w-full cursor-pointer overflow-hidden rounded-xl bg-muted-foreground font-semibold text-base transition-colors duration-300 hover:bg-foreground"
      disabled={isLoading}
      type="submit"
    >
      {/* Animated shine effect */}
      <motion.div
        className="-skew-x-12 absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-200%" }}
        transition={{ duration: 0.6 }}
        whileHover={{ x: "200%" }}
      />
      <span className="relative flex items-center justify-center gap-2">
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1,
              ease: "linear",
            }}
          >
            <Loader2 className="h-5 w-5" />
          </motion.div>
        ) : (
          <>
            {mode === "signin" ? "Sign In" : "Create Account"}
            <motion.span
              animate={{ x: [0, 4, 0] }}
              className="inline-block"
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </>
        )}
      </span>
    </Button>
  </motion.div>
);

const AuthToggleMode = ({
  toggleMode,
  mode,
}: {
  toggleMode: () => void;
  mode: AuthMode;
}) => (
  <motion.div
    animate={{ opacity: 1 }}
    className="mt-8 text-center"
    initial={{ opacity: 0 }}
    transition={{ delay: 0.5 }}
  >
    <p className="text-muted-foreground">
      {mode === "signin"
        ? "Don't have an account?"
        : "Already have an account?"}{" "}
      <button
        className="cursor-pointer font-semibold text-primary underline-offset-4 transition-all duration-200 hover:underline"
        onClick={toggleMode}
        type="button"
      >
        {mode === "signin" ? "Sign up" : "Sign in"}
      </button>
    </p>
  </motion.div>
);

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formHeight, setFormHeight] = useState<number | "auto">("auto");
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (formRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setFormHeight(entry.contentRect.height);
        }
      });
      resizeObserver.observe(formRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
  };

  return (
    <div
      className={`mx-auto w-full transition-all duration-300 ease-in-out ${
        mode === "signup" ? "max-w-2xl" : "max-w-md"
      }`}
    >
      <AuthHeader mode={mode} />
      <AuthCard
        formHeight={formHeight}
        formRef={formRef}
        handleSubmit={handleSubmit}
        mode={mode}
      >
        <AuthFormFields
          mode={mode}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
        />
        <AuthSubmitButton isLoading={isLoading} mode={mode} />
      </AuthCard>
      <AuthToggleMode mode={mode} toggleMode={toggleMode} />
    </div>
  );
}
