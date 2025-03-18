const specifications = {
  wmCreateRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-wtr/swagger-ui/index.html#/Orders/create',
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-wtr/ext/v1/orders',
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer {{API_KEY}}',
    },
    body: {
      idempotencyKey: {
        type: 'string',
        note: `The key to uniquely identify this request for <anchorText>Idempotency</anchorText> purpose.`,
        link: '/term-definition#idempotency',
      },
      title: {
        type: 'string',
        note: 'Order Title',
      },
      'files[*]-fileName': {
        type: 'string',
        note: 'Name of the file to watermark.',
      },
      'files[*]-fileType': {
        type: 'string',
        note: `File type to be watermarked. Supported formats:
          <ul>
            <li><code>IMG</code>: JPG, PNG, TIFF, BMP</li>
            <li><code>AUDIO</code>: MP3, WAV</li>
            <li><code>VIDEO</code>: MP4</li>
            <li><code>DOCUMENT</code>: PDF</li>
           </ul>`,
      },
      'files[*]-wtrMsg': {
        type: 'string',
        note: 'Message to watermark. It must be the string representation of an integer in range 1~65535.',
      },
    },
  },
  wmCreateResponse: {
    body: {
      id: {
        type: 'string',
        note: 'Identifier of the order.',
      },
      accountId: {
        type: 'string',
        note: 'Identifier of partner account.',
      },
      idempotencyKey: {
        type: 'string',
        note: `The key to uniquely identify this request for <anchorText>Idempotency</anchorText> purpose.`,
        link: '/term-definition#idempotency',
      },
      status: {
        type: 'string',
        note: `We currently have two valid statuses for an order:
          <ul>
            <li><code>AWAITING_PROCESS</code>: Order waiting for all files to be uploaded and processed.</li>
            <li><code>PROCESSED</code>: Order processed (successful or unsuccessful).</li>
          </ul>`,
      },
      title: {
        type: 'string',
        note: 'Order Title',
      },
      'orderfiles[*]-id': {
        type: 'string',
        note: 'Identifier of the order file resource.',
      },
      'orderfiles[*]-fileName': {
        type: 'string',
        note: 'Name of the order file resource.',
      },
      'orderfiles[*]-uploadUrl': {
        type: 'string',
        note: `URL to upload the file SaForus uses Amazon S3 for scalable and secure storage of partner files, with each partner assigned a dedicated storage location.
          <ul>
            <li>The upload link expires after <strong>30 minutes</strong> by default.</li>
          </ul>`,
      },
      'orderfiles[*]-fileType': {
        type: 'string',
        note: `Type of the file, same as <code>fileType</code> field in the request.`,
      },
      'orderfiles[*]-status': {
        type: 'string',
        note: `Current status of the order file. We are supporting 3 valid values:
          <ul>
            <li><code>AWAITING_PROCESS</code>: Waiting for watermarking</li>
            <li><code>SUCCEEDED</code>: Watermarked successfully with the given <code>wtrMsg</code></li>
            <li><code>FAILED</code>: Watermarked failed</li>
          </ul>`,
      },
      'orderfiles[*]-wtrMsg': {
        type: 'string',
        note: 'Message to watermark.',
      },
      createdAt: {
        type: 'string',
        note: 'Date & time (ISO 8601 at UTC time zone) when the order created.',
      },
      updatedAt: {
        type: 'string',
        note: 'Date & time (ISO 8601 at UTC time zone) when the order last updated.',
      },
      createdBy: {
        type: 'string',
        note: 'Party that created the order (e.g., user, system, operator)',
      },
      updatedBy: {
        type: 'string',
        note: 'Party that last updated the order (e.g., user, system, operator)',
      },
    },
  },
  wmGetRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-wtr/swagger-ui/index.html#/Orders/get',
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-wtr/ext/v1/orders/{{orderId}}',
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer {{API_KEY}}',
    },
    pathVariables: {
      orderId: {
        type: 'string',
        note: 'Identifier of the order.',
      },
    },
  },
  wmGetResponse: {
    body: {
      id: {
        type: 'string',
        note: 'Identifier of the order.',
      },
      accountId: {
        type: 'string',
        note: 'Identifier of the partner account.',
      },
      idempotencyKey: {
        type: 'string',
        note: `The key to uniquely identify this request for <anchorText>Idempotency</anchorText> purpose.`,
        link: '/term-definition#idempotency',
      },
      status: {
        type: 'string',
        note: `We currently have two valid statuses for an order:
          <ul>
            <li><code>AWAITING_PROCESS</code>: Order waiting for all files to be uploaded and processed.</li>
            <li><code>PROCESSED</code>: Order processed (successful or unsuccessful).</li>
          </ul>`,
      },
      title: {
        type: 'string',
        note: 'Order Title',
      },
      'orderfiles[*]-id': {
        type: 'string',
        note: 'Identifier of the order file resource.',
      },
      'orderfiles[*]-fileName': {
        type: 'string',
        note: 'Name of the order file resource.',
      },
      'orderfiles[*]-origDownloadUrl': {
        type: 'string',
        note: `URL to download the original uploaded file. The link works if the file was uploaded successfully only.
          <ul>
            <li>The link expires after <strong>30 minutes</strong> by default.</li>
          </ul>`,
      },
      'orderfiles[*]-wtrDownloadUrl': {
        type: 'string',
        note: `URL to download the watermarked file. The link works if the file was watermarked successfully only.
          <ul>
            <li>The link expires after <strong>30 minutes</strong> by default.</li>
          </ul>`,
      },
      'orderfiles[*]-fileType': {
        type: 'string',
        note: `Type of the file, same as <code>fileType</code> field in the request.`,
      },
      'orderfiles[*]-status': {
        type: 'string',
        note: `Current status of the order file. We are supporting 3 valid values:
          <ul>
            <li><code>AWAITING_PROCESS</code>: Waiting for watermarking</li>
            <li><code>SUCCEEDED</code>: Watermarked successfully with the given <code>wtrMsg</code> </li>
            <li><code>FAILED</code>: Watermarked failed</li>
          </ul>`,
      },
      'orderfiles[*]-wtrMsg': {
        type: 'string',
        note: 'Message to watermark.',
      },
      'orderFiles[*]-origFileFileKey': {
        type: 'string',
        note: `File key used to lookup the original uploaded file.`,
        alert: `This field is required for the piracy detection process to work correctly. Please refer to Section <anchorText>Create Detection Order</anchorText>.`,
        alertLink: '/csapi/detection#create-order-flow',
      },
      createdAt: {
        type: 'string',
        note: 'Date & time (ISO 8601 at UTC time zone) the order created.',
      },
      updatedAt: {
        type: 'string',
        note: 'Date & time (ISO 8601 at UTC time zone) the order updated.',
      },
      createdBy: {
        type: 'string',
        note: 'Party that created the order (e.g., user, system, operator)',
      },
      updatedBy: {
        type: 'string',
        note: 'Party that last updated the order (e.g., user, system, operator)',
      },
    },
  },
  pdCreateRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-pd/swagger-ui/index.html#/Orders/create',
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-pd/ext/v1/orders',
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer {{API_KEY}}',
    },
    body: {
      idempotencyKey: {
        type: 'string',
        note: `The key to uniquely identify this request for <anchorText>Idempotency</anchorText> purpose.`,
        link: '/term-definition#idempotency',
      },
      title: {
        type: 'string',
        note: 'Title of order.',
      },
      'files[*]-fileName': {
        type: 'string',
        note: 'Name of the file to detect watermarked code.',
      },
      'files[*]-fileType': {
        type: 'string',
        note: `Type of the file to detect watermarked code.
        Currently, we support 4 formats:
          <ul>
            <li><code>IMG</code>: JPG, PNG, TIFF, BMP</li>
            <li><code>AUDIO</code>: MP3, WAV</li>
            <li><code>VIDEO</code>: MP4</li>
            <li><code>DOCUMENT</code>: PDF</li>
           </ul>`,
      },
      'files[*]-origFileKey': {
        type: 'string',
        note: '<strong>(Optional)</strong> File key of the original watermarking order. This information could be retrieved from <anchorText>Get Watermarking Order API</anchorText> section.',
        link: '/csapi/watermarking#get-order-flow',
      },
    },
  },
  pdCreateResponse: {
    body: {
      id: {
        type: 'string',
        note: 'Identifier of the order resource.',
      },
      accountId: {
        type: 'string',
        note: 'Identifier of partner account resource.',
      },
      idempotencyKey: {
        type: 'string',
        note: `The key to uniquely identify this request for <anchorText>Idempotency</anchorText> purpose.`,
        link: '/term-definition#idempotency',
      },
      status: {
        type: 'string',
        note: `Current status of the order, includes:
        <ul>
          <li><code>AWAITING_PROCESS</code>: This order is waiting until all files in the order are uploaded & processed. </li>
          <li><code>PROCESSED</code>: All the files in this order have been processed (either successfully or unsuccessfully).</li>
        </ul>`,
      },
      title: {
        type: 'string',
        note: 'Title of this order resource.',
      },
      'orderfiles[*]-id': {
        type: 'string',
        note: 'Identifier of the order file resource.',
      },
      'orderfiles[*]-fileName': {
        type: 'string',
        note: 'Name of the order file resource.',
      },
      'orderfiles[*]-uploadUrl': {
        type: 'string',
        note: `This is the upload URL for watermarking files. 
          <ul>
            <li>The link will expire in <strong>30 minutes</strong> by default.</li>
          </ul>`,
      },
      'orderfiles[*]-fileType': {
        type: 'string',
        note: `The type of the file, same as the`,
      },
      'orderfiles[*]-status': {
        type: 'string',
        note: `Current status of the order file, includes:
          <ul>
            <li><code>AWAITING_PROCESS</code>: Order is waiting for process.</li>
            <li><code>DETECTED</code>: Watermarked code detected successfully.</li>
            <li><code>UNDETECTED</code>: Can not detect watermarked code in the file.
              <ul>
                <li>The file genuinely does not have a watermark.</li>
                <li>The file might have a watermark, but the code was unable to detect it.</li>
              </ul>
            </li>
            <li><code>FAILED</code>: Some issue happens preventing the process from completing.</li>
          </ul>`,
      },
      'orderfiles[*]-origFileKey': {
        type: 'string',
        note: '<strong>(Optional)</strong> File key of the original watermarking order.',
      },
      createdAt: {
        type: 'string',
        note: 'Date & time (ISO 8601 at UTC time zone) when the order created.',
      },
      updatedAt: {
        type: 'string',
        note: 'Date & time (ISO 8601 at UTC time zone) when the order last updated.',
      },
      createdBy: {
        type: 'string',
        note: 'Party that created this order (e.g., user, system, operator)',
      },
      updatedBy: {
        type: 'string',
        note: 'Party that last updated this order (e.g., user, system, operator)',
      },
    },
  },
  pdGetRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-pd/swagger-ui/index.html#/Orders/get',
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-pd/ext/v1/orders/{{orderId}}',
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer {{API_KEY}}',
    },
    pathVariables: {
      orderId: {
        type: 'string',
        note: 'Identifier of the order resource.',
      },
    },
  },
  pdGetResponse: {
    body: {
      id: {
        type: 'string',
        note: 'Identifier of the order resource.',
      },
      accountId: {
        type: 'string',
        note: 'Identifier of partner account resource.',
      },
      idempotencyKey: {
        type: 'string',
        note: `The key to uniquely identify this request for <anchorText>Idempotency</anchorText> purpose.`,
        link: '/term-definition#idempotency',
      },
      status: {
        type: 'string',
        note: `Current status of the, includes:
          <ul>
            <li><code>AWAITING_PROCESS</code>: Waiting until all files in the order are uploaded & processed.</li>
            <li><code>PROCESSED</code>: Order have been processed (either successfully or unsuccessfully).</li>
          </ul>
      `,
      },
      title: {
        type: 'string',
        note: 'Title of this order resource.',
      },
      'orderfiles[*]-id': {
        type: 'string',
        note: 'Identifier of the order file resource.',
      },
      'orderfiles[*]-fileName': {
        type: 'string',
        note: 'Name of the order file resource.',
      },
      'orderfiles[*]-origDownloadUrl': {
        type: 'string',
        note: `URL to download the original uploaded file. The link works if the file was uploaded successfully only.
          <ul>
            <li>The link expires after <strong>30 minutes</strong> by default.</li>
          </ul>`,
      },
      'orderfiles[*]-fileType': {
        type: 'string',
        note: `The type of the file, same as the <code>fileType</code> fields in the request.`,
      },
      'orderfiles[*]-status': {
        type: 'string',
        note: `Current status of the order file, includes:
          <ul>
            <li><code>AWAITING_PROCESS</code>: Order is waiting for process.</li>
            <li><code>DETECTED</code>: Watermarked code detected successfully.</li>
            <li><code>UNDETECTED</code>: Can not detect watermarked code in the file.
              <ul>
                <li>The file genuinely does not have a watermark.</li>
                <li>The file might have a watermark, but the code was unable to detect it.</li>
              </ul>
            </li>
            <li><code>FAILED</code>: Some issue happens preventing the process from completing.</li>
          </ul>`,
      },
      'orderfiles[*]-origFileKey': {
        type: 'string',
        note: '<strong>(Optional)</strong> File key of the original watermarking order.',
      },
      'orderfiles[*]-detectedCode': {
        type: 'string',
        note: 'The watermarked code detected. Should be greater than 0 if detected.',
      },
      createdAt: {
        type: 'string',
        note: 'Date & time (ISO 8601 at UTC time zone) when the order created.',
      },
      updatedAt: {
        type: 'string',
        note: 'Date & time (ISO 8601 at UTC time zone) when the order last updated.',
      },
      createdBy: {
        type: 'string',
        note: 'Party that created this order (e.g., user, system, operator)',
      },
      updatedBy: {
        type: 'string',
        note: 'Party that last updated this order (e.g., user, system, operator)',
      },
    },
  },
  webhookCreateRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-auth/swagger-ui/index.html#/Accounts/updateWebhookEndpoint',
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/webhook-endpoints',
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer {{ACCESS_TOKEN}}',
    },
    body: {
      url: {
        type: 'string',
        note: 'The webhook URL where SaForus can send notifications about events in the system.',
      },
    },
  },
  webhookCreateResponse: {
    body: {
      webhookSecret: {
        type: 'string',
        note: 'The endpoint’s secret, used to generate webhook signatures.',
      },
    },
  },
  shareFileRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-wtr/swagger-ui/index.html#/Orders/shareOrderRequest',
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-wtr/ext/v1/orders/{{orderId}}/share',
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer {{API_KEY}}',
    },
    pathVariables: {
      orderId: {
        type: 'string',
        note: 'Identifier of the order resource',
      },
    },
    body: {
      email: {
        type: 'string',
        note: 'Email address to share the watermarked file',
      },
    },
  },
  noResponse: {},
  loginRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-auth/swagger-ui/index.html#/Accounts/login',
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/accounts/login',
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    },
    body: {
      email: {
        type: 'string',
        note: 'Email you registered with SaForus CS to receive the credentials.',
      },
      password: {
        type: 'string',
        note: `This is password used to login to SaForus CS API system. Initially, it is generated randomly and sent to the email above.

          Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number.`,
      },
    },
  },
  loginResponse: {
    body: {
      token: {
        type: 'string',
        note: 'The access token used to call other SaForus CS APIs.',
      },
    },
  },
  changePasswordRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-auth/swagger-ui/index.html#/Accounts/changePassword',
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/accounts/change-password',
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer {{ACCESS_TOKEN}}',
    },
    body: {
      oldPassword: {
        type: 'string',
        note: 'Old password.',
      },
      newPassword: {
        type: 'string',
        note: `New password.

          Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter & 1 number.`,
      },
    },
  },
  triggerPasswordResetRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-auth/swagger-ui/index.html#/Accounts/triggerPasswordReset',
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/accounts/trigger-password-reset',
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    },
    body: {
      email: {
        type: 'string',
        note: 'Email you registered with SaForus CS',
      },
    },
  },
  resetPasswordRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-auth/swagger-ui/index.html#/Accounts/resetPassword',
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/accounts/reset-password',
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer {{PASSWORD_RESET_TOKEN}}',
    },
    body: {
      newPassword: {
        type: 'string',
        note: `New password.

          Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter & 1 number.`,
      },
    },
  },
  createApiKeyRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-auth/swagger-ui/index.html#/API%20Keys/create',
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/api-keys',
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer {{ACCESS_TOKEN}}',
    },
    body: {
      name: {
        type: 'string',
        note: 'Name of the API key',
      },
      note: {
        type: 'string',
        note: '<strong>(Optional)</strong> API key description',
      },
      expiredAt: {
        type: 'string',
        note: 'Expiration date and time of the API key (in ISO 8601 format, UTC time zone)',
      },
    },
  },
  createApiKeyResponse: {
    body: {
      id: {
        type: 'string',
        note: 'Identifier for the API key',
      },
      accountId: {
        type: 'string',
        note: 'Identifier of the account to which the API key belongs',
      },
      name: {
        type: 'string',
        note: 'Name of the API key',
      },
      status: {
        type: 'string',
        note: `The current valid statuses of the API key:
          <ul>
            <li><code>ACTIVE</code>: The API key is available for use</li>
            <li><code>INACTIVE</code>: The API key is unavailable for use</li>
          </ul>`,
      },
      token: {
        type: 'string',
        note: 'A random unique string that describes the API key. This value must be used as the Bearer token in the <code>Authorization</code> request header when calling watermarking and detection APIs.',
      },
      note: {
        type: 'string',
        note: 'API key description',
      },
      expiredAt: {
        type: 'string',
        note: 'Expiration date and time of the API key (in ISO 8601 format, UTC time zone)',
      },
      createdAt: {
        type: 'string',
        note: 'Creation date and time of the API key (in ISO 8601 format, UTC time zone)',
      },
      updatedAt: {
        type: 'string',
        note: 'Last updated date and time of the API key (in ISO 8601 format, UTC time zone)',
      },
    },
  },
  getApiKeysRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-auth/swagger-ui/index.html#/API%20Keys/search',
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/api-keys',
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer {{ACCESS_TOKEN}}',
    },
    parameters: {
      page: {
        type: 'integer',
        note: 'Page number to query.',
      },
      pageSize: {
        type: 'integer',
        note: 'Number of elements per page.',
      },
    },
  },
  getApiKeysResponse: {
    body: {
      'records[*]-id': {
        type: 'string',
        note: 'Identifier for the API key',
      },
      'records[*]-accountId': {
        type: 'string',
        note: 'Identifier of the account to which the API key belongs',
      },
      'records[*]-name': {
        type: 'string',
        note: 'Name of the API key',
      },
      'records[*]-status': {
        type: 'string',
        note: `The current valid statuses of the API key:
          <ul>
            <li><code>ACTIVE</code>: The API key is available for use</li>
            <li><code>INACTIVE</code>: The API key is unavailable for use</li>
          </ul>`,
      },
      'records[*]-token': {
        type: 'string',
        note: 'A random unique string that describes the API key. This value must be used as the Bearer token in the <code>Authorization</code> request header when calling watermarking and detection APIs.',
      },
      'records[*]-note': {
        type: 'string',
        note: 'API key description',
      },
      'records[*]-expiredAt': {
        type: 'string',
        note: 'Expiration date and time of the API key (in ISO 8601 format, UTC time zone)',
      },
      'records[*]-lastUsedAt': {
        type: 'string',
        note: 'Last used date and time of the API key (in ISO 8601 format, UTC time zone)',
      },
      'records[*]-createdAt': {
        type: 'string',
        note: 'Creation date and time of the API key (in ISO 8601 format, UTC time zone)',
      },
      'records[*]-updatedAt': {
        type: 'string',
        note: 'Last updated date and time of the API key (in ISO 8601 format, UTC time zone)',
      },
      page: {
        type: 'integer',
        note: 'Page number',
      },
      pageSize: {
        type: 'integer',
        note: 'Number of elements per page.',
      },
      total: {
        type: 'integer',
        note: 'Total number of elements.',
      },
    },
  },
  updateApiKeyRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-auth/swagger-ui/index.html#/API%20Keys/update',
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/api-keys/{{apiKeyId}}',
    method: 'PATCH',
    header: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer {{ACCESS_TOKEN}}',
    },
    pathVariables: {
      apiKeyId: {
        type: 'string',
        note: 'Identifier of the API key to update.',
      },
    },
    body: {
      name: {
        type: 'string',
        note: 'New value of the API key name.',
      },
      status: {
        type: 'string',
        note: `The current valid statuses of the API key:
          <ul>
            <li><code>ACTIVE</code>: The API key is available for use</li>
            <li><code>INACTIVE</code>: : The API key is unavailable for use</li>
          </ul>`,
      },
      note: {
        type: 'string',
        note: '<strong>(Optional)</strong> New description of the API key ',
      },
      expiredAt: {
        type: 'string',
        note: 'Expiration date and time of the API key (in ISO 8601 format, UTC time zone)',
      },
    },
  },
  deleteApiKeyRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-auth/swagger-ui/index.html#/API%20Keys/delete',
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-auth/ext/v1/api-keys/{{apiKeyId}}',
    method: 'DELETE',
    header: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer {{ACCESS_TOKEN}}',
    },
    pathVariables: {
      apiKeyId: {
        type: 'string',
        note: 'Identifier of the API key to delete.',
      },
    },
  },
  deleteWatermarkFilesRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-wtr/swagger-ui/index.html#/Orders/deleteOrderFiles', // Adjust this URL as needed
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-wtr/ext/v1/orders/{{orderId}}/order-files',
    method: 'DELETE',
    header: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer {{API_KEY}}',
    },
    pathVariables: {
      orderId: {
        type: 'string',
        note: 'Identifier of the order resource',
      },
    },
  },
  deletePiracyFilesRequest: {
    'swagger-url':
      'https://stag-cs.saforus.com/api/saforus-cs-api-pd/swagger-ui/index.html#/Orders/deleteOrderFiles', // Update this Swagger URL if needed
    url: 'https://{{API_DOMAIN}}/api/saforus-cs-api-pd/ext/v1/orders/{{orderId}}/order-files',
    method: 'DELETE',
    header: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer {{API_KEY}}',
    },
    pathVariables: {
      orderId: {
        type: 'string',
        note: 'Identifier of the order resource',
      },
    },
  },
};

export default specifications;
