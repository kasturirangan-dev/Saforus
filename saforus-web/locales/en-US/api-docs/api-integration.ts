const apiIntegration = {
  title: 'Service Integration',
  'api-spec': {
    title: 'API Specification',
    request: 'Request',
    response: 'Response',
    'try-it': 'Try it out',
    url: 'URL',
    method: 'Method',
    header: 'Header',
    pathVariables: 'Path Variables',
    parameters: 'Parameters',
    body: 'Body',
    properties: 'Properties',
    type: 'Type',
    note: 'Note',
    bodyNa: 'N/A',
  },
  'example-code': {
    title: 'Sample Code',
    request: 'Request',
    response: 'Response',
    overall: 'Overall',
  },
};
const integrationBasic = {
  title: 'Getting Prepared',
  description:
    'This page explains the basic concepts that you need to understand before integrating SaForus CS API.',
  'app-authentication': {
    title: 'App Authentication',
    'content-1': `Your app or web service requires token-based authentication to access the API server. Each time the app calls the our API, it must send this token to the server as a "Credential."`,
    'content-2': `Onboarding process for obtaining an access token is as follows.`,
  },

  'api-request-retry': {
    title: 'Retrying API Requests',
    'content-1': `API requests can fail due to network issues, rate limits, timeouts, or service problems.
      <ul>
        <li>For efficient handling, it's recommended to implement retries using exponential backoff (increasing wait time) and/or jitter (random delay).</li>
        <li>Additionally, include a unique identifier (<anchorText>Idempotency Key</anchorText>) to ensure that, even if requests are sent multiple times, the server processes them only once.</li>
      </ul>`,
  },
  'idempotency-guarantee': {
    title: 'Idempotency Assurance',
    'content-1': `In cases where API calls fail for no clear reason, idempotency is crucial for safely retrying the same API. SaForus CS services ensure idempotency for the following APIs, meaning that even if the same request is called multiple times, it will only be processed once:.
     
      <ul>
        <li><code>/api/saforus-cs-api-wtr/ext/v1/orders</code> (Watermarking orders)</li>
        <li><code>/api/saforus-cs-api-pd/ext/v1/orders</code> (Watermark detection orders)</li>
      </ul>
      For example, if a watermark application request fails due to a network error, including an idempotency key in the request header ensures that the request is processed only once, regardless of how many times it is called.
      
      We recommend using UUID Version 4 as the idempotency key.`,
    alert:
      '<strong>Note:</strong> The idempotency key is not shared across different API resources. However, it is not recommended to use the same key for different operations. To avoid duplication, each API should have a unique idempotency key.',
  },
  timeout: {
    title: 'Timeout',
    'content-1':
      'A 30-second timeout is applied to ensure that requests can be retried as quickly as possible in case of failure. It is recommended that your application or service also implement the same timeout setting for consistency.',
  },
  'server-response': {
    title: 'Response Body',
    'overall-structure': 'Overall structure',
    'code-example': {
      title: 'Code Example',
      table: {
        code: 'Code',
        description: 'Description',
        example: 'Example',
        failure: 'Fail',
        success: 'Succeed',
      },
    },
    'empty-data': {
      title: 'Handling Empty Data',
      content: `<ul>
          <li>Empty data refers to <red>null</red>, empty arrays <red>[]</red>, or empty objects <red>{}</red>.</li>
          <li>Such meaningless empty data is not included in the response structure. </li>
          <li>Please refer to the example of the CS API reponse structure below.</li>
        </ul>`,
    },
    'empty-types': {
      title: 'Types of Empty Data',
      table: {
        case: 'Empty Datas',
        normal: 'Typical API Response',
        expected: 'Saforus CS API Response',
      },
    },
  },
  webhook: {
    title: 'Webhooks',
    'content-1': `This service records resource key changes as events and delivers them to your app or service via webhooks. The main events are as follows, and the complete list of events can be found below:
      <ul>
        <li><code>WTR_ORDER.PROCESSED</code></li>
        <li><code>PD_ORDER.PROCESSED</code></li>
      </ul>
      When an event occurs, a HTTP POST request is sent to the webhook's URL, allowing your app or service to take action.`,
    'content-2': 
    'For more detailed information on registering webhooks, please refer to the Webhook Registration page.',
  },
};

const quickStart = {
  title: 'Quick Integration',
  description:
    `This document offers a quick guide to testing and getting started with our service. While you would typically create your own API key through your account, this setup allows you to jump right in.
      Feel free to use the API key below to explore and experiment with our API!`,
  'get-start': {
    title: 'Introduction',
    'content-1': `This guide outlines the key APIs and their call sequences for a quick understanding of SaForus CS API service. 
      For the full API list, please refer to <anchorText>Explore Available APIs</anchorText>.

      Core Functionalities:
      <ul>
        <li><strong>Apply invisible watermark</strong> to digital content</li>
        <li><strong>Detect watermark</strong> in watermarked content</li>
      </ul>`,
    'content-2': `<strong>How to test</strong>: 
        To test the API, use the information below to execute your requests.`,
    staging: {
      title: 'Staging',
      domain: '<anchorText>https://stag-cs.saforus.com</anchorText>',
      'api-key': '43f87542-1ce4-4ef8-8413-138e8d766278',
    },
    production: {
      title: 'Production',
      domain: '<anchorText>https://cs.saforus.com</anchorText>',
      'api-key': 'Get API Key',
    },
    alert: `The API key above is provided for testing purposes only. If you’re planning to use it in production, please reach out to us for your customer-specific API key!`,
  },
  watermarking: {
    title: 'Digital Watermarking',
    flowchart: {
      title: 'Watermarking Workflow',
    },
    create: {
      title: 'Create Watermarking Order',
      content:
        'This API allows you to create an order for embedding an invisible watermark. ApiKey is required for the authentication.',
    },
    'file-upload': {
      title: 'Upload Files',
      content:
        'You can upload files to watermark using the upload URLs provided in the previous section.',
    },
    get: {
      title: 'View Watermarking Order',
      content: `This API is provided to check the order status. An ApiKey is required for authentication.`,
    },
  },
  detection: {
    title: 'Watermark Detection',
    flowchart: {
      title: 'Detection Workflow',
    },
    create: {
      title: 'Create Detection Order API',
      content:
        'This API allows you to create a new piracy detection order. An ApiKey is required for authentication.',
    },
    'file-upload': {
      title: 'Upload Files',
      content:
        'You can upload files to watermark using the upload URLs provided in the previous section.',
    },
    get: {
      title: 'View Detection Order',
      content: `This API allows you to check your detection order’s information. An ApiKey is required for authentication.`,
    },
  },
  webhook: {
    title: 'Register Webhook Endpoint (Optional)',
    'content-1':
      'This API lets you register webhook endpoints for notifications about your watermarking and piracy detection order results. If you have any enquiry (e.g. register a custom secret), please <anchorText>contact us</anchorText> for assistant.',
  },
};

export { apiIntegration, integrationBasic, quickStart };
