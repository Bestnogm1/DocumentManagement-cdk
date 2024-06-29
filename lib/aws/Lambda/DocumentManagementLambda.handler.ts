import { APIGatewayProxyEvent } from "aws-lambda"
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
const client = new S3Client({});

exports.handler = async (event: APIGatewayProxyEvent) => {
  const command = new ListBucketsCommand({});
  const { Buckets } = await client.send(command);
  console.log("Buckets: ");
  const bucketName = process.env.BUCKETNAME;
  console.log(Buckets?.map((bucket) => bucket.Name).join("\n"));
  return Buckets;
};
