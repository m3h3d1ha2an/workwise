"use client";

import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";

export const CreateTeamDialog = () => {
  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createTeam = api.team.createTeam.useMutation({
    onSuccess: () => {
      utils.team.getTeams.invalidate();
      setName("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createTeam.mutate({ name });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="cursor-pointer">
          <Plus className="size-5 mr-2" />
          Create Team
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
            <DialogDescription>Give your team a name. You can add members after creating the team.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="team-name">Team Name</Label>
            <Input id="team-name" placeholder="e.g., Product Team" value={name} onChange={(e) => setName(e.target.value)} className="mt-2" autoFocus />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!name.trim()}>
              Create Team
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
