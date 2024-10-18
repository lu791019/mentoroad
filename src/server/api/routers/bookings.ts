import { z } from 'zod';
import { createRouter } from '../../createRouter';

export const bookingsRouter = createRouter()
  .mutation('create', {
    input: z.object({
      mentorId: z.string(),
      serviceId: z.string(),
      dateTime: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) throw new Error('Not authenticated');

      return ctx.prisma.booking.create({
        data: {
          ...input,
          userId,
        },
      });
    },
  })
  .query('getUserBookings', {
    resolve: async ({ ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) throw new Error('Not authenticated');

      return ctx.prisma.booking.findMany({
        where: { userId },
        include: {
          mentor: true,
          service: true,
        },
      });
    },
  });