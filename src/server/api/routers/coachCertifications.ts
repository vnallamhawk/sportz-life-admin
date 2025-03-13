import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { COACH_CERTIFICATE_FILE_TYPE } from "~/types/coach";


const coachCertificateSchema = z.object({
  coachId: z.number(),
  certificateType: z.enum(["masters_degree_in_sports_or_fitness_training",
    "bachelor_degree_in_sports_or_fitness_training",
    "diploma_in_sports_coaching_or_fitness_training",
    "coaching_license",
    "certification_in_sports_coaching_or_fitness_training"]),
  startDate: z.date(),
  endDate: z.date(),
  instituteName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  fileUrl: z.string(),
  fileName: z.string(),
  fileType: z.enum(COACH_CERTIFICATE_FILE_TYPE)
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
