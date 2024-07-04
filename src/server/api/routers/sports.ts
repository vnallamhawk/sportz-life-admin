// import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const sportRouter = createTRPCRouter({
  getAllSports: publicProcedure.query(({ ctx }) => {
    console.log("ctx prisma is ", ctx?.prisma);
    const allSports = ctx?.prisma?.sports?.findMany();
    return allSports;
  }),
});
