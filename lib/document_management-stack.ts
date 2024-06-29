import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DocumentManagementS3 } from './aws/DocumentManagementS3/DocumentManagementS3';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class DocumentManagementStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const documentManagementS3Bucket = new DocumentManagementS3(this, "documentManagementS3Bucket", {
      bucketName: "document-management-file-bucket",
    })

    const documentManagementLambda = new NodejsFunction(this, "documentManagementLambda", {
      tracing: lambda.Tracing.ACTIVE,
      handler: 'handler',
      entry: 'lib/aws/Lambda/DocumentManagementLambda.handler.ts',
      environment: {
        BUCKETNAME: documentManagementS3Bucket.bucketName
      }
    })

    documentManagementS3Bucket.grantReadWrite(documentManagementLambda)
    const gateway = new apigateway.RestApi(this, id, {
      deployOptions: {
        dataTraceEnabled: true,
        tracingEnabled: true
      }
    })

    const endPoint = gateway.root.addResource("docs")
    endPoint.addMethod("GET", new apigateway.LambdaIntegration(documentManagementLambda))
  }
}
