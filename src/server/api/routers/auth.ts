import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import bcrypt from 'bcryptjs';

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(6), name: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      const { email, password, name } = input;
      const existingUser = await ctx.prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await ctx.prisma.user.create({
        data: { email, password: hashedPassword, name },
      });
      return { success: true, userId: user.id };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "你現在可以看到這個秘密消息！";
  }),
});