const errorCodes = {
  title: '오류 코드',
  description:
    '이 문서는 개발자들이 오류를 쉽게 이해하고 처리할 수 있도록 돕기 위해 만들어졌습니다.',
  format: {
    title: '오류 메시지 형식 ',
    'content-1':
      '오류 코드는 <strong>{{ SERVICE_NAME }}{{ FLAG }}{{ SEQUENCE }}</strong> 형식을 따르며, 구성 요소는 다음과 같습니다.',
    'example-error-message': '오류 메시지 예시',
  },
  codes: {
    title: '주요 오류 코드',
    authentication: {
      title: '인증하기',
    },
    watermarking: {
      title: '워터마크 적용',
    },
    detection: {
      title: '워터마크 검출',
    },
  },

  table: {
    system: 'System Error',
    business: 'Business Logic Error',
    code: '요류 코드',
    description: '오류 발생 원인',
    action: '해결 방법',
  },
};

export default errorCodes;
