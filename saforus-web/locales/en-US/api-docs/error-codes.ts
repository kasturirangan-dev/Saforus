const errorCodes = {
  title: 'Error Code Pattern',
  description:
    'This document is created to assist developers in understanding and handling errors efficiently.',
  format: {
    title: 'Error Code Pattern',
    'content-1':
      'Error codes follow the format <strong>{{ SERVICE_NAME }}{{ FLAG }}{{ SEQUENCE }}</strong>, with components structured as follows:',
    'content-2': '다음은 오류 메시지 예입니다.',
    'example-error-message': 'Example of error message',
  },
  codes: {
    title: 'Main Error Codes',
    authentication: {
      title: 'Authentication',
    },
    watermarking: {
      title: 'Watermarking',
    },
    detection: {
      title: 'Watermark Detection',
    },
  },

  table: {
    system: 'System Error',
    business: 'Business Logic Error',
    code: 'Code',
    description: 'Causes of the error',
    action: 'Mitigations',
  },
};

export default errorCodes;
