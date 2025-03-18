import authImg from './images/auth.png';
import authFlow from './images/authFlow.png';
import passwordResetFlow from './images/passwordResetFlow.svg';
import watermarkingCreateFlow from './images/watermarkingCreateFlow.svg';
import watermarkingdownloadFlow from './images/watermarkingDownloadFlow.svg';
import piracyDetectionOrderFlow from './images/piracyDetectionOrderFlow.svg';
import passwordDetectionGetFlow from './images/passwordDetectionFlow.svg';
import deleteWatermarkFlow from './images/deleteWatermarkFlow.png';
import deletePDFlow from './images/deletePDFlow.png';
import shareWatermarkFlow from './images/shareWatermarkFlow.png';


const introduction = `
# Version History v0.2

# Overview

## Purpose
This document describes how to integrate with Saforus Content Security to utilize MarkAny solutions such as watermarking, piracy detection, ensuring smooth and efficient operation.

## Scope
This document is for our Saforus CS APIs only. It will not have full details about the journey or solutions (such as partner business verification process or test pack – which can be found elsewhere).

## Audience
This document is intended for managers & technical resources that will develop integration code to interface to CS API system.


# Integration Guide

## Introduction

### Integration Points

To facilitate the integration of your systems with our environments, we provide various integration points, including:

- **APIs**: Comprehensive RESTful APIs that allow for secure and efficient data exchange between our systems.
- **Webhooks**: Real-time notifications to keep your systems in sync with ours.

### Getting Started

Before beginning the integration process, please ensure that you have the required credentials and access permissions. Detailed documentation on API endpoints, authentication methods, and data formats is provided in subsequent sections of this guide. Our Team is available to assist you with any questions or issues that may arise during the integration process.

By following this guide, you will be able to integrate your systems with our production environment efficiently and securely, ensuring a seamless operation that benefits both parties.

### Environment

Our API is available in two main environments:

Name | Description
--- | ---
\`Staging\` | The acceptance test environment for integration.
\`Production\` | The production environment that is configured to handle high volumes of requests, ensuring minimal downtime & optimal performance.


> **NOTE:** We don’t limit features in the \`Staging\` environment. They are the same as \`Production\` environment.
MarkAny hosts both environments on AWS cloud in the ap-northeast-2 AWS region (Seoul). Please configure your infrastructure for this.

### Authentication Flow

MarkAny uses token-based authentication to enable an application to access our APIs.
Upon successful authentication and authorization, you will receive an access token, which is then used as a credential when calling the target API. The onboarding process to obtain an access token is as follows:
![Environment Diagram](${authImg} "Environment Setup")

The details regarding Authentication and Account APIs are described in [Authentication]  section.

### Required Fields

Unless specified otherwise, all fields in the request payload are required. Certain fields are only mandatory under specific circumstances, as indicated throughout the documentation.

### Retrying API Requests
API requests can fail for various reasons, including network component failures, API rate limits, timeouts, or service incidents. As a best practice, we recommend implementing a request retry mechanism with the following attributes:
- Retry should have an exponential backoff and/or jitter.
- Make sure to add idempotency key where applicable.

### Rate Limits

The rate limit is based on your credentials and is set to **20 requests per second**. This limit applies independently to each environment (\`Staging\` & \`Production\`). If the limit is exceeded, responses will include an error code along with a relevant message. Please contact MarkAny to request an increase in the limit.

### Timeouts

All APIs have timeouts of **30-second** to make sure we fail as soon as possible and allow you to retry the request. It's recommended to align client-side request timeouts accordingly. For details on retrieving order status by order identifier, please refer to the following sections:

- Get Watermarking Order
- Get Piracy Detection Order

### Idempotency

Some of our API operations support request idempotency, allowing you to call a sensitive operation multiple times and assume that its work will be done no more than once. We recommend the use of UUID version 4 idempotency keys.

The guarantee of idempotency is crucial when an API call has failed without a clear reason and a retry is due. For example, if creating an order does not succeed due to a network error, you can safely retry creating the order, passing the same idempotency key and assume the payment will occur no more than once, regardless of the number of calls.

Idempotency keys are guaranteed effective for **xxx years** from the time they're used successfully. After this time window, they will be recycled and existing keys will therefore be treated as new.|

> **NOTE** Idempotency keys are not shared between different API resources, so you could potentially use the same idempotency key for different types of operations, although we do not recommend it.

### Response Body

Overall structure |
--- |
\`{   "code": "some code", // Successful or failed code. See below.   "msg": "some message", // The human readable description of the code   "data": { // Optional field    // Entity fields in successful cases OR error field descriptions in validation failed cases  }}\` |



### Code description
Position | Description | Example
--- | --- | ---
First 3 chars | API Identification | WMS: Watermarking API<br>CSP: Piracy Detection API
4th char | Success or Failure | 0: Success<br>Other: Failure
Last 3 chars | Distinguish between cases | See Below

Position | Description | Example
--- | --- | ---
**FAILED CASES**||
\`CSW1000\` | The request to Watermarking API failed with the error code \`000\` | <code> \`<br>{  "code": "CSW1001",  "msg": "ERROR_UNKNOWN"}\` </code>
\`CSW1100\` | TThe request to Piracy Detection API failed with the error code \`100\` | <code> \`{  "code": "CSP1100",  "msg": "ENTITY_NOT_FOUND"}\` </code>
\`CSW1001\` | The request to Authentication API failed with the error code \`001\` (input field invalid). The response should include the list of error fields & their reason of failures. | <code> \`{  "code": "CSA1001",  "msg": "Input invalid, "data": { "errorDetails": [ { "msg": "must not be blank", "propertyName": "accountName" } ]"}\` </code>
**SUCCESSFUL CASES**||
\`CSA0000\` | The request to Authentication API succeeded & the API returns the entity fields. | <code> \`{  "code": "CSA0000",  "msg": "OK",  "data": {    "token": "eyJhbGciOiJIUzUxMiJ9"  }}\` </code>
\`CSA000A\` | The request to Authentication API succeeded & the client should continue the flow with the path A. | <code> \`{  "code": "CSA000A",  "msg": "Take path A",  "data": {    "accountId": "51d48610-7ae2-4ed9-8c6b-7c5ab6735be2",    "email": "foo@test.com"  }}\` </code>
\`CSA000B\` | The request to Authentication API succeeded & the client should continue the flow with the path B. | <code> \`{  "code": "CSA000B",  "msg": "Take path B",  "data": {    "stepToken": "S86rZL0khpgc5mKFZfLg",    "link": "https://bar.com "  }}\` </code>


###  Absent Values Treatment

- Absent values are \`null\`, empty array \`[]\` & empty object \`{}\`.
- For these values, we remove them completely from the response.

Case | Normal | Expected
--- | --- | ---
\`null\` value | \`{ "code": "some code", "msg": "some msg", "data": { "accountId": "some account id", "accountName": null } }\` | \`{ "code": "some code", "msg": "some msg", "data": { "accountId": "some account id" } }\`
empty array \`[]\` | \`{ "code": "some code", "msg": "some msg", "data": { "accountId": "some account id", "orders": [] } }\` | \`{ "code": "some code", "msg": "some msg", "data": { "accountId": "some account id" } }\`
empty object \`{}\` | \`{ "code": "some code", "msg": "some msg", "data": { "accountId": "some account id", "moreInfo": {} } }\` | \`{ "code": "some code", "msg": "some msg", "data": { "accountId": "some account id" } }\`

### How to get launched quickly

You are in control of a number of things that can accelerate the integration process. Here are some tips help save time:

- **Be responsive**: The sooner you raise your concerns (if any) to us as well as reply back to the questions from us, the sooner you can go live.

- **Use MarkAny standards**: We try to define standards for an easy integration purpose. While we are open to deviating from our standards in cases where it makes sense, this adds time to the implementation process.

- **Have a clearly defined product in mind to launch**: A lot of time can be lost if partners are still trying to figure out what their product should be. If at all possible, define a clear minimum viable product to launch with, and then implement additional functionality with us in future phases once you have a product in market.

- **Start on your technical integration early**: You can start integrating to our APIs as soon as we give you this guide. Our engineering support team is available to assist with any questions (recommended to setup a popular chat channel such as Slack). This will speed things up when you get access to our \`Staging\` & \`Production\` environments.

## High Level Flow

> **NOTE** :

- Text lines in red color: APIs that MarkAny provides to partner to consume (see MarkAny APIs section).
- Text lines in blue color: APIs that partner needs to implement for MarkAny to consume (see Webhooks section).


### Authentications

Account Flow

For this workflow, the credentials will be provided beforehand as described in Authentication section. Password could be changed once login successfully, as outlined below:
![Authentication Flow Diagram](${authFlow} "Authentication Flow")

Step | Description | Note
--- | --- | ---
1 - login(credentials) | Partner calls api to login to create the access token. <br> Please refer to Login section  for the API contract. | The generated access token will have a default expiry time of **2 hours**.
5 - changePassword(accessToken, oldPassword, new Password) | Partner calls api to change password. <br> Please refer to Change Password section for the API contract. | 
10 - createWebhookEndpoint(accessToken, url) | Partner call api to create the webhook endpoint. <br> Please refer to Create Webhook Endpoint section for the API contract.
15 - createApiKey(accessToken, apiKeyInfo) <br> 20 - getAllApiKeys(accessToken) <br> 24 - updateApiKey(accessToken, apiKey) <br> 28 - deleteApiKey(accessToken, apiKey) | Partner call CRUD apis to manage the api keys. <br> Please refer to Manage API Keys section for the API contracts. | Partner can manage the API keys both via the API calls or the dashboard console. <br> The API keys **MUST** be used to call the watermarking & piracy detection APIs.

Password Reset Flow

In case of forgetting password,, you can trigger the reset password flow as follows:

![Password Reset Flow Diagram](${passwordResetFlow} "Password Reset Flow")

Step | Description | Note
--- | --- | ---
1 - triggerPasswordReset(email) | Calls api to trigger the password reset flow. Please refer to Trigger Password Reset section for the API contract. | Please refer to Trigger Password Reset section for the API contract. The generated password reset token will have a default expiry time of **10 minutes**.
8 - resetPassword(passwordResetToken, new Password) | Calls api to change password. Please refer to Reset Password section for the API contract. 

### Watermarking Flow

Create Watermarking Order

This flow describes how to create an order to watermark files:

![Watermarking create Flow Diagram](${watermarkingCreateFlow} "Watermarking create Flow")
Step | Description | Note
--- | --- | ---
1 - create(order) | Calls api to create a watermarking order. Please refer to Create Watermarking Order section for the API contract. | The number of files allowed in an order is limited to 10.
8 - upload(file, orderFile.uploadUrl) | Calls Amazon S3 api to upload the files to the S3 storage managed by MarkAny. _Example_: \`curl --location --request PUT 'https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/864314f9-c2a1-4e10-a4ea-a4d194c0350a/d420f98a-966c-46c5-9e89-516d233866a7/test.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240514T043125Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-type%3Bx-amz-meta-markany-wtr-msg&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240514%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=7444e74e1b89d492e04d79d90c6ff81a2e6a68a41cbd37572089cbf9b4af3555' \\ --header 'x-amz-meta-markany-file-type: DOCUMENT' \\ --header 'x-amz-meta-markany-wtr-msg: 123' \\ --header 'x-amz-meta-markany-file-id: 49930994-c57d-4c8f-93e9-8f87bdb46592' \\ --data '@/Users/user/Documents/markany/sample-files/test.pdf'\` | \`x-amz-meta-markany-file-type\`: must have same value as the \`fileType\` field under the \`files\` field in the request body of step 1. \`x-amz-meta-markany-wtr-msg\`: must have same value as the \`wtrMsg\` field under the \`files\` field in the request body of step 1. \`x-amz-meta-markany-file-id\`: must have same value as the id field under the \`orderFiles\` field in the response body of step 7. The link will have a default expiry time of 30 minutes. Recommended to use AWS S3 SDK for reliability & performance purposes.
18 - notify(orderProcessedEvent) | MarkAny calls Partner webhooks to notify the order processing result. Please refer to Webhooks section for the guidance.


### Get Watermarking Order Flow

Upon receiving the order processing result from MarkAny via Webhooks, you can then download the relevant files via the below flow.

![Watermarking download Flow Diagram](${watermarkingdownloadFlow} "Watermarking download Flow")

Step | Description | Note
--- | --- | ---
1 - getOrder(orderQuery) | Calls api to get information about a watermarking order. Please refer to Get Watermarking Order section for the API contract. |
5 - download(orderFile.origDownloadUrl) | Calls Amazon S3 api to download the original uploaded files from the S3 storage managed by MarkAny.<br> _Example_:<br> \`curl --location 'https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/wtr/6f6fb61c-6a24-4059-a42c-e891f721eb52/f9dd8a26-7694-4e32-bc5b-c60cd57afd87/image002.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240528T043624Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240528%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=e6e556e3cbe2e372a0661b8934b5b72c17137e1e1f91351a97227f93e5a3f813' \` | The link works if the given file was uploaded successfully only. The link will have a default expiry time of 30 minutes. Recommended to use AWS S3 SDK for reliability & performance purposes.
7 - download(orderFile.wtrDownloadUrl) | Calls Amazon S3 api to download the watermarked files from the S3 storage managed by MarkAny.<br> _Example_:<br> \` curl --location 'https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/result/wtr/6f6fb61c-6a24-4059-a42c-e891f721eb52/f9dd8a26-7694-4e32-bc5b-c60cd57afd87/image002_sf2805.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240528T043624Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240528%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=94b42a7b231677526bb9b281b143d20d14d2cb96e700207904bb553b61f1984f' \` | The link works if the \`orderFiles[*].status\` field is SUCCEEDED only. The link will have a default expiry time of 30 minutes. Recommended to use AWS S3 SDK for reliability & performance purposes.



### Piracy Detection Flow

Create Piracy Detection Order

This flow describes how to create a Piracy Detection Order to detect if there is watermarked code in a the given files.

![Piracy Detection Flow Diagram](${piracyDetectionOrderFlow} "Piracy Detection Flow")

Step | Description | Note
--- | --- | ---
1 - create(order) | Calls api to create a piracy detection order. Please refer to Create Piracy Detection Order section for the API contract. | The number of files allowed in an order is limited to **10**.
8 - upload(file, orderFile.uploadUrl) | Calls Amazon S3 api to upload the files to the S3 storage managed by MarkAny. <br> _Example_: <br> \` curl\` --location --request PUT 'https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/cf5d8ce0-3d05-4c65-9fe8-7ed2a6f7f68d/28f45670-b0d1-47b0-a136-4a703a87b623/test_sf6789.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240604T040144Z&X-Amz-SignedHeaders=host%3Bx-amz-meta-markany-file-id%3Bx-amz-meta-markany-file-type%3Bx-amz-meta-markany-resolution&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240604%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=87febd6822d8d48d9cf17cea6e040c5c935e1e17251f403df87e2b47000a790e' \\ --header 'x-amz-meta-markany-file-type: DOCUMENT' \\ --header 'x-amz-meta-markany-file-id: eff68fb2-797d-4031-b770-c01e10fd7262' \\ --header 'x-amz-meta-markany-resolution: 1920x1080' \\ --data '@/Users/user/Downloads/test_sf6789.pdf' | \`x-amz-meta-markany-file-type\`: must have same value as the \`fileType\` field under the \`files\` field in the **request** body of step 1. \`x-amz-meta-markany-file-id\`: must have same value as the id field under the \`orderFiles\` field in the **response** body of step 7. \`x-amz-meta-markany-resolution\`: must have same value as the \`resolution\` field under the \`orderFiles\` field in the **response** body of step 7 (applicable for \`DOCUMENT\` file type only). The link will have a default expiry time of 30 minutes. Recommended to use AWS S3 SDK for reliability & performance purposes.
18 - notify(orderProcessedEvent) | MarkAny calls the Partner webhooks to notify the order processing result. Please refer to Webhooks section for the guidance. |

### Get Piracy Detection Order Flow

Upon receiving the order processing result from MarkAny via Webhooks, you can then check the watermarked code of the given files (if any).

![Piracy Detection Flow Diagram](${passwordDetectionGetFlow} "Piracy Detection Flow")

Step | Description | Note
--- | --- | ---
1 - getOrder(orderQuery) | Calls api to get information about a piracy detection order. Please refer to Get Piracy Detection Order section for the API contract. |
5 - download(orderFile.origDownloadUrl) | Calls Amazon S3 api to download the original uploaded files from the S3 storage managed by MarkAny. _Example_: \` curl  \` --location 'https://dev-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/pd/864314f9-c2a1-4e10-a4ea-a4d194c0350a/b9b4905b-5dc1-4a6a-b4db-d86e14c5732f/file1?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240415T193044Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240415%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=f27b2d7d4743e27842c870818b5a5e2e8a6e690b30675011f9d915cc766e4c14' | The link works if the given file was uploaded successfully only. The link will have a default expiry time of **30 minutes**. Recommended to use AWS S3 SDK for reliability & performance purposes.

### Delete files Flow

This flow describes how the partner can request MarkAny to delete all files belonging to an order of their choices.

Delete Original / Watermark Files/

![Delete Watermark Flow Diagram](${deleteWatermarkFlow} "Piracy Delete Watermark Flow")

Step | Description | Note
--- | --- | ---
1 - deleteFiles(orderId) | Calls api to delete all original & watermark files belonging to an order. <br> Please refer to Delete Original / Watermark Files section for the API contract.|

Delete Piracy Detection Files

![Delete Piracy Flow Diagram](${deletePDFlow} "Piracy Delete PD Flow")

Step | Description | Note
--- | --- | ---
1 - deleteFiles(orderId) | Calls api to delete all piracy detection files belonging to an order. <br> Please refer to Delete Piracy Detection Files section for the API contract.|

### Share Watermark Files

![Share Watermarking Flow Diagram](${shareWatermarkFlow} "Share Watermarking Flow")

Step | Description | Note
--- | --- | ---
1 - shareFiles(orderId) | Calls api to share all watermark files belonging to an order. <br> Please refer to Share Watermark Files section for the API contract.|
12 - download(sharingWatermarkFileEmail.watermarkFiles) | Calls Amazon S3 api to download the watermarked files from the S3 storage managed by MarkAny. <br> Example: <br> \` curl --location 'https://stag-saforus-cs-api.s3.ap-northeast-2.amazonaws.com/result/wtr/6f6fb61c-6a24-4059-a42c-e891f721eb52/f9dd8a26-7694-4e32-bc5b-c60cd57afd87/image002_sf2805.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240528T043624Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAQ44J43S6NWYVGGRJ%2F20240528%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=1800&X-Amz-Signature=94b42a7b231677526bb9b281b143d20d14d2cb96e700207904bb553b61f1984f' \` | The link works if the order hasn’t been marked as order files deleted yet. <br> The link will have a default expiry time of **7 days**. <br> Recommended to use AWS S3 SDK for reliability & performance.


`;
export default introduction;