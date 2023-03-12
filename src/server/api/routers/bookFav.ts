import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const bookRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),


  getByUser: protectedProcedure.query(async ({ ctx }) => {
    const books = await ctx.prisma.bookFav.findMany({
      where: {
        user: {
          id: ctx.session.user.id
        }
      }
    })
    return books

  }),

  createByUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.bookFav.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          book: {
            connect: {
              id: input.id,
            },
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userBook = await ctx.prisma.bookFav.findFirst({
        where: {
          user: {
            id: ctx.session.user.id,
          },
        },
      });
        if (userBook) {
        await ctx.prisma.userBooks.delete({
          where: {
            id: userBook.id,
          },
        });
      }
    }),
});
