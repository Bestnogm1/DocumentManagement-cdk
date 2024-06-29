#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DocumentManagementStack } from '../lib/document_management-stack';

const app = new cdk.App();
new DocumentManagementStack(app, 'DocumentManagementStack', {
  description: "Basic DocumentManagement  system",
  stackName: "DocumentManagement",
});