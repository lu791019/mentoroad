import { z } from 'zod';
import { createRouter } from '../../createRouter';

export const mentorsRouter = createRouter()
  .query('getRecommended', {
    resolve: async ({ ctx }) => {
      return ctx.prisma.user.findMany({
        where: { isMentor: true },
        select: {
          id: true,
          name: true,
          title: true,
          avatar: true,
        },
        take: 5,
      });
    },
  })
  .query('getById', {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: { id: input },
        select: {
          id: true,
          name: true,
          title: true,
          avatar: true,
          services: true,
        },
      });
    },
  })
  .mutation('search', {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.user.findMany({
        where: {
          isMentor: true,
          OR: [
            { name: { contains: input, mode: 'insensitive' } },
            { title: { contains: input, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          name: true,
          title: true,
          avatar: true,
        },
      });
    },
  });