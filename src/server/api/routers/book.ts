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

  list: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.book.findMany();
  }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.book.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  getByUser: protectedProcedure.query(async ({ ctx }) => {
    const books = await ctx.prisma.book.findMany({
      where: {
        users: {
          some: {
            user: {
              id: ctx.session.user.id
            }
          }
        }
      }
    })
    return books

  }),

  create: publicProcedure
    .input(z.object({ title: z.string(), authors: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.book.create({
        data: {
          title: input.title,
          authors: input.authors,
        },
      });
    }),

  createByUser: protectedProcedure
    .input(z.object({ title: z.string(), publisher: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.book.create({
        data: {
          title: input.title,
          publisher: input.publisher,
          users: {
            create: [
              {
                user: {
                  connect: {
                    id: ctx.session.user.id,
                  },
                },
              },
            ],
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userBook = await ctx.prisma.userBooks.findFirst({
        where: {
          user: {
            id: ctx.session.user.id,
          },
          book: {
            id: input.id,
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
