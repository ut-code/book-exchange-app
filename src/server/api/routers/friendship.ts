import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const friendshipRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  list : protectedProcedure.query(async ({ ctx }) => {
    const friendship =  await ctx.prisma.friendshipRequest.findMany(
      {
        where: {
          status: "accepted",
          OR: [
            {
              requester: {
                id: ctx.session.user.id,
              },
            },
            {
              addressee: {
                id: ctx.session.user.id,
              },
            },
          ],
        }
      }
    );
    return friendship;
  }),
});
