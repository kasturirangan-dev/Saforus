const apiIntegration = {
  title: 'API 연동 가이드',
  'api-spec': {
    title: 'API 사양',
    request: 'Request',
    response: 'Response',
    'try-it': '시도해보기',
    url: 'URL',
    method: '방식',
    header: '헤더',
    pathVariables: '경로 변수',
    parameters: '쿼리 매개변수',
    body: '바디',
    properties: '속성',
    type: '타입',
    note: '설명',
    bodyNa: '없음',
  },
  'example-code': {
    title: '예시 코드',
    request: '요청',
    response: '응답',
    overall: '전체 구조',
  },
};
const integrationBasic = {
  title: '연동 기본 정보',
  description:
    '고객사 앱이나 서비스가 SaForus CS API를 연동하기 전에 알아야 할 기본 개념을 설명합니다.',
  'app-authentication': {
    title: '앱 인증',
    'content-1': `고객사의 <anchorText>애플리케이션</anchorText>이 API 서버에 접근하기 위해서는 액세스 토큰 기반 인증이 필수입니다. CSI API를 호출할 때마다 이 토큰을 '자격 증명(Credential)'으로 서버에 전달해야 합니다.`,
    'content-2': `<anchorText>액세스 토큰</anchorText>을 얻기 위한 고객사 온보딩 프로세스는 다음과 같습니다:`,
  },

  'api-request-retry': {
    title: 'API 요청 재시도',
    'content-1': `<anchorText>API</anchorText> 요청은 네트워크 문제, 속도 제한, 시간 초과, 서비스 문제 등으로 실패할 수 있습니다.
      <ul>
        <li>효율적인 처리를 위해 지수 백오프(점점 길어지는 대기 시간)와/또는 지터(랜덤 지연 시간)를 적용한 재시도 방식을 권장합니다.</li>
        <li>또한, 요청이 여러 번 전송되더라도 서버에서 한 번만 처리하도록 고유한 식별자(멱등성 키)를 포함해 주세요.</li>
      </ul>`,
  },
  'idempotency-guarantee': {
    title: '멱등성 보장',
    'content-1': `명확한 이유 없이 API 호출이 실패할 경우, 동일한 API를 안전하게 재호출할 수 있도록 <anchorText>멱등성</anchorText>이 중요합니다. SaForus CS 서비스에서는 다음 API들이 멱등성을 보장합니다. 즉, 동일 요청을 여러 번 호출해도 한 번만 처리됩니다.
     
      <ul>
        <li><code>/api/saforus-cs-api-wtr/ext/v1/orders</code> (워터마크 적용 주문)</li>
        <li><code>/api/saforus-cs-api-pd/ext/v1/orders</code> (워터마크 검출 주문)</li>
      </ul>
      예를 들어, 네트워크 오류로 워터마크 적용 요청이 실패한 경우, 멱등성 키를 요청 헤더에 포함시키면 호출 횟수에 관계 없이 요청은 한 번만 처리됩니다.
      
      UUID 버전 4를 멱등성 키로 사용하는 것을 권장합니다. 멱등성 키는 성공적으로 사용된 시점부터 <code>{n}</code> 년 동안 유효하며, 이 기간이 지나면 키가 재사용 될 수 있습니다.`,
    alert:
      '<strong>중요 사항:</strong> 멱등성 키는 서로 다른 API 리소스 간에 공유되지 않습니다. 하지만 서로 다른 작업에 동일한 키를 사용하는 것은 권장하지 않습니다. 중복을 피하기 위해 각 API에는 유니크한 멱등성 키를 사용하는 것이 좋습니다.',
  },
  timeout: {
    title: '타임 아웃',
    'content-1':
      '요청이 실패할 경우, 가능한 한 빠르게 재요청할 수 있도록 <strong>30초</strong>의 타임아웃이 적용되어 있습니다. 따라서 고객사의 애플리케이션 및 서비스에서도 동일한 타임아웃을 설정하는 것이 좋습니다.',
  },
  'server-response': {
    title: '서버 응답',
    'overall-structure': '전체 구조',
    'code-example': {
      title: '코드 예제 보기',
      table: {
        code: '코드 예제',
        description: '설명',
        example: '예시 코드',
        failure: '실패',
        success: '성공',
      },
    },
    'empty-data': {
      title: '빈 데이터 값의 처리',
      content: `<ul>
          <li>빈 데이터는 <red>null</red>, 빈 배열 <red>[]</red>, 또는 빈 객체 <red>{}</red> 를 의미합니다.</li>
          <li>이러한 의미없는 빈 데이터가 ‘응답’ 구조에 포함되지 않습니다. </li>
          <li>아래 CS API 응답 구조 예제를 참고해 주세요.</li>
        </ul>`,
    },
    'empty-types': {
      title: '빈 데이터 종류 보기',
      table: {
        case: '빈 데이터 종류',
        normal: '일반적인 API 응답 구조',
        expected: 'Saforus CS API 응답 구조',
      },
    },
  },
  webhook: {
    title: '웹훅',
    'content-1': `본 서비스는 리소스의 주요 변경 사항을 이벤트로 기록하고, 이를 <anchorText>웹훅</anchorText>을 통해 고객사의 앱 또는 서비스로 전달합니다. 주요 이벤트는 다음과 같으며, 전체 이벤트 목록은 아래에서 확인할 수 있습니다:
      <ul>
        <li><code>WTR_ORDER.PROCESSED</code></li>
        <li><code>PD_ORDER.PROCESSED</code></li>
      </ul>이벤트 발생 시, HTTP POST 요청이 웹훅의 URL로 전송되어 고객사의 앱 또는 서비스에서 작업을 수행할 수 있습니다.`,
    'content-2':
      '웹훅 등록하기에 대한 상세 정보는 <anchorText>웹훅 등록</anchorText> 페이지에서 확인할 수 있습니다.',
  },
};

