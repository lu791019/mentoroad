import { z } from 'zod';
import { createRouter } from '../../createRouter';

export const userRouter = createRouter()
  .query('getProfile', {
    resolve: async ({ ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) throw new Error('Not authenticated');

      return ctx.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          profileStrength: true,
        },
      });
    },
  })
  .mutation('updateProfile', {
    input: z.object({
      name: z.string().optional(),
      bio: z.string().optional(),
      title: z.string().optional(),
    }),
    resolve: async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) throw new Error('Not authenticated');

      return ctx.prisma.user.update({
        where: { id: userId },
        data: input,
      });
    },
  });