
import s3 from '../../../lib/aws';
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";


const uploadSchema =z.object({
    // Define the input schema here if necessary
    file: z.string(),
    filename: z.string(),
    mimetype: z.string(),
  })
  

// Now add this object into an array

export const uploadRouter = createTRPCRouter({
  uploadImage: publicProcedure
    .input(uploadSchema)
    .mutation(
      async ({
        input,
        ctx,
      }) => {
        const { file, filename, mimetype } = input;

      if (!file) {
        throw new Error('No file provided');
      }

      const uploadParams = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        Bucket: process.env.BUCKET_NAME!,
        Key: `uploads/${Date.now()}_${filename}`,
        Body: file,
        ContentType: mimetype,
      };

      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const data = await s3.upload(uploadParams).promise();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        return { url: data.Location }
      } catch (err:any) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
        throw new Error(`Upload failed: ${err.message}`);
      }
      }
    )
});