import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  list :protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.name === "D Koki Hayashi")
    {
      const user =  await ctx.prisma.user.findMany({});
      return user;
    }
    else {
      return null;
    }
  }),

  get: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),

  updateProfile: protectedProcedure
    .input(z.object({profile: z.string()}))
    .mutation(async ({ ctx, input }) => {
    return await ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        profile: input.profile,
      },
    });
  }),
});
