
import s3 from '../../../lib/aws';
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

const uploadSchema =z.object({
    // Define the input schema here if necessary
    file: z.string(),
    filename: z.string(),
    mimetype: z.string(),
    key: z.string().optional()
  })
  

// Now add this object into an array

export const uploadRouter = createTRPCRouter({
  uploadImage: publicProcedure
    .input(uploadSchema)
    .mutation(
      async ({
        input,
      }) => {
        const { file, filename, mimetype, key } = input;

      if (!file) {
        throw new Error('No file provided');
      }

      const uploadParams = {
        Bucket: process.env.BUCKET_NAME!,
        Key: `${key??'uploads'}/${Date.now()}_${filename}`,
        Body: Buffer.from(file, 'base64'),
        ContentType: mimetype,
      };

      try {
        const data = await s3.upload(uploadParams).promise();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        return { url: data.Key }
      } catch (err:any) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
        throw new Error(`Upload failed: ${err.message}`);
      }
    }

    )
});
