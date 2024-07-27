import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";


const coachCertificateSchema = z.object({
    coachId: z.number(),
    certificateType:z.string(),
    startDate :z.date(),   
    endDate :z.date(),  
    instituteName:z.string(),  
    createdAt:z.date(),
    updatedAt :z.date()
  })
  
  // Now add this object into an array
  const coachCertificateInfoSchema = z.array(coachCertificateSchema)

// Now add this object into an array

export const coachCertificateRouter = createTRPCRouter({
  createCoachCertificates: publicProcedure
    .input(coachCertificateInfoSchema)
    .mutation(
      async ({
        input: data,
        ctx,
      }) => {
        const response = await ctx.prisma.coachQualifications.createMany({
          data,
        });
        return response;
      }
    )
});
