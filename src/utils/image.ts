
import AWS from 'aws-sdk';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
});


const uploadImagetoS3=async(image: string)=>{
    const base64 :string=image.split(',')[1]||""
    const buffer = Buffer.from(base64, 'base64');

    // Upload to S3
    const params = {
      Bucket: process.env.BUCKET_NAME||"",
      Key: `${Date.now()}-${Math.random()}.jpg`,
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const uploadResult = await s3.upload(params).promise();

    // Save URL in MySQL using Prisma
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const imageUrl = uploadResult.Location;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return imageUrl
}

export default uploadImagetoS3