const quickStart = {
  title: '빠른 연동 가이드',
  description:
    '본 문서는 고객사 개발팀의 빠른 연동 테스트를 돕기 위한 퀵 연동 가이드입니다.',
  'get-start': {
    title: '시작하기',
    'content-1': `SaForus CS API 서비스의 기본 기능을 빠르게 확인할 수 있도록 주요 API 목록과 호출 순서를 설명합니다. 전체 API는 <anchorText>SaForus API 목록</anchorText> 확인해 주세요.
      SaForus CS API의 기본 기능은 아래와 같습니다. 
      <ul>
        <li>콘텐츠 파일에 보이지 않는 <strong>워터마크 적용하기</strong></li>
        <li>워터마크 적용된 콘텐츠 파일에서 <strong>워터마크 검출하기</strong></li>
      </ul>`,
    'content-2': `<strong>테스트 정보</strong>:
       테스트를 해보시려면 아래 정보를 이용해 실행해 보세요.`,
    staging: {
      title: 'Staging',
      domain: '<anchorText>https://stag-cs.saforus.com</anchorText>',
      'api-key': '43f87542-1ce4-4ef8-8413-138e8d766278',
    },
    production: {
      title: 'Production',
      domain: '<anchorText>https://cs.saforus.com</anchorText>',
      'api-key': '문의하기',
    },
    alert: `<strong>API Key</strong>를 제공하는데 이 키는 <strong>테스트 용도로만 사용</strong>하며, 실제 서비스에서는 고객사별로 발급된 계정을 통해 상용 API Key를 생성해야 합니다.`,
  },
  watermarking: {
    title: '워터마크 적용하기',
    flowchart: {
      title: '워터마킹 흐름도',
    },
    create: {
      title: '워터마크 주문 생성 API',
      content:
        '이 API를 사용하여 새로운 워터마킹 주문을 생성할 수 있으며 인증을 위해 ApiKey가 필요합니다.',
    },
    'file-upload': {
      title: '파일 업로드',
      content:
        '이제 이전 섹션에서 제공된 업로드 URL을 사용하여 파일을 업로드할 수 있습니다.',
    },
    get: {
      title: '워터마크 주문 조회',
      content: `이 API는 주문 상태를 확인하기 위해 제공됩니다. 인증을 위해 ApiKey가 필요합니다.`,
    },
  },
  detection: {
    title: '워터마크 검출하기',
    flowchart: {
      title: '워터마크 검출 흐름도',
    },
    create: {
      title: '워터마크 검출 주문 생성 API',
      content:
        '이 API를 사용하여 새로운 워터마크 검출 주문을 생성할 수 있으며 인증을 위해 ApiKey가 필요합니다.',
    },
    'file-upload': {
      title: '파일 업로드',
      content:
        '이제 이전 섹션에서 제공된 업로드 URL을 사용하여 파일을 업로드할 수 있습니다.',
    },
    get: {
      title: '워터마크 검출 주문 조회',
      content: `이 API는 주문 상태를 확인하기 위해 제공됩니다. 인증을 위해 ApiKey가 필요합니다.`,
    },
  },
  webhook: {
    title: '웹훅 엔드포인트 등록 (선택 사항)',
    'content-1':
      '이 API는 워터마킹 및 해적 감지 주문 결과에 대한 알림을 위한 웹훅 엔드포인트를 등록할 수 있도록 해줍니다. 커스텀 비밀 등록과 같은 문의사항이 있을 경우, 지원을 위해 <anchorText>문의하기</anchorText> 해 주시기 바랍니다.',
  },
};

export { apiIntegration, integrationBasic, quickStart };
