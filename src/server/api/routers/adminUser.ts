import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import bcrypt from "bcrypt";


export const adminUserRouter = createTRPCRouter({
  createAdminUser: publicProcedure
    .input(
      z.object({
        password: z.string(),
        email:z.string(),
      })
    )
    .mutation(
      async ({
        input: {
          email,
          password
        },
        ctx,
      }) => {
        const hashedPassword = await bcrypt.hash(input.password, 10);

        const response = await ctx.prisma.admin.create({
          data: {
            email: email,
            password: hashedPassword,
          },
        });
        debugger
        return response;
      }
    ),

});
