"use client";

import { UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Team } from "@/types/team";

export const TeamCard = ({ team }: { team: Team }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-start justify-between space-y-0 pb-4">
        <div className="flex-1">
          <CardTitle className="text-balance text-xl">{team.name}</CardTitle>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <UsersRound className="size-4" />
            {/*<span>{team.members.length} members</span>*/}
            <span className="text-muted-foreground/50">•</span>
            {/*<span>{totalCapacity} total capacity</span>*/}
          </div>
        </div>
        {/*<DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Team
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>*/}
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        {/*{team.members.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center">
            <Users className="mb-2 h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No members yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {team.members.map((member) => (
              <MemberRow key={member.id} member={member} onUpdate={handleUpdateMember} onDelete={handleDeleteMember} />
            ))}
          </div>
        )}
        <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsAddMemberOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>*/}
      </CardContent>
    </Card>
  );
};
