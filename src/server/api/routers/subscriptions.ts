import { z } from 'zod';
import { createRouter } from '../../createRouter';

export const subscriptionsRouter = createRouter()
  .query('getAll', {
    resolve: async ({ ctx }) => {
      return ctx.prisma.subscription.findMany();
    },
  })
  .mutation('create', {
    input: z.object({
      name: z.string(),
      price: z.number(),
      interval: z.enum(['monthly', 'yearly']),
    }),
    resolve: async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) throw new Error('Not authenticated');

      return ctx.prisma.subscription.create({
        data: {
          ...input,
          mentorId: userId,
        },
      });
    },
  });