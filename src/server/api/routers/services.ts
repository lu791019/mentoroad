import { z } from 'zod';
import { createRouter } from '../../createRouter';

export const servicesRouter = createRouter()
  .query('getByMentor', {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.service.findMany({
        where: { mentorId: input },
      });
    },
  })
  .query('getById', {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.service.findUnique({
        where: { id: input },
      });
    },
  })
  .query('getWebinars', {
    resolve: async ({ ctx }) => {
      return ctx.prisma.service.findMany({
        where: { type: 'webinar' },
      });
    },
  })
  .mutation('create', {
    input: z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      duration: z.number(),
      type: z.enum(['one-on-one', 'webinar', 'bundle']),
    }),
    resolve: async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) throw new Error('Not authenticated');

      return ctx.prisma.service.create({
        data: {
          ...input,
          mentorId: userId,
        },
      });
    },
  });