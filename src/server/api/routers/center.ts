import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
// import { EXPERIENCE_LEVEL, GENDER_VALUES, TRAINING_LEVEL } from "~/types/coach";

// const certificatesSchema = z.array(
//   z.object({
//     instituteName: z.string(),
//     name: z.string(),
//     startDate: z.date(),
//     endDate: z.date(),
//   })
// );

// const coachingSportsSchema = z.array(
//   z.object({
//     label: z.string(),
//     value: z.union([z.string(), z.number()]),
//   })
// );

// Now add this object into an array

export const centerRouter = createTRPCRouter({
  getAllCenters: publicProcedure.query(({ ctx }) => {
    const allCenters = ctx?.prisma.centers?.findMany({
      // include: {
      //   CoachSportsMaps: true,
      // },
    });
    return allCenters;
  }),
  getCenterById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async (opts) => {
      try {
        console.log("opts are", opts);
        const centers = await opts.ctx?.prisma?.centers?.findUnique({
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

        return centers;
      } catch (error) {
        console.log("error are ", error);
      }
    }),
  getCentersByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async (opts) => {
      const centers = await opts.ctx?.prisma?.centers?.findMany({
        where: {
          name: {
            contains: opts.input.name,
          },
        },
        include: {
          // Centers: true,
          // Batches: true,
          // sports: true,
          // batches: true,
          // centers: true,
        },
      });

      return centers;
    }),
  createCenter: publicProcedure
    .input(
      z.object({
        name: z.string(),
        image: z.string(),
        mobile: z.string(),
        address: z.string(),
      })
    )
    .mutation(
      async ({
        input: {
          name,
          about,
          contactNumber,
          email,
          designation,
          gender,
          certificates,
          dateOfBirth,
          sports,
          trainingLevel,
          experienceLevel,
          batchIds,
          centerIds,
        },
        ctx,
      }) => {
        const sportsId = sports.map(({ value }) => value);
        const response = await ctx.prisma.centers.create({
          data: {
            name: name,
            about: about,
            // contactNumber: contactNumber,
            email: email,
            designation: designation,
            gender: gender.toLowerCase(),
            // certificates: {
            //   create: certificates,
            // },
            // sports: {
            //   create: sportsId.map((id) => ({
            //     sport: {
            //       connect: {
            //         id: Number(id),
            //       },
            //     },
            //   })),
            // },
            centerId: 1,
            // centers: {
            //   create: centerIds.map((id) => ({
            //     center: {
            //       connect: {
            //         id: Number(id),
            //       },
            //     },
            //   })),
            // },
            // batches: {
            //   create: batchIds.map((id) => ({
            //     batch: {
            //       connect: {
            //         id: Number(id),
            //       },
            //     },
            //   })),
            // },
            experience: "",
            academyId: 1,
            dateOfBirth: dateOfBirth,
            trainingLevel: "advanced",
            experienceLevel: "two_five",
          },
        });
        return response;
      }
    ),
  editCenter: publicProcedure
    .input(
      z.object({
        name: z.string(),
        about: z.string(),
        contactNumber: z.string(),
        email: z.string(),
        designation: z.string(),
       
        dateOfBirth: z.date(),
    
        batchIds: z.array(z.number()),
        centerIds: z.array(z.number()),
        coachId: z.number(),
      })
    )
    .mutation(
      async ({
        input: {
          name,
          about,
          contactNumber,
          email,
          designation,
          gender,
          certificates,
          dateOfBirth,
          // sports,
          trainingLevel,
          experienceLevel,
          // batchIds,
          // centerIds,
          coachId,
        },
        ctx,
      }) => {
        const sportsId = sports.map(({ value }) => value);
        //eslint-disable-next-line no-console
        const response = await ctx.prisma.centers.update({
          where: {
            id: coachId,
          },
          data: {
            name: name,
            about: about,
            contactNumber: contactNumber,
            email: email,
            designation: designation,
            gender: gender.toLowerCase(),
            // certificates: {
            //   create: certificates,
            // },
            // sports: {
            //   create: sportsId.map((id) => ({
            //     sport: {
            //       connect: {
            //         id: Number(id),
            //       },
            //     },
            //   })),
            // },
            // centers: {
            //   create: centerIds.map((id) => ({
            //     center: {
            //       connect: {
            //         id: Number(id),
            //       },
            //     },
            //   })),
            // },
            // batches: {
            //   create: batchIds.map((id) => ({
            //     batch: {
            //       connect: {
            //         id: Number(id),
            //       },
            //     },
            //   })),
            // },
            dateOfBirth: dateOfBirth,
            trainingLevel: "advanced",
            experienceLevel: "two_five",
          },
        });

        return response;
      }
    ),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
