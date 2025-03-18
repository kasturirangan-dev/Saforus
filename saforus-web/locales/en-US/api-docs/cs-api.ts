const csApi = {
  title: 'Explore Available APIs',
  descriptionTable: {
    step: 'Step',
    description: 'Description',
    note: 'Note',
  },
  example: 'Sample',
  authentication: {
    title: 'Authentication',
    description: 'This page explains the account authentication process and related APIs.',
    'account-flow': {
      title: 'Account  Flow',
      flowchart: {
        title: 'Account  Flow',
        content: `According to this flow, credentials are provided in advance and you can change password (optional) after a successful login.`,
      },
      login: {
        title: 'Login API',
        content:
          'You can use this API to generate an access token with the provided credentials.',
      },
      'change-password': {
        title: 'Change Password API',
        content: 'This API is used to change the password.',
      },
    },
    'password-reset': {
      title: 'Password Reset',
      flowchart: {
        title: 'Password Reset Flow',
        content:
          'If you have forgotten your password, you can initiate the password reset flow as follows.',
      },
      trigger: {
        title: 'Trigger Password Reset API',
        content: 'This API is used to trigger the password reset process.',
      },
      reset: {
        title: 'Password Reset API',
        content: 'This API is used to provide the new password in the password reset flow.',
      },
    },
  },
  apiKeys: {
    title: 'Manage API Keys',
    description:
      'You can call the CRUD APIs to manage API keys. This document provides usage instructions and examples for the API key management APIs.',
    create: {
      title: 'Create API Key',
      content: 'This is the API for creating an API key.',
    },
    search: {
      title: 'Get API Key',
      content: 'This is the API for getting an API key.',
    },
    update: {
      title: 'Update API Key',
      content: 'This is the API for updating an API key.',
    },
    delete: {
      title: 'Delete API Key',
      content: 'This is the API for deleting an API key.',
    },
  },

  watermarking: {
    title: 'Digital Watermarking',
    description:
      'This page explains how to create watermarking orders to embed watermark codes into specified files and retrieve order information.',
    create: {
      title: 'Create Watermarking Order API',
      flowchart: {
        title: 'Watermarking Order Flow',
        content:
          'This flow explains the process of creating an order to embed an invisible watermark to a file.',
      },
      'create-api': {
        title: 'Create Watermarking Order API ',
        content:
          'This API is provided to create a Watermarking order. An Api Key is required for authentication.',
      },
      example: {
        title: 'Sample Code',
        content: 'Here is a sample code for creating a watermarking order.',
      },
    },
    get: {
      title: 'View Watermarking Order',
      flowchart: {
        title: 'Download File',
        content:
          'After receiving the order processing results via the webhook, you can download the related files following the flow below.',
      },
      'get-api': {
        title: 'View Watermarking Order API',
        content:
          'This API is provided to check the order status. An Api Key is required for authentication.',
      },
      example: {
        title: 'Sample Code',
        content:
          'Here is a sample code for getting a watermarking order result.',
      },
    },
  },

  detection: {
    title: 'Watermark Detection',
    description:
      'This page explains how to create a detection order to extract a watermark code from a designated file and get the order information.',
    create: {
      title: 'Create Detection Order',
      flowchart: {
        title: 'Create Detection Order Flow',
        content:
          'To check if a file contains a watermark code, you can create a detection order.',
      },
      'create-api': {
        title: 'Create Detection Order API',
        content: 'This API allows you to create a new piracy detection order. Api Key is required for authentication.',
      },
      example: {
        title: 'Sample Code',
        content:
          'Here is a sample code for creating a Watermark Detection Order.',
      },
    },
    get: {
      title: 'View Detection Order',
      flowchart: {
        title: 'View Detection Order',
        content:
          'After receiving the order processing result through a webhook, you can check the watermark code (if present) in the given file.After receiving the order processing result through a webhook, you can check the watermark code (if present) in the given file.',
      },
      'get-api': {
        title: 'View Detection Order API',
        content:
          'This API allows you to check your detection order’s information. Api Key is required for authentication.',
      },
      example: {
        title: 'Sample Code',
        content:
          'Here is a sample code for creating a Watermark Detection Order.',
      },
    },
  },
  shareFile: {
    title: 'Share Files',
    description:
      'This guide explains the API to share watermarked files using an order ID, enabling efficient access and distribution.',
    'share-flow': {
      title: 'Share File',
      flowchart: {
        title: 'Share File Workflow',
      },
      description: {
        title: 'Workflow Description',
      },
    },
    'share-api': {
      title: 'Share Watermarked File API',
      'content-1':
        'You can use this API to share watermarked files based on the order ID.',
    },
    example: {
      title: 'Sample Code',
    },
  },
  deleteFile: {
    title: 'Delete Files',
    description:
      'You can request the deletion of all files associated with a specific order. This page explains the file deletion process.',
    watermark: {
      title: 'Delete Original and Watermarked File',
      flowchart: {
        title: 'Delete File Flow',
        content:
          'You can delete all original and watermarked files associated with a specific order.',
      },
      'delete-api': {
        title: 'Delete File API',
        content:
          'This API allows you to delete original and watermarked files based on the order ID.',
      },
    },
    piracy: {
      title: 'Delete Detected File',
      flowchart: {
        title: 'Delete Detected File Flow',
        content:
          'All watermark-detected files associated with a specific order can be deleted.',
      },
      'delete-api': {
        title: 'Delete Detected File API',
        content:
          'You can use this API to delete watermark-detected files based on the order ID.',
      },
    },
  },
  webhooks: {
    title: 'Webhooks',
    description:
      'You can connect a webhook to receive application events in real-time.',
    register: {
      title: 'Webhook Registration',
      'content-1':
        'When events occur(eg: <code>WTR_ORDER.PROCESSED</code>, <code>PD_ORDER.PROCESSED</code> etc)notifications are sent through the webhook. For the full list of events, please refer to the <anchorText>Webhook Events section</anchorText>.',
      'alert-1':
        'New event types are continuously added, and you can select which events to handle and how to process them. Ensure system functionality when implementing event listeners.',
      'content-2':
        'Upon event occurrence, an HTTP POST request is sent to the configured webhook URL, allowing you to perform follow-up actions.',
      'alert-2':
        'To prevent multiple processing of the same event, it is recommended to maintain <anchorText>idempotency</anchorText> in the webhook handler.',
      'content-3':
        'Webhook events are delivered to the specified URL in a single attempt, with up to three retries using an exponential backoff algorithm if delivery fails (due to timeout or non-200 HTTP response code). Events are executed as they occur, but the order may vary, so handle accordingly. This ordering issue is being gradually resolved through platform improvements.',
      'alert-3':
        'To prevent duplicate handling of retried events, use <code>eventId</code> as the <anchorText>idempotency</anchorText> key.',
    },
    securing: {
      title: 'Webhook Security (Optional)',
      'content-1': `<strong>Setting Up to Receive Only Expected Requests</strong>
        <ul>
          <li>Once the server is configured to receive payloads, it will accept all payloads sent to the specified endpoint. </li>
          <li>For security, it’s recommended to verify that the payloads are indeed sent by SaForus CS. </li>
          <li>You can set an API key for payload signature validation when creating the webhook.</li>
        </ul>
        <br /> 
        <strong>Setting a Custom Webhook Secret</strong>
        <ul>
          <li>If you prefer to use your own webhook secret, please contact <linkSupport>customer support</linkSupport>.</li>
          <li>Platform improvements are ongoing, and soon you’ll be able to set the secret directly in <linkConsole>My Console</linkConsole>.</li>
        </ul>
        <br /> 
        <strong>Payload Verification</strong>
        <ul>
          <li>When an API key is set, SaForus CS generates a hashed signature for the entire webhook request body using the HMAC SHA-256 algorithm. This signature, encoded in base64, is included in the X-MarkAny-Signature header and sent along with the request.</li>
          <li>
            To verify the signature, compare the hashed value with the X-MarkAny-Signature header value.
            <ul>
              <li><strong>Match:</strong> The request is verified.
              <li><strong>Mismatch:</strong> The request may have been tampered with or forged during transmission.
            </ul>
          </li>
        </ul>`,
      'event-example': 'Sample Code',
      'validate-signature': 'Example for Signature Verification',
    },
    events: {
      title: 'Webhook Events',
      'content-1': `Events are used to log significant changes to resources. Once an event is generated, it is sent through a webhook call.
        
        Event Type:  <code>{{RESOURCE}}.{{EVENT}}</code> 

        Each event includes the following fields:
        <ul>
          <li><code>eventId</code>: Identifier for the event instance</li>
          <li><code>eventType</code>: Identifier for the event instance type</li>
          <li><code>occurredAt</code>: Identifier for the time the event occurred</li>
        </ul.`,
      table: {
        event: 'Event type',
        description: 'Description',
        example: 'Sample Code',
      },
    },
  },
};

export default csApi;
