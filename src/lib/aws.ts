// lib/aws.ts
import AWS from 'aws-sdk';

AWS.config.update({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  accessKeyId: process.env.ACCESS_KEY!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  secretAccessKey: process.env.SECRET_KEY!,
  region: process.env.REGION, // e.g., 'us-east-1'
});

const s3 = new AWS.S3();

export default s3;
