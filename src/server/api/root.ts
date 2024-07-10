import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { coachRouter } from "./routers/coach";
import { sportRouter } from "./routers/sports";
import { centerRouter } from "./routers/center";
import { batchRouter } from "./routers/batches";
import { staffRouter } from "./routers/staff";
import { inventoryRouter } from "./routers/inventory";
import {centerSportsRouter} from "./routers/centerSports"
import { adminUserRouter } from "./routers/adminUser";
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  center: centerRouter,
  coach: coachRouter,
  sports: sportRouter,
  batches: batchRouter,
  staff: staffRouter,
  inventory:inventoryRouter,
  centerSports:centerSportsRouter,
  adminUser:adminUserRouter
}).mutation('createAdmin', {
  input: z.object({
    name: z.string(),
    password: z.string(),
  }),
  resolve: async ({ input, ctx }) => {
    if (!ctx.session || !ctx.session.user.id ) {
      throw new trpc.TRPCError({ code: 'FORBIDDEN' });
    }
    const hashedPassword = await bcrypt.hash(input.password, 10);
    return await ctx.prisma.admin.create({
      data: {
        email: input.email,
        password: hashedPassword,
      },
    });
  },
});;

// export type definition of API
export type AppRouter = typeof appRouter;
