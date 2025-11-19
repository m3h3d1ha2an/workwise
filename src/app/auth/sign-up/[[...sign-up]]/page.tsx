import { SignUp } from "@clerk/nextjs";
import { ChartLine, Clock, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";

const SignUpPage = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Column - Branding */}
      <div className="bg-muted hidden lg:flex flex-col justify-center p-8 lg:p-12">
        <div className="mx-auto w-full max-w-lg">
          <div className="mb-8 flex items-center gap-4">
            <Image src="/icon.svg" alt="Logo" width={48} height={48} />
            <h1 className="text-balance text-4xl font-bold tracking-tight lg:text-5xl">WorkWise</h1>
          </div>
          <ul className="max-w-sm space-y-8">
            <li>
              <div className="flex items-center gap-2">
                <ChartLine className="h-4 w-4" />
                <p className="font-semibold">Organize work intelligently</p>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                Structure projects, tasks, and subtasks with WorkWise’s smart prioritization and
                board views so teams know what to do next.
              </p>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <p className="font-semibold">Track progress & time</p>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                Built-in time tracking, progress metrics, and customizable reports help managers
                measure productivity and remove blockers.
              </p>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <p className="font-semibold">Secure & integrate</p>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                Enterprise-grade security (SSO, audit logs) and prebuilt integrations with Slack,
                GitHub, and Google Workspace keep your data and tools in sync.
              </p>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <Sparkles className="size-4" />
                <p className="font-semibold">Match your brand</p>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                Theme our pre-built components, or integrate with our easy-to-use APIs.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
