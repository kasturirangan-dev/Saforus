const csApi = {
  title: 'CS API 목록',
  descriptionTable: {
    step: '단계',
    description: '설명',
    note: '유의 사항',
  },
  example: '예시',
  authentication: {
    title: '인증하기',
    description: '본 문서는 계정 인증 과정과 관련 API를 설명합니다.',
    'account-flow': {
      title: '인증하기',
      flowchart: {
        title: '계정 인증 흐름도',
        content: `본 플로우에 따라 자격 증명이 미리 제공되며, 고객사는 성공적으로 로그인한 후 비밀번호 변경(선택 사항)을 진행할 수 있습니다.`,
      },
      login: {
        title: '로그인 API',
        content:
          '이 API를 사용하여 제공된 자격 증명으로 액세스 토큰을 생성할 수 있습니다.',
      },
      'change-password': {
        title: '비밀번호 변경 API',
        content: '이 API를 사용하여 비밀번호를 변경할 수 있습니다.',
      },
    },
    'password-reset': {
      title: '비밀번호 초기화',
      flowchart: {
        title: '비밀번호 초기화 흐름도',
        content:
          '비밀번호를 잊어버린 경우, 다음과 같이 비밀번호 재설정 흐름을 시작할 수 있습니다:',
      },
      trigger: {
        title: '트리거 비밀번호 초기화 API',
        content: '비밀번호 초기화 작업의 트리거를 진행하기 위한 API입니다.',
      },
      reset: {
        title: '비밀번호 초기화 API',
        content: '비밀번호 초기화 작업을 진행하기 위한 API입니다.',
      },
    },
  },
  apiKeys: {
    title: 'API 키 관리',
    description:
      'API 키를 관리하기 위해 CRUD API를 호출합니다. 이 문서에서는 API 키 관리 API의 사용 방법과 예시를 제공합니다.',
    create: {
      title: 'API 키 생성',
      content: 'API 키를 생성하기 위한 API입니다.',
    },
    search: {
      title: 'API 키 조회',
      content: 'API 키를 조회하기 위한 API입니다.',
    },
    update: {
      title: 'API 키 업데이트',
      content: 'API 키를 업데이트 하기 위한 API입니다.',
    },
    delete: {
      title: 'API 키 삭제',
      content: 'API 키를 삭제하기 위한 API입니다.',
    },
  },

  watermarking: {
    title: '워터마킹 API',
    description:
      '본 문서는 지정된 파일에 워터마크 코드를 삽입하기 위한 워터마킹 주문 생성 및 주문 정보 조회 방법을 설명합니다.',
    create: {
      title: '워터마크 주문 생성 API',
      flowchart: {
        title: '워터마크 주문 흐름도',
        content:
          '이 흐름은 파일에 워터마크를 적용하기 위해 주문을 생성하는 방법을 설명합니다.',
      },
      'create-api': {
        title: '워터마크 주문 생성',
        content:
          '이 API를 사용하여 새로운 워터마킹 주문을 생성할 수 있으며 인증을 위해 ApiKey가 필요합니다.',
      },
      example: {
        title: '샘플 코드',
        content: '워터마킹 주문 생성을 위해 아래의 샘플 코드를 제공합니다.',
      },
    },
    get: {
      title: '워터마크 주문 조회 API',
      flowchart: {
        title: '파일 다운로드 ',
        content:
          '웹훅을 통해 주문 처리 결과를 받은 후, 아래의 흐름에 따라 관련 파일을 다운로드할 수 있습니다.',
      },
      'get-api': {
        title: '결과 알림',
        content:
          '이 API는 주문 상태를 확인하기 위해 제공됩니다. 인증을 위해 ApiKey가 필요합니다.',
      },
      example: {
        title: '샘플 코드',
        content:
          '워터마킹 주문 결과를 받기 위해 아래의 샘플 코드를 제공합니다.',
      },
    },
  },

  detection: {
    title: '워터마크 검출 API',
    description:
      '본 문서는 지정된 파일의 워터마크 코드를 검출하기 위한 검출 주문 생성 및 주문 정보 조회 방법을 설명합니다.',
    create: {
      title: '워터마크 검출 주문 생성',
      flowchart: {
        title: '검출 주문 생성 흐름도',
        content:
          '파일에 워터마크 코드가 포함되어 있는지 확인하기 위해 검출 주문을 생성할 수 있습니다.',
      },
      'create-api': {
        title: '검출 주문 생성 API',
        content:
          '이 API를 사용하여 새로운 워터마크 검출 주문을 생성할 수 있으며 인증을 위해 ApiKey가 필요합니다.',
      },
      example: {
        title: '샘플 코드',
        content:
          '워터마크 검출 주문을 생성하기 위해 아래의 샘플 코드를 제공합니다.',
      },
    },
    get: {
      title: '워터마크 검출 주문 조회',
      flowchart: {
        title: '검출 주문 조회 흐름도',
        content:
          '웹훅을 통해 주문 처리 결과를 받은 후, 주어진 파일에서 워터마크 코드(있는 경우)를 확인할 수 있습니다.',
      },
      'get-api': {
        title: '검출 주문 조회 API',
        content:
          '이 API는 주문 상태를 확인하기 위해 제공됩니다. 인증을 위해 ApiKey가 필요합니다.',
      },
      example: {
        title: '샘플 코드',
        content:
          '워터마크 검출 주문 결과를 받기 위해 아래의 샘플 코드를 제공합니다.',
      },
    },
  },
  shareFile: {
    title: '파일 공유 API',
    description:
      '주문 ID를 기준으로 워터마크 돤 파일을 공유하는 API 제공합니다.',
    'share-flow': {
      title: '파일 공유',
      flowchart: {
        title: '파일 공유 흐름도',
      },
      description: {
        title: '설명',
      },
    },
    'share-api': {
      title: '워터마크 파일 공유 API',
      'content-1':
        '이 API를 사용하여 주문 ID를 기준으로 워터마크 된 파일을 공유할 수 있습니다.',
    },
    example: {
      title: '샘플 코드',
    },
  },
  deleteFile: {
    title: '파일 삭제 API',
    description:
      '특정 주문에 속하는 모든 파일을 삭제하도록 요청할 수 있습니다. 본 문서는 파일을 삭제하는 방법을 설명합니다.',
    watermark: {
      title: '원본 및 워터마크본 삭제',
      flowchart: {
        title: '파일 삭제 흐름도',
        content:
          '특정 주문에 속하는 모든 원본 파일과 워터마크된 파일을 삭제할 수 있습니다. ',
      },
      'delete-api': {
        title: '파일 삭제 API',
        content:
          '이 API를 사용하여 주문 ID를 기준으로 원본 파일과 워터마크 파일을 삭제할 수 있습니다.',
      },
    },
    piracy: {
      title: '검출 파일 삭제',
      flowchart: {
        title: '파일 삭제 흐름도',
        content:
          '특정 주문에 속하는 모든 워터마크 검출된 파일을 삭제할 수 있습니다.',
      },
      'delete-api': {
        title: '검출 파일 삭제 API',
        content:
          '이 API를 사용하여 주문 ID를 기준으로 워터마크 검출된 파일을 삭제할 수 있습니다.',
      },
    },
  },
  webhooks: {
    title: '웹훅 등록하기',
    description:
      '애플리케이션 이벤트를 실시간으로 받기를 위하여 웹훅을 연결하세요.',
    register: {
      title: '웹훅 등록',
      'content-1':
        '이벤트가 발생할 때 웹훅을 통해 알림 (예: <code>WTR_ORDER.PROCESSED</code>, <code>PD_ORDER.PROCESSED</code> 등)을 받을 수 있습니다. 전체 이벤트 목록은 <anchorText>웹훅 이벤트</anchorText> 섹션에서 확인할 수 있습니다.',
      'alert-1':
        '새로운 이벤트 유형이 지속적으로 추가되며, 처리할 이벤트와 방법은 선택할 수 있습니다. 다만, 이벤트 리스너 구현 시 시스템이 정상적으로 작동하도록 유지해야 합니다.',
      'content-2':
        '이벤트가 발생하면 HTTP POST 요청이 설정된 웹훅 URL로 전송되어, 이에 따른 후속 작업을 할 수 있습니다.',
      'alert-2':
        '동일 이벤트가 여러 번 처리되지 않도록 웹훅 핸들러의 <anchorText>멱등성</anchorText>을 유지하기를 권장합니다.',
      'content-3':
        '웹훅 이벤트는 지정된 URL로 한 번 전달을 시도하며, 전달이 실패할 경우(타임아웃 또는 HTTP 응답 코드가 200이 아닌 경우) 최대 3회까지 지수적 백오프 알고리즘을 사용해 재시도됩니다. 이벤트는 생성된 즉시 실행되며, 순서가 뒤바뀔 수 있으니 이를 고려한 처리가 필요합니다. 이 문제는 플랫폼 개선을 통해 점진적으로 해결해 나가고 있습니다.',
      'alert-3':
        '재시도된 이벤트가 중복 처리되지 않도록 <code>eventId</code>를 <anchorText>멱등성 키</anchorText>로 사용하여 처리하는 것을 권장합니다.',
    },
    securing: {
      title: '웹훅 보안 (선택 사항)',
      'content-1': `<strong>예상된 요청만 받도록 설정</strong>
        <ul>
          <li>서버가 페이로드를 수신하도록 설정되면, 지정한 엔드포인트로 전송되는 모든 페이로드를 수신하게 됩니다.</li>
          <li>보안상의 이유로 SaForus CS에서 전송된 페이로드인지 확인하는 것이 좋습니다.</li>
          <li>웹훅을 생성할 때 페이로드를 검증하려면, 페이로드 서명을 위한 비밀 API 키를 설정할 수 있습니다. </li>
        </ul>
        <br /> 
        <strong>커스텀 웹훅 시크릿 설정</strong>
        <ul>
          <li>자체 웹훅 시크릿을 사용하고자 할 경우 <linkSupport>고객 지원팀</linkSupport>에 요청하세요. </li>
          <li>저희 플랫폼을 개선 중이며, 곧 <linkConsole>나의 콘솔</linkConsole> 에서 시크릿을 직접 설정할 수 있습니다. </li>
        </ul>
        <br /> 
        <strong>페이로드 검증</strong>
        <ul>
          <li>API 키가 설정되면, SaForus CS는 웹훅 요청의 전체 본문을 사용해 HMAC SHA-256 알고리즘으로 해시 서명을 생성합니다. 이 서명은 base64로 인코딩되어 X-MarkAny-Signature 헤더에 포함된 채 요청과 함께 전달됩니다.</li>
          <li>
            서명을 검증할 때는, 해당 해시 값을 X-MarkAny-Signature 헤더 값과 비교합니다:
            <ul>
              <li><strong>일치:</strong> 요청이 검증을 통과한 것입니다.
              <li><strong>불일치:</strong> 요청이 전송 중 변조되었거나 위조되었을 가능성이 있습니다.
            </ul>
          </li>
        </ul>`,
      'event-example': '이벤트 본문 예시',
      'validate-signature': '서명 검증 예시',
    },
    events: {
      title: '웹훅 이벤트',
      'content-1': `자원에 대한 중요한 변경 사항을 기록하기 위해 이벤트를 사용합니다. 이벤트가 생성되면 웹훅 호출을 통해 전달됩니다.
        
        이벤트의 유형:  <code>{{RESOURCE}}.{{EVENT}}</code> 

        각 이벤트는 다음 필드들을 포함합니다.
        <ul>
          <li><code>code_content</code>: 이벤트 인스턴스 식별자 </li>
          <li><code>eventType</code>: 이벤트 인스턴스 유형 식별자</li>
          <li><code>occurredAt</code>: 이벤트 발생한 시간 식별자</li>
        </ul.`,
      table: {
        event: '이벤트 유형',
        description: '설명',
        example: '예시 코드',
      },
    },
  },
};

export default csApi;
