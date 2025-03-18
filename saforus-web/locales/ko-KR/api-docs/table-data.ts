const tableData = {
  apiResponses: [
    {
      type: 'failure',
      code: 'CSW1000',
      description:
        '오류 코드 <code>000</code> 으로 워터마크 API에 대한 요청이 실패했습니다.',
      example: `{
  "code": "CSW1001",
  "msg": "ERROR_UNKNOWN"
}`,
    },
    {
      id: 'CSA0001',
      type: 'failure',
      code: 'CSW1100',
      description:
        '오류 코드 <code>100</code> 으로 불법 복제 탐지 API에 대한 요청이 실패했습니다.',
      example: `{
  "code": "CSP1100",
  "msg": "ENTITY_NOT_FOUND"
}`,
    },
    {
      type: 'failure',
      code: 'CSW1001',
      description: `오류 코드 <code>001</code> (유효하지 않은 입력값) 로 인증 API에 대한 요청이 실패했습니다.

        응답에는 오류 필드 목록과 해당 오류의 이유가 포함됩니다.`,
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
      description:
        '인증 API에 대한 요청이 성공하고 API가 엔티티 필드를 반환합니다.',
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
        '인증 API에 대한 요청이 성공하여 클라이언트는 A 경로로 계속되어야 합니다.',
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
        '인증 API에 대한 요청이 성공하여 클라이언트는 B 경로로 계속되어야 합니다.',
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
      case: '빈 데이터',
      type: 'NULL',
      normal: `{
  "code": "some code",
  "msg": "some msg",
  "data": {
    "accountId": "some account id",
    <gray>"accountName": null</gray>
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
      case: '빈 배열',
      type: '[]',
      normal: `{ 
 "code": "some code",
 "msg": "some msg",
 "data": {
  "accountId": "some account id",
  <gray>"orders": [] // 삭제됨 </gray>
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
      case: '빈 객체',
      type: '{}',
      normal: `{
  "code": "some code",
  "msg": "some msg",
  "data": {
    "accountId": "some account id",
    <gray>"moreInfo": {}</gray>
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
      description: `로그인 API를 호출하여 액세스 토큰을 생성할 수 있습다. 

      API에 대한 자세한 내용은 <anchorText>로그인</anchorText> 섹션을 참조하세요.`,
      note: '생성된 액세스 토큰은 기본적으로 <strong>2시간</strong> 동안 유효합니다.',
      link: '/csapi/authentication#login',
    },
    {
      step: 'changePassword(accessToken, oldPassword, new Password)',
      description: `API를 호출하여 비밀번호를 변경할 수 있습니다.
      
        API에 대한 상세 내용은 <anchorText>비밀번호 변경</anchorText> 섹션을 참조하세요.`,
      note: ' ',
      link: '/csapi/authentication#change-password',
    },
    {
      step: 'createWebhookEndpoint(accessToken, url)',
      description: `API를 호출하여 웹훅 엔드포인트를 생성할 수 있습니다.

        API에 대한 상세 내용은 <anchorText>웹훅 등록하기</anchorText> 섹션을 참조하세요.`,
      note: ' ',
      link: '/webhook-api',
    },
    {
      step: `createApiKey(accessToken, apiKeyInfo)
      getAllApiKeys(accessToken)
      updateApiKey(accessToken, apiKey)
      deleteApiKey(accessToken, apiKey)`,
      description: `CRUD APIs를 호출하여 API 키를 관리할 수 있습니다.

        API에 대한 상세 내용은 <anchorText>API 키 관리</anchorText> 섹션을 참조하세요.`,
      note: `API 호출 또는 대시보드 콘솔을 통해 API 키를 관리할 수 있습니다.

      워터마크 적용 및 워터마크 검출 API를 호출 시 <strong>API 키</strong>를 사용해야 합니다.`,
      link: '/csapi/api-keys',
    },
  ],
  passwordReset: [
    {
      step: 'triggerPasswordReset(email)',
      description: `API를 호출하여 비밀번호 초기화 흐름을 시작할 수 있습니다.

    API에 대한 상세 내용은 <anchorText>비밀번호 초기화 트리거</anchorText> 섹션을 참조하세요.`,
      note: `생성된 비밀번호 초기화 토큰은 기본적으로 <strong>10분</strong> 동안 유효합니다.`,
      link: '/csapi/authentication#trigger-password-reset',
    },
    {
      step: 'resetPassword(new Password)',
      description: `API를 호출하여 비밀번호를 변경할 수 있습니다. 

        API에 대한 상세 내용은 <anchorText>비밀번호 초기화</anchorText> 섹션을 참조하세요.`,
      note: ' ',
      link: '/csapi/authentication#reset-password',
    },
  ],
  shareFile: [
    {
      step: 'shareFiles(orderId)',
      description: `API를 호출하여 주문에 속하는 모든 워터마크된 파일을 공유할 수 있습니다.`,
      note: ' ',
    },
    {
      step: 'download(sharingWatermarkFileEmail.watermarkFiles)',
      description:
        'Amazon S3 API를 호출하여 S3 스토리지에서 워터마크된 파일을 다운로드합니다.',
      note: `<ul>
            <li>링크는 주문 파일이 아직 삭제되지 않은 경우에만 작동합니다.</li>
            <li>링크의 기본 만료 시간은 <strong>7일</strong>입니다.</li>
            <li>신뢰성과 성능을 위해 AWS S3 SDK 사용을 권장합니다.</li>
          </ul>`,
      keyExample: 'codeExamples.wmDownloadWtr',
    },
  ],
  wmCreate: [
    {
      step: 'create(order)',
      description: `API를 호출하여 워터마킹 주문을 생성할 수 있습니다.`,
      note: `주문에 포함할 수 있는 파일 수는 <strong>최대 10개</strong>로 제한됩니다.`,
    },
    {
      step: 'upload(file, orderFile.uploadUrl)',
      description: `Amazon S3 API를 호출하여 S3 스토리지에 파일을 업로드합니다.`,
      note: `<code>x-amz-meta-markany-file-type</code>: <strong>1</strong>단계 <strong>요청</strong> 바디의 <code>files</code> 필드 내 <code>fileType</code>필드와 동일한 값을 가져야 합니다.

        <code>x-amz-meta-markany-wtr-msg</code>: 1단계 <strong>요청</strong> 바디의 <code>files</code> 필드 내 <code>wtrMsg</code> 필드와 동일한 값을 가져야 합니다.
      
        <code>x-amz-meta-markany-file-id</code>: 7단계 <strong>응답</strong> 바디의 <code>orderFiles</code> 필드 내 <code>id</code> 필드와 동일한 값을 가져야 합니다.
      
        <ul>
          <li>링크의 기본 만료 시간은 <strong>30분</strong>입니다.</li>
          <li>신뢰성과 성능을 위해 AWS S3 SDK 사용을 권장합니다.</li>
        </ul>`,
      keyExample: 'codeExamples.wmUpload',
    },
    {
      step: 'notify(orderProcessedEvent)',
      description: `주문 처리 결과를 알리기 위해 파트너 웹훅을 호출합니다. 
        자세한 내용은 <anchorText>웹훅 등록하기</anchorText> 섹션을 참조하세요.`,
      note: ' ',
      link: '/webhook-api',
    },
  ],
  wmGetOrder: [
    {
      step: 'getOrder(orderQuery)',
      description: `API를 호출하여 워터마킹 주문에 대한 정보를 조회할 수 있습니다.`,
      note: ' ',
    },
    {
      step: 'download(orderFile.origDownloadUrl)',
      description: `Amazon S3 API를 호출하여 S3 스토리지에서 원본 파일을 다운로드합니다.`,
      note: `<ul>
        <li>링크는 파일이 성공적으로 업로드된 경우에만 작동합니다.</li>
        <li>링크의 기본 만료 시간은 <strong>30분</strong>입니다.</li>
        <li>신뢰성과 성능을 위해 AWS S3 SDK 사용을 권장합니다.</li>
        </ul>`,
      keyExample: 'codeExamples.wmDownloadOrigin',
    },
    {
      step: 'download(orderFile.wtrDownloadUrl',
      description: `Amazon S3 API를 호출하여 S3 스토리지에서 워터마킹된 파일을 다운로드합니다.`,
      note: `<ul>
          <li>링크는 <code>orderFiles[*].status</code> 필드가 <code>SUCCEEDED</code>일 때만 작동합니다.</li>
          <li>링크의 기본 만료 시간은 <strong>30분</strong>입니다.</li>
          <li>신뢰성과 성능을 위해 AWS S3 SDK 사용을 권장합니다.</li>
        </ul>`,
      keyExample: 'codeExamples.wmDownloadWtr',
    },
  ],
  pdCreate: [
    {
      step: 'create(order)',
      description: `API를 호출하여 워터마크 검출 주문을 생성할 수 있습니다.`,
      note: `주문 한 번에 최대 <strong>10</strong>개까지 생성이 가능합니다.`,
    },
    {
      step: 'upload(file, orderFile.uploadUrl)',
      description:
        'Amazon S3 API를 호출하여 S3 스토리지에 파일을 업로드합니다.',
      note: `<code>x-amz-meta-markany-file-type</code>: 1단계 <strong>요청</strong> 바디의 <code>files</code> 필드 내 <code>fileType</code> 필드와 동일한 값을 가져야 합니다.

        <code>x-amz-meta-markany-file-id</code>: 7단계 <strong>응답</strong> 바디의 <code>orderFiles</code> 필드 내 <code>id</code> 필드와 동일한 값을 가져야 합니다.
  
        <code>x-amz-meta-markany-resolution</code>: 7단계 <strong>응답</strong> 바디의 <code>orderFiles</code> 필드 내 <code>resolution</code> 필드와 동일한 값을 가져야 합니다 (<code>DOCUMENT</code> 파일 유형에만 해당).
        
        <ul>
          <li>링크의 기본 만료 시간은 <strong>30분</strong>입니다.</li>
          <li>신뢰성과 성능을 위해 AWS S3 SDK 사용을 권장합니다.</li>
        <ul>`,
      keyExample: 'codeExamples.pdUpload',
    },
    {
      step: 'notify(orderProcessedEvent)',
      description: `SaForus는 주문 처리 결과를 알리기 위해 파트너 웹훅을 호출합니다.  

        자세한 내용은 <anchorText>웹훅 등록하기</anchorText> 섹션을 참조하세요.`,
      note: ' ',
      link: '/webhook-api',
    },
  ],
  pdGetOrder: [
    {
      step: 'getOrder(orderQuery)',
      description: `API를 호출하여 워터마크 검출 주문에 대한 정보를 조회할 수 있습니다.`,
      note: ' ',
    },
    {
      step: 'download(orderFile.origDownloadUrl)',
      description:
        'Amazon S3 API를 호출하여 S3 스토리지에서 원본 업로드된 파일을 다운로드합니다.',
      note: `<ul>
            <li>링크는 파일이 성공적으로 업로드된 경우에만 작동합니다.</li>
            <li>링크의 기본 만료 시간은 <strong>30분</strong>입니다.</li>
            <li>신뢰성과 성능을 위해 AWS S3 SDK 사용을 권장합니다.</li>
          </ul>`,
      keyExample: 'codeExamples.pdDownload',
    },
  ],
  deleteWatermarkFiles: [
    {
      step: 'deleteFiles(orderId)',
      description:
        'API를 호출하여 주문에 속하는 모든 원본 파일과 워터마크된 파일을 삭제할 수 있습니다.',
      note: ' ',
    },
  ],
  deletePiracyFiles: [
    {
      step: 'deleteFiles(orderId)',
      description:
        'API를 호출하여 주문에 속하는 모든 워터마크 검출된 파일을 삭제할 수 있습니다.',
      note: ' ',
    },
  ],
  wmOrderEvents: [
    {
      step: 'WTR_ORDER.PROCESSED',
      description: '워터마킹 주문 처리가 완료되면 발생합니다.',
      note: ' ',
      keyExample: 'tableData.eventExamples.0.example',
    },
  ],
  pdOrderEvents: [
    {
      step: 'PD_ORDER.PROCESSED',
      description: '워터마크 검출 주문 처리가 완료되면 발생합니다.',
      note: ' ',
      keyExample: 'tableData.eventExamples.1.example',
    },
  ],
};

export default tableData;
