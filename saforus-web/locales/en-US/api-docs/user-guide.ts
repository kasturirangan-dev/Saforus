const userGuide = {
  title: 'User guide',
  description:
    'Welcome to SaForus CS API Guide! \n This API is designed for enterprise customers, enabling seamless integration of invisible watermarks to enhance the security and traceability of your content. Explore our comprehensive documentation and tools to simplify your integration process.',
  version: {
    title: 'Versioning',
    'content-1': 'Version: 1.0 \n Latest Update: 02/09/2024',
  },
  introduction: {
    title: 'Introduction',
    'content-1': `Our service allows for seamless integration of invisible watermarking into your applications or web services. This API enables you to embed invisible watermarks in images, videos, audio files, and documents, while also providing the capability to detect these watermarks in leaked content. Additionally, you can monitor your API usage in real time for enhanced insights and performance.`,
  },
  supported: {
    title: 'Supported Formats',
    description:
      'We support a variety of formats to ensure you can easily integrate and use our services according to your needs.',
    'watermarking-formats': {
      title: 'Watermarking',
      image: 'JPG, PNG, TIFF, BMP',
      video: 'MP4',
      audio: 'MP3, WAV',
      document: 'PDF',
    },
    'detection-formats': {
      title: 'Watermark Detection',
      image: 'JPG, PNG, TIFF, BMP',
      video: 'MP4 (CBR) ',
      audio: 'MP3, WAV(default)',
      document: 'PDF',
    },
    alert:
      'Watermarking is supported for files up to 600MB. For files larger than this, please contact <linkSupport>customer service</linkSupport>.',
  },
  environments: {
    title: 'Environment',
    description: 'This service operates in two environments:',
    staging: {
      title: 'STAGING',
      content: `<ul>
          <li>Designed for API integration testing. When testing large files, there may be a slowdown in performance.</li>
          <li>AWS Region : ap-northeast-2 AWS region(Seoul)</li>
          <li>Server URL : https://stag-cs.saforus.com</li>
        </ul>`,
    },
    production: {
      title: 'PRODUCTION',
      content: `<ul>
          <li>Configured to handle large volumes of requests, minimizing downtime and ensuring optimal performance.</li>
          <li>AWS Region : ap-northeast-2 AWS region(Seoul)</li>
          <li>Server URL : https://cs.saforus.com</li>
        </ul>`,
    },
    alert:
      '<strong>Note:</strong> The features provided in the staging environment are the same as in the production environment, but the API processing speed may be slower in the staging environment.',
  },
  structure: {
    title: 'Highlights',
    description:
      'Here’s an overview of how this guide document is organized.\nEach section covers prerequisites, setup instructions, best practices, and troubleshooting tips, ensuring you can easily find the information needed for successful API integration.',
    'authentication-flow': {
      title: 'Athentication',
      content: `<ul>
          <li>Login</li> 
          <li>Change Password</li> 
          <li>Reset Password</li> 
          <li>Create Webhook Endpoint</li> 
        </ul>`,
    },
    'watermarking-flow': {
      title: 'Watermarking',
      content: `<ul>
          <li>Embed Watermark</li>
          <li>Get Waterarking Order</li>
        </ul>`,
    },
    'detection-flow': {
      title: 'Watermark Detection',
      content: `<ul>
          <li>Detect Watermarked File</li>
          <li>Get Detection Order</li>
        </ul>`,
    },
    'webhook-flow': {
      title: 'Webhook Registration',
      content: `<ul>
          <li>Webhook Registration</li>
          <li>Webhook Security</li>
          <li>Webhook Events</li>
        </ul>`,
    },
  },
};
export default userGuide;
