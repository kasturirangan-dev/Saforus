const errorCodesData = {
  authentication: {
    system: [
      {
        code: 'CSA1000',
        description: 'The system fails for an unknown reason.',
        action: 'Retry the request or contact <linkSupport>customer service</linkSupport> for further assistance.',
      },
      {
        code: 'CSA1001',
        description: 'Invalid input field. Normally, it happens due to missing required fields.',
        action: 'Check the response for detailed information.',
      },
      {
        code: 'CSA1002',
        description: 'Missing one or more request parameters.',
        action: 'Check the response for detailed information.',
      },
      {
        code: 'CSA1003',
        description: 'HTTP message is not readable.  Normally, it happens if the request body is not a JSON object.',
        action: 'Check whether the request body is a JSON object.',
      },
      {
        code: 'CSA1004',
        description: 'Method argument types are mismatched. ',
        action: 'Check whether you are passing a correct value in the request endpoint.',
      },
      {
        code: 'CSA1005',
        description: 'HTTP media type is not supported.',
        action: 'Check whether you are passing a correct media type in your request.',
      },
      {
        code: 'CSA1006',
        description: 'HTTP request method is not supported.',
        action:
          'Make sure you are using a correct POST, PUT, GET, PATCH, DELETE method.',
      },
      {
        code: 'CSA1007',
        description: 'Missing a request header.',
        action: 'Check the <anchorText href="/csapi/authentication">Authentication</anchorText> to see if you missed any required header.',
      },
      {
        code: 'CSA1008',
        description: 'Invalid number format. This usually happens because the number field is not properly inputted.',
        action: 'Check if you are accidentally passing a string to a number field.',
      },
      {
        code: 'CSA1009',
        description: 'Unauthorized. This usually happens because the current account is not authorized to perform this request.',
        action: 'Check if the current account has a proper role to perform the request.',
      },
    ],
    business: [
      {
        code: 'CSA1100',
        description: 'Entity not found.',
        action: 'Check whether you are passing a correct ID for your request.',
      },
      {
        code: 'CSA1101',
        description: 'Entity invalid status.',
        action: 'Update the status of the requested entity.',
      },
      {
        code: 'CSA1102',
        description: 'Entity already exists.',
        action: 'Create a new entity which does not violate the unique constraint.',
      },
      {
        code: 'CSA1103',
        description: 'Notification sending failure.',
        action: 'Contact <linkSupport>customer service</linkSupport> for further assistance.',
      },
      {
        code: 'CSA1104',
        description: 'Invalid credential.',
        action: 'Check whether you are providing a correct username and password.',
      },
      {
        code: 'CSA1105',
        description: 'Notification event is not supported.',
        action: 'Contact <linkSupport>customer service</linkSupport> for further assistance.',
      },
      {
        code: 'CSA1106',
        description: 'Invalid JWT token.',
        action: 'Check if you are using the correct token.',
      },
      {
        code: 'CSA1107',
        description: 'JWT token is expired.',
        action: 'Generate a new token.',
      },
      {
        code: 'CSA1108',
        description: 'Invalid signature.',
        action: 'Contact <linkSupport>customer service</linkSupport> for further assistance.',
      },
      {
        code: 'CSA1109',
        description: 'API Key is expired.',
        action: 'Use a different API key or update the expire time for the current API key.',
      },
      {
        code: 'CSA1110',
        description: 'API Key limit exceeded (up to 10 API Keys per account).',
        action: 'Contact <linkSupport>customer service</linkSupport> to upgrade your service plan.',
      },
    ],
  },
  watermarking: {
    system: [
      {
        code: 'CSW1000',
        description: 'The system fails for an unknown reason.',
        action: 'Retry the request or contact <linkSupport>customer service</linkSupport> for further assistance.',
      },
      {
        code: 'CSW1001',
        description: 'Invalid input field. This usually happens because of missing required fields',
        action: 'Check the response for detailed information.',
      },
      {
        code: 'CSW1002',
        description: 'Missing one or more request parameters.',
        action: 'Check the response for detailed information.',
      },
      {
        code: 'CSW1003',
        description: 'HTTP message is not readable.  This usually happens if the request body is not a JSON object.',
        action: 'Check whether the request body is a JSON object.',
      },
      {
        code: 'CSW1004',
        description: 'Method argument types are mismatched.',
        action: 'Check whether you are passing a correct value in the request endpoint.',
      },
      {
        code: 'CSW1005',
        description: 'HTTP media type is not supported.',
        action: 'Check whether you are passing a correct media type in your request.',
      },
      {
        code: 'CSW1006',
        description: 'HTTP request method is not supported.',
        action:
          'Make sure you are using a correct POST, PUT, GET, PATCH, DELETE method.',
      },
      {
        code: 'CSW1007',
        description: 'Missing a request header.',
        action: 'Check the <anchorText href="csapi/watermarking">Watermarking API</anchorText> to see if you missed any required header.',
      },
      {
        code: 'CSW1008',
        description: 'Invalid number format. This usually happens because the number field is not properly inputted.',
        action: 'Check the request to see if you are accidentally passing a string to a number field.',
      },
      {
        code: 'CSW1009',
        description: 'Unauthorized. This usually happens because the current account is not authorized to perform this request.',
        action: 'Check if you are accidentally passing a string to a number field.',
      },
      {
        code: 'CSW1010',
        description: 'Invalid enum value.',
        action:
          'Check if the current account has a proper role to perform the request.',
      },
    ],
    business: [
      {
        code: 'CSW1100',
        description: 'Entity not found.',
        action: 'Check whether you are passing a correct id for your request.',
      },
      {
        code: 'CSW1101',
        description: 'Entity invalid status.',
        action: 'Update the status the requested entity.',
      },
      {
        code: 'CSW1103',
        description: 'Notification send fail.',
        action: 'Contact <linkSupport>customer service</linkSupport> for further assistance.',
      },
      {
        code: 'CSW1105',
        description: 'Notificiation event is not supported.',
        action: 'Contact <linkSupport>customer service</linkSupport> for further assistance.',
      },
      {
        code: 'CSW1106',
        description: 'Invalid JWT token.',
        action: 'Check if you are using a correct token.',
      },
      {
        code: 'CSW1107',
        description: 'JWT token is expired.',
        action: 'Generate a new token.',
      },
      {
        code: 'CSW1108',
        description: 'Invalid watermark message.',
        action:
          'Check the <anchorText href="/csapi/watermarking">Watermarking API</anchorText> to see if you are passing a proper value for the watermark message field.',
      },
      {
        code: 'CSW1109',
        description: 'Order file is deleted.',
        action:
          'Your order file has already been deleted. In this case, you should submit a new order or try with a different order.',
      },
    ],
  },
  detection: {
    system: [
      {
        code: 'CSP1000',
        description: 'The system fails for an unknown reason.',
        action: 'Retry the request or contact <linkSupport>customer service</linkSupport> for further assistance.',
      },
      {
        code: 'CSP1001',
        description: 'Invalid input field. Normally, it happens due to missing required fields.',
        action: 'Check the response for detailed information.',
      },
      {
        code: 'CSP1002',
        description: 'Missing one or more request parameters.',
        action: 'Check the response for detailed information.',
      },
      {
        code: 'CSP1003',
        description: 'HTTP message is not readable.  Normally, it happens if the request body is not a JSON object.',
        action: 'Check whether the request body is a JSON object.',
      },
      {
        code: 'CSP1004',
        description: 'Method argument types are mismatched. ',
        action: 'Check whether you are passing a correct value in the request endpoint.',
      },
      {
        code: 'CSP1005',
        description: 'HTTP media type is not supported.',
        action: 'Check whether you are passing a correct media type in your request.',
      },
      {
        code: 'CSP1006',
        description: 'HTTP request method is not supported.',
        action:
          'Make sure you are using a correct POST, PUT, GET, PATCH, DELETE method.',
      },
      {
        code: 'CSP1007',
        description: 'Missing a request header.',
        action: 'Check the <anchorText href="/csapi/detection">Watermark Detection API</anchorText> to see if you missed any required header.',
      },
      {
        code: 'CSP1008',
        description: 'Unauthorized. Normally, it happens because the current account is not authorized to perform the request.',
        action: 'Check to see if the current account has a proper role to perform the request.',
      },
      {
        code: 'CSP1009',
        description: 'Unauthorized. Normally, it happens because the current account is not authorized to perform the request.',
        action:
          'Check to see if the current account has a proper role to perform the request.',
      },
      {
        code: 'CSP1010',
        description: 'Invalid enum value.',
        action: 'Check the <anchorText href="/csapi/detection">Watermark Detection API</anchorText> to see if you are passing a proper value for an enum field.',
      },
    ],
    business: [
      {
        code: 'CSP1100',
        description: 'Entity not found.',
        action: 'Check whether you are passing a correct ID for your request.',
      },
      {
        code: 'CSP1101',
        description: 'Entity invalid status.',
        action: 'Update the status the requested entity.',
      },
      {
        code: 'CSP1106',
        description: 'Invalid JWT token.',
        action: 'Check if you are using a correct token.',
      },
      {
        code: 'CSP1107',
        description: 'JWT token is expired.',
        action: 'Generate a new token.',
      },
      {
        code: 'CSP1108',
        description: 'Missing value for original file key field.',
        action: 'Passing value for document resolution field in your request.',
      },
      {
        code: 'CSP1109',
        description: 'Missing value for original file key field.',
        action: 'Passing value for original file key field in your request.',
      },
    ],
  },
};

export default errorCodesData;
