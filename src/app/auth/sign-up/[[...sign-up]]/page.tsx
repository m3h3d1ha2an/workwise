import { SignUp } from "@clerk/nextjs";
import { ChartLine, Clock, ShieldCheck, Sparkles } from "lucide-react";

const SignUpPage = () => {
  return (
    <div className="bg-muted grid flex-1 lg:grid-cols-2">
      <div className="hidden flex-1 items-center justify-end p-6 md:p-10 lg:flex">
        <ul className="max-w-sm space-y-8">
          <li>
            <div className="flex items-center gap-2">
              <ChartLine className="h-4 w-4" />
              <p className="font-semibold">Organize work intelligently</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Structure projects, tasks, and subtasks with WorkWise’s smart prioritization and board
              views so teams know what to do next.
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
      <div className="flex flex-1 items-center justify-center p-6 md:p-10 lg:justify-start">
        <div className="w-full max-w-md">
          <h2 className="mb-6 text-2xl font-bold">WorkWise — Smart Task Manager</h2>
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
