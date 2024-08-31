import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import nextConnect from 'next-connect';
import s3 from '../../lib/aws';


// Define a type for the file object
interface MulterFile extends File {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const upload  = multer();

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err: { message: any; }, _req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): unknown; }; }; }) => {
    // `err` should be of type `Error`
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred.' });
    }
  }
});

// Middleware to handle file uploads
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
handler.use(upload.single('file'));

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
handler.post(async (req: { file: MulterFile | undefined; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; url?: string; }): void; new(): any; }; }; }) => {
  // Type assertion for the file
  const file = req.file ;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const uploadParams: AWS.S3.PutObjectRequest = {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: `uploads/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(uploadParams).promise();
    res.status(200).json({ url: data.Location });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred.' });
    }
  }
});

export default handler;
