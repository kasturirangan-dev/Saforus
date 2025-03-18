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
        note: `<anchorText>멱등성</anchorText> 목적을 위해 고유하게 식별하는 키`,
        link: '/term-definition#idempotency',
      },
      title: {
        type: 'string',
        note: '주문 제목',
      },
      'files[*]-fileName': {
        type: 'string',
        note: '워터마킹할 파일의 이름',
      },
      'files[*]-fileType': {
        type: 'string',
        note: `워터마킹할 파일의 형식. 현재 지원하는 형식:
          <ul>
            <li><code>IMG</code>: JPG, PNG, TIFF, BMP</li>
            <li><code>AUDIO</code>: MP3, WAV</li>
            <li><code>VIDEO</code>: MP4</li>
            <li><code>DOCUMENT</code>: PDF</li>
           </ul>`,
      },
      'files[*]-wtrMsg': {
        type: 'string',
        note: '워터마킹할 메시지. 1에서 65535 사이의 정수로 문자열 형태여야 함',
      },
    },
  },
  wmCreateResponse: {
    body: {
      id: {
        type: 'string',
        note: '주문 리소스의 식별자',
      },
      accountId: {
        type: 'string',
        note: '파트너 계정 리소스의 식별자',
      },
      idempotencyKey: {
        type: 'string',
        note: `<anchorText>멱등성</anchorText> 목적을 위해 고유하게 식별하는 키`,
        link: '/term-definition#idempotency',
      },
      status: {
        type: 'string',
        note: `주문의 현재 상태. 현재 유효한 값은:
          <ul>
            <li><code>AWAITING_PROCESS</code>: 파일이 업로드 및 처리될 때까지 대기 중</li>
            <li><code>PROCESSED</code>: 모든 파일이 처리되었음 (성공이나 실패)</li>
          </ul>`,
      },
      title: {
        type: 'string',
        note: '주문 리소스의 제목',
      },
      'orderfiles[*]-id': {
        type: 'string',
        note: '주문 파일 리소스의 식별자',
      },
      'orderfiles[*]-fileName': {
        type: 'string',
        note: '주문 파일 리소스의 이름',
      },
      'orderfiles[*]-uploadUrl': {
        type: 'string',
        note: `워터마킹을 위한 파일 업로드 URL입니다. 
          Amazon S3를 사용하여 확장성과 성능을 제공합니다. 
          <ul>
            <li>기본 만료 시간: <strong>30분</strong></li>
          </ul>`,
      },
      'orderfiles[*]-fileType': {
        type: 'string',
        note: `파일의 형식으로, 요청의 <code>fileType</code> 필드와 동일`,
      },
      'orderfiles[*]-status': {
        type: 'string',
        note: `주문 파일의 현재 상태. 유효한 값:
          <ul>
            <li><code>AWAITING_PROCESS</code>: 워터마킹 대기 중 </li>
            <li><code>SUCCEEDED</code>: 받은 <code>wtrMsg</code> 로 성공적으로 워터마킹 완료</li>
            <li><code>FAILED</code>: 워터마킹에 실패</li>
          </ul>`,
      },
      'orderfiles[*]-wtrMsg': {
        type: 'string',
        note: '워터마킹할 메시지',
      },
      createdAt: {
        type: 'string',
        note: '주문이 생성된 날짜 및 시간 (ISO 8601, UTC)',
      },
      updatedAt: {
        type: 'string',
        note: '주문이 최신 업데이트된 날짜 및 시간 (ISO 8601, UTC)',
      },
      createdBy: {
        type: 'string',
        note: '주문을 생성한 주체 (예: 사용자, 시스템, 운영자 등)',
      },
      updatedBy: {
        type: 'string',
        note: '최신 업데이트한 주체 (예: 사용자, 시스템, 운영자 등)',
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
        note: '주문 리소스의 식별자',
      },
    },
  },
  wmGetResponse: {
    body: {
      id: {
        type: 'string',
        note: '주문 리소스의 식별자',
      },
      accountId: {
        type: 'string',
        note: '파트너 계정 리소스의 식별자',
      },
      idempotencyKey: {
        type: 'string',
        note: `<anchorText>멱등성</anchorText> 목적을 위해 고유하게 식별하는 키`,
        link: '/term-definition#idempotency',
      },
      status: {
        type: 'string',
        note: `주문의 현재 상태. 현재 유효한 값은:
          <ul>
            <li><code>AWAITING_PROCESS</code>: 파일이 업로드 및 처리될 때까지 대기 중</li>
            <li><code>PROCESSED</code>: 모든 파일이 처리되었음 (성공이나 실패)</li>
          </ul>`,
      },
      title: {
        type: 'string',
        note: '주문 리소스의 제목',
      },
      'orderfiles[*]-id': {
        type: 'string',
        note: '주문 파일 리소스의 식별자',
      },
      'orderfiles[*]-fileName': {
        type: 'string',
        note: '주문 파일 리소스의 이름',
      },
      'orderfiles[*]-origDownloadUrl': {
        type: 'string',
        note: `업로드된 원본 파일을 다운로드할 수 있는 URL입니다. 파일이 성공적으로 업로드된 경우에만 작동합니다.
          <ul>
            <li>기본 만료 시간: <strong>30분</strong></li>
          </ul>`,
      },
      'orderfiles[*]-wtrDownloadUrl': {
        type: 'string',
        note: `워터마킹된 파일을 다운로드할 수 있는 URL입니다. 파일이 성공적으로 워터마킹된 경우에만 작동합니다.
          <ul>
            <li>기본 만료 시간: <strong>30분</strong> </li>
          </ul>`,
      },
      'orderfiles[*]-fileType': {
        type: 'string',
        note: `파일의 형식으로, 요청의 <code>fileType</code> 필드와 동일`,
      },
      'orderfiles[*]-status': {
        type: 'string',
        note: `주문 파일의 현재 상태. 유효한 값:
          <ul>
            <li><code>AWAITING_PROCESS</code>: 워터마킹 대기 중 </li>
            <li><code>SUCCEEDED</code>: 받은 <code>wtrMsg</code> 로 성공적으로 워터마킹 완료</li>
            <li><code>FAILED</code>: 워터마킹에 실패</li>
          </ul>`,
      },
      'orderfiles[*]-wtrMsg': {
        type: 'string',
        note: '워터마킹할 메시지',
      },
      'orderFiles[*]-origFileFileKey': {
        type: 'string',
        note: `업로드된 원본 파일을 조회하는 데 사용되는 파일 키.`,
        alert: `이 필드는 검출 프로세스가 올바르게 작동하도록 입력으로 사용됩니다. 자세한 내용은 <anchorText>워터마크 검출 주문 생성 API</anchorText>를 참조하세요.`,
        alertLink: '/csapi/detection#create-order-flow',
      },
      createdAt: {
        type: 'string',
        note: '주문이 생성된 날짜 및 시간 (ISO 8601, UTC)',
      },
      updatedAt: {
        type: 'string',
        note: '주문이 최신 업데이트된 날짜 및 시간 (ISO 8601, UTC)',
      },
      createdBy: {
        type: 'string',
        note: '주문을 생성한 주체 (예: 사용자, 시스템, 운영자 등)',
      },
      updatedBy: {
        type: 'string',
        note: '최신 업데이트한 주체 (예: 사용자, 시스템, 운영자 등)',
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
        note: `<anchorText>멱등성</anchorText> 목적을 위해 고유하게 식별하는 키`,
        link: '/term-definition#idempotency',
      },
      title: {
        type: 'string',
        note: '주문의 제목',
      },
      'files[*]-fileName': {
        type: 'string',
        note: '워터마크 코드 검출을 위한 파일의 이름',
      },
      'files[*]-fileType': {
        type: 'string',
        note: `워터마크 검출할 파일의 형식. 현재 지원하는 형식:
          <ul>
            <li><code>IMG</code>: JPG, PNG, TIFF, BMP</li>
            <li><code>AUDIO</code>: MP3, WAV</li>
            <li><code>VIDEO</code>: MP4</li>
            <li><code>DOCUMENT</code>: PDF</li>
           </ul>`,
      },
      'files[*]-origFileKey': {
        type: 'string',
        note: '<strong>(선택 사항)</strong> 워터마킹 주문에서 원본 파일 키이며 상세 정보는 <anchorText>워터마킹 주문 조회 API</anchorText> 에서 확인할 수 있습니다.',
        link: '/csapi/watermarking#get-order-flow',
      },
    },
  },
  pdCreateResponse: {
    body: {
      id: {
        type: 'string',
        note: '주문 리소스의 식별자',
      },
      accountId: {
        type: 'string',
        note: '파트너 계정 리소스의 식별자',
      },
      idempotencyKey: {
        type: 'string',
        note: `<anchorText>멱등성</anchorText> 목적을 위해 고유하게 식별하는 키`,
        link: '/term-definition#idempotency',
      },
      status: {
        type: 'string',
        note: `주문의 현재 상태입니다. 현재 유효한 값:
        <ul>
          <li><code>AWAITING_PROCESS</code>: 파일이 업로드 및 처리될 때까지 대기 중 </li>
          <li><code>PROCESSED</code>: 모든 파일이 처리 완료 (성공이나 실패)</li>
        </ul>`,
      },
      title: {
        type: 'string',
        note: '주문 리소스의 제목',
      },
      'orderfiles[*]-id': {
        type: 'string',
        note: '주문 파일 리소스의 식별자.',
      },
      'orderfiles[*]-fileName': {
        type: 'string',
        note: '주문 파일 리소스의 이름',
      },
      'orderfiles[*]-uploadUrl': {
        type: 'string',
        note: `워터마킹을 위한 파일 업로드 URL입니다. 
          Amazon S3를 사용하여 확장성과 성능을 제공합니다. 
          <ul>
            <li>기본 만료 시간: <strong>30분</strong></li>
          </ul>`,
      },
      'orderfiles[*]-fileType': {
        type: 'string',
        note: `파일의 형식으로, 요청의 <code>fileType</code> 필드와 동일`,
      },
      'orderfiles[*]-status': {
        type: 'string',
        note: `주문 파일의 현재 상태입니다. 현재 유효한 값:
          <ul>
            <li><code>AWAITING_PROCESS</code>: 처리 대기 중</li>
            <li><code>DETECTED</code>: 워터마크 코드가 성공적으로 검출됨</li>
            <li><code>UNDETECTED</code>: 워터마크 코드를 검출 불가
              <ul>
                <li>파일에 실제로 워터마크가 없음</li>
                <li>파일에 워터마크 있을 수 있지만, 코드가 이를 검출하지 못했음</li>
              </ul>
            </li>
            <li><code>FAILED</code>: 문제로 인해 실패했음</li>
          </ul>`,
      },
      'orderfiles[*]-origFileKey': {
        type: 'string',
        note: '<strong>(선택 사항)</strong> 워터마킹 주문에서 원본 파일 키',
      },
      createdAt: {
        type: 'string',
        note: '주문이 생성된 날짜 및 시간 (ISO 8601, UTC)',
      },
      updatedAt: {
        type: 'string',
        note: '주문이 최신 업데이트된 날짜 및 시간 (ISO 8601, UTC)',
      },
      createdBy: {
        type: 'string',
        note: '주문을 생성한 주체 (예: 사용자, 시스템, 운영자 등)',
      },
      updatedBy: {
        type: 'string',
        note: '주문을 최신 업데이트한 주체 (예: 사용자, 시스템, 운영자 등)',
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
        note: '주문 리소스의 식별자',
      },
    },
  },
  pdGetResponse: {
    body: {
      id: {
        type: 'string',
        note: '주문 리소스의 식별자',
      },
      accountId: {
        type: 'string',
        note: '파트너 계정 리소스의 식별자',
      },
      idempotencyKey: {
        type: 'string',
        note: `<anchorText>멱등성</anchorText> 목적을 위해 고유하게 식별하는 키`,
        link: '/term-definition#idempotency',
      },
      status: {
        type: 'string',
        note: `주문의 현재 상태는 다음 중 하나일 수 있습니다:
          <ul>
            <li><code>AWAITING_PROCESS</code>: 파일이 업로드 및 처리될 때까지 대기 중</li>
            <li><code>PROCESSED</code>: 모든 파일이 처리되었음 (성공이나 실패)</li>
          </ul>
      `,
      },
      title: {
        type: 'string',
        note: '주문 리소스의 제목',
      },
      'orderfiles[*]-id': {
        type: 'string',
        note: '주문 파일 리소스의 식별자',
      },
      'orderfiles[*]-fileName': {
        type: 'string',
        note: '주문 파일 리소스의 이름',
      },
      'orderfiles[*]-origDownloadUrl': {
        type: 'string',
        note: `업로드된 원본 파일을 다운로드할 수 있는 URL입니다. 파일이 성공적으로 업로드된 경우에만 작동합니다. 
          <ul>
            <li>기본 만료 시간: <strong>30분</strong></li>
          </ul>`,
      },
      'orderfiles[*]-fileType': {
        type: 'string',
        note: `파일의 형식으로, 요청의 <code>fileType</code> 필드와 동일`,
      },
      'orderfiles[*]-status': {
        type: 'string',
        note: `주문 파일의 현재 상태입니다. 현재 유효한 값:
          <ul>
            <li><code>AWAITING_PROCESS</code>: 처리 대기 중</li>
            <li><code>DETECTED</code>: 워터마크 코드가 성공적으로 검출됨</li>
            <li><code>UNDETECTED</code>: 워터마크 코드를 검출 불가
              <ul>
                <li>파일에 실제로 워터마크가 없음</li>
                <li>파일에 워터마크 있을 수 있지만, 코드가 이를 검출하지 못했음</li>
              </ul>
            </li>
            <li><code>FAILED</code>: 문제로 인해 실패했음</li>
          </ul>`,
      },
      'orderfiles[*]-origFileKey': {
        type: 'string',
        note: '<strong>(선택 사항)</strong> 워터마킹 주문에서 원본 파일 키',
      },
      'orderfiles[*]-detectedCode': {
        type: 'string',
        note: '검출된 워터마크 코드입니다. 검출된 경우 0보다 커야 함',
      },
      createdAt: {
        type: 'string',
        note: '주문이 생성된 날짜 및 시간 (ISO 8601, UTC)',
      },
      updatedAt: {
        type: 'string',
        note: '주문이 최신 업데이트된 날짜 및 시간 (ISO 8601, UTC)',
      },
      createdBy: {
        type: 'string',
        note: '주문을 생성한 주체 (예: 사용자, 시스템, 운영자 등)',
      },
      updatedBy: {
        type: 'string',
        note: '주문을 최신 업데이트한 주체 (예: 사용자, 시스템, 운영자 등)',
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
        note: 'SaForus CS API가 시스템 내 이벤트에 대해 알림을 보낼 웹훅 URL.',
      },
    },
  },
  webhookCreateResponse: {
    body: {
      webhookSecret: {
        type: 'string',
        note: '엔드포인트 비밀 키는 웹훅 서명을 생성하는 데 사용됨.',
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
        note: '주문 리소스의 식별자',
      },
    },
    body: {
      email: {
        type: 'string',
        note: '워터마크 된 파일을 공유할 이메일 주소',
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
        note: '자격 증명을 받기 위해 SaForus에 등록된 고객사의 이메일 주소입니다.',
      },
      password: {
        type: 'string',
        note: `로그인에 사용되는 비밀번호는 최초에 임의로 생성되어 등록된 파트너 이메일로 발송됩니다.

          비밀번호는 8자 이상이며 대문자, 소문자, 숫자를 각각 포함해야 합니다.`,
      },
    },
  },
  loginResponse: {
    body: {
      token: {
        type: 'string',
        note: '다른 SaForus API를 호출하기 위한 엑세스 토큰입니다.',
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
        note: '이전 비밀번호입니다.',
      },
      newPassword: {
        type: 'string',
        note: `새로운 비밀번호입니다.

          비밀번호는 8자 이상이며 대문자, 소문자, 숫자를 각각 포함해야 합니다.`,
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
        note: '비밀번호 재설정을 위한 계정에 연결된 이메일 주소를 입력하세요.',
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
        note: `설정하려는 새 비밀번호를 입력하세요.

          비밀번호는 8자 이상이며 대문자, 소문자, 숫자를 각각 포함해야 합니다.`,
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
        note: 'API 키의 이름',
      },
      note: {
        type: 'string',
        note: '<strong>(선택 사항)</strong> API 키에 대한 설명',
      },
      expiredAt: {
        type: 'string',
        note: 'API 키가 만료될 날짜 및 시간(UTC 시간대의 ISO 8601 형식)',
      },
    },
  },
  createApiKeyResponse: {
    body: {
      id: {
        type: 'string',
        note: 'API 키 식별자',
      },
      accountId: {
        type: 'string',
        note: 'API 키가 속한 계정의 식별자',
      },
      name: {
        type: 'string',
        note: 'API 키의 이름',
      },
      status: {
        type: 'string',
        note: `API 키의 현재 상태. 현재 유효한 값은 두 가지입니다:
          <ul>
            <li><code>ACTIVE</code>: API 키 사용 가능</li>
            <li><code>INACTIVE</code>: API 키 사용 불가</li>
          </ul>`,
      },
      token: {
        type: 'string',
        note: 'API 키를 설명하는 임의의 고유 문자열. 이 값을 <code>인증</code> 요청 헤더의 Bearer 토큰으로 사용하여 워터마크 적용 및 검출 API를 호출해야 합니다.',
      },
      note: {
        type: 'string',
        note: 'API 키에 대한 설명',
      },
      expiredAt: {
        type: 'string',
        note: 'API 키가 만료될 날짜 및 시간(UTC 시간대의 ISO 8601 형식)',
      },
      createdAt: {
        type: 'string',
        note: 'API 키가 생성된 날짜 및 시간(UTC 시간대의 ISO 8601 형식)',
      },
      updatedAt: {
        type: 'string',
        note: 'API 키가 마지막으로 업데이트된 날짜 및 시간 (UTC 시간대의 ISO 8601 형식)',
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
        note: '조회할 페이지 번호',
      },
      pageSize: {
        type: 'integer',
        note: '페이지당 요소 수',
      },
    },
  },
  getApiKeysResponse: {
    body: {
      'records[*]-id': {
        type: 'string',
        note: 'API 키 식별자',
      },
      'records[*]-accountId': {
        type: 'string',
        note: 'API 키가 속한 계정의 식별자',
      },
      'records[*]-name': {
        type: 'string',
        note: 'API 키의 이름',
      },
      'records[*]-status': {
        type: 'string',
        note: `API 키의 현재 상태. 현재 유효한 값은 두 가지입니다:
          <ul>
            <li><code>ACTIVE</code>: API 키 사용 가능</li>
            <li><code>INACTIVE</code>: API 키 사용 불가</li>
          </ul>`,
      },
      'records[*]-token': {
        type: 'string',
        note: 'API 키를 설명하는 임의의 고유 문자열. 이 값을 인증 요청 헤더의 Bearer 토큰으로 사용하여 워터마크 적용 및 검출 API를 호출 해야 합니다.',
      },
      'records[*]-note': {
        type: 'string',
        note: 'API 키에 대한 설명',
      },
      'records[*]-expiredAt': {
        type: 'string',
        note: 'API 키가 만료될 날짜 및 시간(UTC 시간대의 ISO 8601 형식)',
      },
      'records[*]-lastUsedAt': {
        type: 'string',
        note: 'API 키가 마지막으로 사용된 날짜 및 시간(UTC 시간대의 ISO 8601 형식)',
      },
      'records[*]-createdAt': {
        type: 'string',
        note: 'API 키가 생성된 날짜 및 시간(UTC 시간대의 ISO 8601 형식)',
      },
      'records[*]-updatedAt': {
        type: 'string',
        note: 'API 키가 마지막으로 업데이트된 날짜 및 시간 (UTC 시간대의 ISO 8601 형식)',
      },
      page: {
        type: 'integer',
        note: '페이지 번호',
      },
      pageSize: {
        type: 'integer',
        note: '페이지당 요소 수',
      },
      total: {
        type: 'integer',
        note: '총 요소 수',
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
        note: '업데이트할 API 키의 식별자',
      },
    },
    body: {
      name: {
        type: 'string',
        note: 'API 키 이름의 새 값',
      },
      status: {
        type: 'string',
        note: `API 키 상태의 새 값. 현재 유효한 값은 두 가지입니다:
          <ul>
            <li><code>ACTIVE</code>: API 키를 사용할 수 있습니다.</li>
            <li><code>INACTIVE</code>: : API 키를 사용할 수 없습니다.</li>
          </ul>`,
      },
      note: {
        type: 'string',
        note: '<strong>(선택 사항)</strong> API 키에 대한 새로운 설명',
      },
      expiredAt: {
        type: 'string',
        note: 'API 키가 만료될 새 날짜 및 시간 값 (UTC 시간대의 ISO 8601 형식)',
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
        note: '삭제할 API 키의 식별자',
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
        note: '주문 리소스의 식별자.',
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
        note: '주문 리소스의 식별자.',
      },
    },
  },
};

export default specifications;
