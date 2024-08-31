// lib/aws.ts
import AWS from 'aws-sdk';

AWS.config.update({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION, // e.g., 'us-east-1'
});

const s3 = new AWS.S3();

export default s3;
