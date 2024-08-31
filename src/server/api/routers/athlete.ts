import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { BLOOD_GROUPS, EXPERIENCE_LEVEL, GENDER_VALUES, TRAINING_LEVEL } from "~/types/coach";

// Now add this object into an array


export const athleteRouter = createTRPCRouter({
  getAllAthletes: publicProcedure.query(({ ctx }) => {
    const allAthletes = ctx?.prisma.athletes?.findMany({
      where: {
        deletedAt: null,
      },
      include:{
        AthleteSportsMaps:true
      }
    });
    return allAthletes;
  }),
  getAthleteById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async (opts) => {
      try {
        const athletes = await opts.ctx?.prisma?.athletes?.findUnique({
          where: {
            id: opts.input.id,
          },
          include: {
            // CoachSportsMaps: true,
            // batches: true,
            // centers: true,
            // certificates: true,
          },
        });

        return athletes;
      } catch (error) {}
    }),
  getAthleteByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async (opts) => {
      const athletes = await opts.ctx?.prisma?.athletes?.findMany({
        where: {
          name: {
            contains: opts.input.name,
          },
        },
        include: {
          Centers: true,
        },
      });

      return athletes;
    }),
  createAthlete: publicProcedure
    .input(
      z.object({
        name: z.string(),
        phone: z.string(),
        email: z.string(),
        bloodGroup: z.enum(BLOOD_GROUPS),
        gender: z.enum(GENDER_VALUES),
        dob: z.date(),
        height: z.number(),
        weight: z.number(),
        address:z.string(),
        centerId: z.number(),
        medicalHistory:z.array(z.object({message:z.string()})),
        fatherName:z.string(),
        heightUnit:z.string(),
        weightUnit:z.string(),
        createdAt:z.date(),
        updatedAt:z.date(),
        academyCode:z.number(),
        image:z.string()
      })
    )
    .mutation(
      async ({
        input: {
          name,
          phone,
          email,
          bloodGroup,
          gender,
          dob,
          height,
          weight,
          centerId,
          medicalHistory,
          address,
          fatherName,
          createdAt,
          updatedAt,
          academyCode,
          image
        },
        ctx,
      }) => {
        const response = await ctx.prisma.athletes.create({
          data: {
            name: name,
            phone: phone,
            email: email,
            bloodGroup: bloodGroup,
            gender: gender,
            height:height,
            weight:weight,
            medicalHistory,
            centerId: centerId,
            dob: dob,
            address,
            image,
            fatherName,
            heightUnit:"cm",
            weightUnit:"kg",
            createdAt,
            updatedAt,
            academyCode
          },
        });
        return response;
      }
    ),
  editAthlete: publicProcedure
    .input(
      z.object({
        name: z.string(),
        phone: z.string(),
        email: z.string(),
        bloodGroup: z.enum(BLOOD_GROUPS),
        gender: z.enum(GENDER_VALUES),
        dob: z.date(),
        height: z.number(),
        weight: z.number(),
        address:z.string(),
        centerId: z.number(),
        medicalHistory:z.array(z.object({message:z.string()})),
        fatherName:z.string(),
        heightUnit:z.string(),
        weightUnit:z.string(),
        updatedAt:z.date(),
        image:z.string(),
        athleteId:z.number()
      })
    )
    .mutation(
      async ({
        input: {
          name,
          phone,
          email,
          bloodGroup,
          gender,
          dob,
          height,
          weight,
          centerId,
          medicalHistory,
          address,
          fatherName,
          updatedAt,
          image,
          athleteId,
        },
        ctx,
      }) => {
        const response = await ctx.prisma.athletes.update({
          where: {
            id: athleteId,
          },
          data: {
            name: name,
            phone: phone,
            email: email,
            bloodGroup: bloodGroup,
            gender: gender,
            height:height,
            weight:weight,
            medicalHistory,
            centerId: centerId,
            dob: dob,
            address,
            image,
            fatherName,
            heightUnit:"cm",
            weightUnit:"kg",
            updatedAt,
          },
        });
        return response;
      }
    ),
  deleteAthlete: publicProcedure
    .input(
      z.object({
        athleteId: z.number(),
        deletedAt: z.string(),
      })
    )
    .mutation(async ({ input: { athleteId, deletedAt }, ctx }) => {
      const response = await ctx.prisma.athletes.update({
        where: {
          id: athleteId,
        },
        data: {
          deletedAt,
        },
      });

      return response;
    }),
  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
