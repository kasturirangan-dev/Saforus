const tableData = {
  apiResponses: [
    {
      type: 'failure',
      code: 'CSW1000',
      description:
        'The request to Watermarking API failed with the error code <000>',
      example: `{
  "code": "CSW1001",
  "msg": "ERROR_UNKNOWN"
}`,
    },
    {
      id: 'CSA0001',
      type: 'failure',
      code: 'CSP1100',
      description:
        'The request to Piracy Detection API failed with the error code <100>',
      example: `{
  "code": "CSP1100",
  "msg": "ENTITY_NOT_FOUND"
}`,
    },
    {
      type: 'failure',
      code: 'CSA1001',
      description: `The request for API Authentication failed with the error code <001> (invalid input field ). 

      The response  includes the list of error fields & their reason of failures.`,
      example: `{
  "code": "CSA1001",
  "msg": "Input invalid",
  "data": {
    "errorDetails": [
      {
        "msg": "must not be blank",
        "propertyName": "accountName"
      }
    ]
  }
}`,
    },
    {
      type: 'success',
      code: 'CSA0000',
      description:'The request for API Authentication succeeded & the API returns entity fields.',
      example: `{
  "code": "CSA0000",
  "msg": "OK",
  "data": {
    "token": "eyJhbGciOiJIUzUxMiJ9"
  }
}`,
    },
    {
      type: 'success',
      code: 'CSA000A',
      description:
        'The request for API Authentication succeeded & the client should continue the flow with path A.',
      example: `{
  "code": "CSA000A",
  "msg": "Take path A",
  "data": {
    "accountId": "51d48610-7ae2-4ed9-8c6b-7c5ab6735be2",
    "email": "foo@test.com"
  }
}`,
    },
    {
      type: 'success',
      code: 'CSA000B',
      description:
        'The request for API Authentication succeeded & the client should continue the flow with path B.',
      example: `{
  "code": "CSA000B",
  "msg": "Take path B",
  "data": {
    "stepToken": "S86rZL0khpgc5mKFZfLg",
    "link": "https://bar.com "
  }
}`,
    },
  ],

  emptyExamples: [
    {
      case: 'Empty Data',
      type: 'NULL',
      normal: `{
  "code": "some code",
  "msg": "some msg",
  "data": {
    "accountId": "some account id",
    "accountName": null // Deleted
  }
}`,
      expected: `{
  "code": "some code",
  "msg": "some msg",
  "data": {
    "accountId": "some account id"
  }
}`,
    },
    {
      case: 'Empty Aray',
      type: '[]',
      normal: `{ 
 "code": "some code",
 "msg": "some msg",
 "data": {
  "accountId": "some account id",
  "orders": [] // Deleted
 }
}`,
      expected: `{
  "code": "some code",
  "msg": "some msg",
  "data": {
    "accountId": "some account id"
  }
}`,
    },
    {
      case: 'Empty Object',
      type: '{}',
      normal: `{
  "code": "some code",
  "msg": "some msg",
  "data": {
    "accountId": "some account id",
    "moreInfo": {} // Deleted
  }
}`,
      expected: `{
  "code": "some code",
  "msg": "some msg",
  "data": {
    "accountId": "some account id"
  }
}`,
    },
  ],

  eventExamples: [
    {
      event: 'WTR_ORDER.PROCESSED',
      description: '워터마크 주문이 처리될 때 발생',
      example: `{
  "eventId": "84236014-f6bb-4b6f-8754-5ce9c595d333",
  "eventType": "WTR_ORDER.PROCESSED",
  "occurredAt": "2024-06-05T11:03:45Z",
  "data": {
    "id": "e8f9210b-d09c-4824-bee3-1e7b70d8442f",
    "idempotencyKey": "2eac37bd-e1e2-44fa-b63a-f84ccc7eacc8",
    "createdAt": "2024-06-04T11:03:45Z",
    "updatedAt": "2023-06-04T11:04:45Z",
    "status": "PROCESSED"
  }
}`,
    },
    {
      event: 'PD_ORDER.PROCESSED',
      description: '워터마크 검출 주문이 처리될 때 발생',
      example: `{
  "eventId": "84236014-f6bb-4b6f-8754-5ce9c595d334",
  "eventType": "PD_ORDER.PROCESSED",
  "occurredAt": "2024-06-02T11:03:45Z",
  "data": {
    "id": "e8f9210b-d09c-4824-bee3-1e7b70d8442e",
    "idempotencyKey": "2eac37bd-e1e2-44fa-b63a-f84ccc7eacc7",
    "createdAt": "2024-06-01T11:03:45Z",
    "updatedAt": "2023-06-01T11:04:45Z",
    "status": "PROCESSED"
  }
}`,
    },
  ],
  accountFlow: [
    {
      step: 'login(credentials)',
      description: `Call API to login to create the access token.

        Refer to Login section for the API Specification.`,
      note: 'The generated access token will have a default expiry time of <strong>2 hours</strong>.',
      link: '/csapi/authentication#login',
    },
    {
      step: 'changePassword(accessToken, oldPassword, new Password)',
      description: `Call API to change password.
      
        Refer to <anchorText>Change Password</anchorText> section for the API Specification.`,
      note: ' ',
      link: '/csapi/authentication#change-password',
    },
    {
      step: 'createWebhookEndpoint(accessToken, url)',
      description: `Call API to create the webhook endpoint.

        Refer to Webhook <anchorText>Registration section</anchorText> for API Specification.`,
      note: ' ',
      link: '/webhook-api',
    },
    {
      step: `createApiKey(accessToken, apiKeyInfo)
      getAllApiKeys(accessToken)
      updateApiKey(accessToken, apiKey)
      deleteApiKey(accessToken, apiKey)`,
      description: `Call CRUD APIs to manage API keys.

        Refer to Manage API Keys section for the API Specifications.`,
      note: `You can manage the API keys both via ‘API Calls’ or ‘Dashboard Console’.

          The API keys <strong>MUST</strong> be used to call the Watermarking & Piracy Detection APIs.`,
      link: '/csapi/api-keys',
    },
  ],
  passwordReset: [
    {
      step: 'triggerPasswordReset(email)',
      description: `Call API to trigger the password reset flow.

        Refer to <anchorText>Trigger Password Reset</anchorText> section for the API Specification.`,
      note: `The generated password reset token will have a default expiry time of <strong>10 minutes</strong>.`,
      link: '/csapi/authentication#trigger-password-reset',
    },
    {
      step: 'resetPassword(new Password)',
      description: `Call API to change password.

        Refer to <anchorText>Reset Password</anchorText> section for the API Specification.`,
      note: ' ',
      link: '/csapi/authentication#reset-password',
    },
  ],
  shareFile: [
    {
      step: 'shareFiles(orderId)',
      description: `Call API to share all watermarked files belonging to an order.`,
      note: ' ',
    },
    {
      step: 'download(sharingWatermarkFileEmail.watermarkFiles)',
      description:
        'Call the Amazon S3 API to download watermarked files from S3 storage.',
      note: `<ul>
            <li>The link works only if the ordered file has not been deleted.</li>
            <li>The default expiration time for the link is <strong>7 days</strong>.</li>
            <li>To ensure reliability and optimal performance, we recommend using the AWS S3 SDK.</li>
          </ul>`,
      keyExample: 'codeExamples.wmDownloadWtr',
    },
  ],
  wmCreate: [
    {
      step: 'create(order)',
      description: `Call API to create watermarking orders.`,
      note: `You can create up to 10 orders at a time.`,
    },
    {
      step: 'upload(file, orderFile.uploadUrl)',
      description: `You can upload files to S3 storage by calling the Amazon S3 API.`,
      note: `<code>x-amz-meta-markany-file-type</code>: Must match the <code>fileType</code> field in the <code>files</code> section of the step 1 <strong>request</strong> body.

        <code>x-amz-meta-markany-wtr-msg</code>: Must match the <code>wtrMsg</code> field in the <code>files</code> section of the step 1 <strong>request</strong> body.
      
        <code>x-amz-meta-markany-file-id</code>: Must match the <code>id</code> field in the <code>orderFiles</code> section of the step 7 <strong>response</strong> body.
      
        <ul>
          <li>The default expiration time for the link is <strong>30 minutes</strong>.</li>
          <li>For reliability and performance, it is recommended to use the AWS S3 SDK.</li>
        </ul>`,
      keyExample: 'codeExamples.wmUpload',
    },
    {
      step: 'notify(orderProcessedEvent)',
      description: `The partner webhook is called to notify the result of the order processing.

For more details, please refer to the <anchorText>Webhook Registration</anchorText> section.`,
      note: ' ',
      link: '/webhook-api',
    },
  ],
  wmGetOrder: [
    {
      step: 'getOrder(orderQuery)',
      description: `You can query information about your watermarking order by calling the API.`,
      note: ' ',
    },
    {
      step: 'download(orderFile.origDownloadUrl)',
      description: `To download the original file from S3 storage, call the Amazon S3 API.`,
      note: `<ul>
        <li>The link will only work if the file has been successfully uploaded.</li>
        <li>The default expiration time for the link is <strong>30 minutes</strong>.</li>
        <li>It is recommended to use the AWS S3 SDK for reliability and performance.</li>
        </ul>`,
      keyExample: 'codeExamples.wmDownloadOrigin',
    },
    {
      step: 'download(orderFile.wtrDownloadUrl',
      description: `To download the watermarked file from S3 storage, call the Amazon S3 API.`,
      note: `<ul>
          <li>The link will only work when the <code>orderFiles[*].status</code> field is <code>SUCCEEDED</code>.</li>
          <li>The default expiration time for the link is <strong>30 minutes</strong>.</li>
          <li>It is recommended to use the AWS S3 SDK for reliability and performance.</li>
        </ul>`,
      keyExample: 'codeExamples.wmDownloadWtr',
    },
  ],
  pdCreate: [
    {
      step: 'create(order)',
      description: `Call API to create a watermark detection order.`,
      note: `A maximum of 10 orders can be created in a single request.A maximum of 10 orders can be created in a single request.`,
    },
    {
      step: 'upload(file, orderFile.uploadUrl)',
      description: 'Upload files to S3 storage by calling the Amazon S3 API.',
      note: `<code>x-amz-meta-markany-file-type</code>: Must match the <code>fileType</code> field in the <code>files</code> section of the <strong>request</strong> body in Step 1.

        <code>x-amz-meta-markany-file-id</code>: Must match the <code>id</code> field in the <code>orderFiles</code> section of the <strong>response</strong> body in Step 7.
  
        <code>x-amz-meta-markany-resolution</code>: Must match the <code>resolution</code> field in the <code>orderFiles</code> section of the <strong>response</strong> body in Step 7 (applies to <code>DOCUMENT</code> file types only)
        
        <ul>
          <li>The default expiration time for the link is <strong>30 minutes</strong>.</li>
          <li>For reliability and performance, it's recommended to use the AWS S3 SDK.</li>
        <ul>`,
      keyExample: 'codeExamples.pdUpload',
    },
    {
      step: 'notify(orderProcessedEvent)',
      description: `The partner webhook will be called to notify the order processing result.

      Refer to the <anchorText>Webhook Registration</anchorText> section for more details.`,
      note: ' ',
      link: '/webhook-api',
    },
  ],
  pdGetOrder: [
    {
      step: 'getOrder(orderQuery)',
      description: `You can query information about your watermarking order by calling the API.`,
      note: ' ',
    },
    {
      step: 'download(orderFile.origDownloadUrl)',
      description:
        '`To download the original file from S3 storage, call the Amazon S3 API.`',
      note: `<ul>
          <li>The link will only work when the <code>orderFiles[*].statusorderFiles[*].status</code> field is <code>SUCCEEDED</code>.</li>
          <li>The default expiration time for the link is <strong>30 minutes</strong>.</li>
          <li>It is recommended to use the AWS S3 SDK for reliability and performance.</li>
        </ul>`,
      keyExample: 'codeExamples.wmDownloadWtr',
    },
  ],
  deleteWatermarkFiles: [
    {
      step: 'deleteFiles(orderId)',
      description:
        'Call API to delete all original and watermarked files associated with a specific order.',
      note: ' ',
    },
  ],
  deletePiracyFiles: [
    {
      step: 'deleteFiles(orderId)',
      description:
        'Call API to delete all watermark-detected files associated with a specific order.',
      note: ' ',
    },
  ],
  wmOrderEvents: [
    {
      step: 'WTR_ORDER.PROCESSED',
      description: 'Triggered when the watermarking order processing is completed.',
      note: ' ',
      keyExample: 'tableData.eventExamples.0.example',
    },
  ],
  pdOrderEvents: [
    {
      step: 'PD_ORDER.PROCESSED',
      description: 'Triggered when the watermark detection order processing is completed.',
      note: ' ',
      keyExample: 'tableData.eventExamples.1.example',
    },
  ],
};

export default tableData;
