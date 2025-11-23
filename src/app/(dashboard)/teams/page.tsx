import { CreateTeamDialog } from "./create-team-dialog";
import { TeamList } from "./team-list";

export default function TeamManagement() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">Team Management</h1>
          <p className="mt-2 text-pretty text-muted-foreground">Create and manage your teams and their members</p>
        </div>
        <CreateTeamDialog />
      </div>
      <TeamList />
    </div>
  );
}
