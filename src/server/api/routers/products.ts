import { z } from 'zod';
import { createRouter } from '../../createRouter';

export const productsRouter = createRouter()
  .query('getAll', {
    resolve: async ({ ctx }) => {
      return ctx.prisma.product.findMany();
    },
  })
  .mutation('create', {
    input: z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      type: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) throw new Error('Not authenticated');

      return ctx.prisma.product.create({
        data: {
          ...input,
          creatorId: userId,
        },
      });
    },
  });