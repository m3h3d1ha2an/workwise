"use client";

import { Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { CreateTeamDialog } from "./create-team-dialog";
import { TeamCard } from "./team-card";
import { TeamCardSkeleton } from "./team-card-skeleton";

export const TeamList = () => {
  const [teams, { isLoading }] = api.team.getTeams.useSuspenseQuery();

  if (isLoading) {
    const teams = [{ id: 1 }, { id: 2 }, { id: 3 }];

    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <TeamCardSkeleton key={team.id} />
        ))}
      </div>
    );
  }

  if (teams.length > 0) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    );
  }

  return (
    <Card className="border-dashed">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Users className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardTitle>No teams yet</CardTitle>
        <CardDescription>Get started by creating your first team.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center pb-8">
        <CreateTeamDialog />
      </CardContent>
    </Card>
  );
};
