import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const teamRouter = createTRPCRouter({
  createTeam: protectedProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    return ctx.db.team.create({ data: { name: input.name, ownerId: ctx.auth.userId } });
  }),

  getTeams: protectedProcedure.query(async ({ ctx }) => ctx.db.team.findMany({ where: { ownerId: ctx.auth.userId } })),

  updateTeam: protectedProcedure.input(z.object({ id: z.uuid(), name: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    return ctx.db.team.update({ where: { id: input.id }, data: { name: input.name } });
  }),

  deleteTeam: protectedProcedure.input(z.object({ id: z.uuid() })).mutation(async ({ ctx, input }) => {
    return ctx.db.team.delete({ where: { id: input.id } });
  }),
});
