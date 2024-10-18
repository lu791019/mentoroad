import { createTRPCRouter } from "../trpc";
import { userRouter } from "./user";
import { mentorsRouter } from "./mentors";
import { servicesRouter } from "./services";
import { productsRouter } from "./products";
import { subscriptionsRouter } from "./subscriptions";
import { bookingsRouter } from "./bookings";
import { authRouter } from "./auth";

export const appRouter = createTRPCRouter({
  user: userRouter,
  mentors: mentorsRouter,
  services: servicesRouter,
  products: productsRouter,
  subscriptions: subscriptionsRouter,
  bookings: bookingsRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;