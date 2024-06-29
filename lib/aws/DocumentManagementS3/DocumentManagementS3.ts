import * as cdk from 'aws-cdk-lib';
import { BlockPublicAccess, Bucket, BucketAccessControl, BucketProps } from "aws-cdk-lib/aws-s3"
import { Construct } from "constructs";

export class DocumentManagementS3 extends Bucket {
  constructor(scope: Construct, id: string, bucketProps: BucketProps) {
    const defaultProps: BucketProps = {
      bucketName: bucketProps.bucketName,
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      accessControl: BucketAccessControl.PRIVATE,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    }
    const mergedProps = { ...defaultProps, ...bucketProps };
    super(scope, id, mergedProps);
  }
}