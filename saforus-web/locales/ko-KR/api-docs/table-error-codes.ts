const errorCodesData = {
  authentication: {
    system: [
      {
        code: 'CSA1000',
        description: '시스템 오류 (원인 불명)',
        action:
          '요청을 재시도하거나 <linkSupport>고객센터에 문의</linkSupport>하세요.',
      },
      {
        code: 'CSA1001',
        description: '잘못된 입력 필드 (필수 필드 누락)',
        action: '응답 내용을 확인하세요.',
      },
      {
        code: 'CSA1002',
        description: '요청 파라미터 누락',
        action: '응답 내용을 확인하세요.',
      },
      {
        code: 'CSA1003',
        description: '읽을 수 없는 HTTP 메시지 (JSON 객체 아님)',
        action: '요청 본문이 JSON인지 확인하세요.',
      },
      {
        code: 'CSA1004',
        description: '방식 인수 유형 불일치',
        action: '요청에 올바른 값을 전달했는지 확인하세요.',
      },
      {
        code: 'CSA1005',
        description: '지원되지 않는 HTTP 미디어 타입',
        action: '올바른 미디어 타입인지 확인하세요.',
      },
      {
        code: 'CSA1006',
        description: '지원되지 않는 HTTP 요청 방식',
        action:
          'POST, PUT, GET, PATCH, DELETE 중 올바른 방식을 사용했는지 확인하세요.',
      },
      {
        code: 'CSA1007',
        description: '요청 헤더 누락',
        action: '필수 헤더가 있는지 API 문서를 확인하세요.',
      },
      {
        code: 'CSA1008',
        description: '잘못된 숫자 형식',
        action: '숫자 필드에 문자열을 전달하지 않았는지 확인하세요.',
      },
      {
        code: 'CSA1009',
        description: '권한 없음.',
        action: '계정에 적절한 권한이 있는지 확인하세요.',
      },
    ],
    business: [
      {
        code: 'CSA1100',
        description: '엔티티를 찾을 수 없음',
        action: '올바른 ID를 전달했는지 확인하세요.',
      },
      {
        code: 'CSA1101',
        description: '잘못된 엔티티 상태',
        action: '엔티티 상태를 업데이트하세요.',
      },
      {
        code: 'CSA1102',
        description: '엔티티가 이미 존재함',
        action: '고유 제약 조건을 위반하지 않는 새 엔티티를 생성 하세요.',
      },
      {
        code: 'CSA1103',
        description: '알림 전송 실패',
        action: '<linkSupport>고객센터에 문의</linkSupport>하세요.',
      },
      {
        code: 'CSA1104',
        description: '잘못된 자격 증명',
        action: '올바른 사용자명과 비밀번호를 제공했는지 확인 하세요.',
      },
      {
        code: 'CSA1105',
        description: '지원되지 않는 알림 이벤트',
        action: '<linkSupport>고객센터에 문의</linkSupport>하세요.',
      },
      {
        code: 'CSA1106',
        description: '잘못된 JWT 토큰',
        action: '올바른 토큰을 사용했는지 확인하세요.',
      },
      {
        code: 'CSA1107',
        description: 'JWT 토큰 만료',
        action: '새 토큰을 생성하세요.',
      },
      {
        code: 'CSA1108',
        description: '잘못된 서명',
        action: '<linkSupport>고객센터에 문의</linkSupport>하세요.',
      },
      {
        code: 'CSA1109',
        description: 'ApiKey 만료',
        action: '새 apiKey를 사용하거나 만료 시간을 갱신하세요.',
      },
      {
        code: 'CSA1110',
        description: 'ApiKey 생성 제한 초과 (계정당 최대 10개)',
        action:
          '서비스 플랜 업그레이드를 위해 <linkSupport>고객센터에 문의</linkSupport> 하세요.',
      },
    ],
  },
  watermarking: {
    system: [
      {
        code: 'CSW1000',
        description: '시스템 오류 (원인 불명)',
        action:
          '요청을 재시도하거나 <linkSupport>고객센터에 문의</linkSupport>하세요.',
      },
      {
        code: 'CSW1001',
        description: '잘못된 입력 필드 (필수 필드 누락)',
        action: '응답 내용을 확인하세요.',
      },
      {
        code: 'CSW1002',
        description: '요청 파라미터 누락',
        action: '응답 내용을 확인하세요.',
      },
      {
        code: 'CSW1003',
        description: '읽을 수 없는 HTTP 메시지 (JSON 객체 아님)',
        action: '요청 본문이 JSON인지 확인하세요.',
      },
      {
        code: 'CSW1004',
        description: '방식 인수 유형 불일치',
        action: '요청에 올바른 값을 전달했는지 확인하세요.',
      },
      {
        code: 'CSW1005',
        description: '지원되지 않는 HTTP 미디어 타입',
        action: '올바른 미디어 타입인지 확인하세요.',
      },
      {
        code: 'CSW1006',
        description: '지원되지 않는 HTTP 요청 방식',
        action:
          'POST, PUT, GET, PATCH, DELETE 중 올바른 방식을 사용했는지 확인하세요.',
      },
      {
        code: 'CSW1007',
        description: '요청 헤더 누락',
        action: '필수 헤더가 있는지 API 문서를 확인하세요.',
      },
      {
        code: 'CSW1008',
        description: '잘못된 숫자 형식',
        action: '숫자 필드에 문자열을 전달하지 않았는지 확인하세요.',
      },
      {
        code: 'CSW1009',
        description: '권한 없음',
        action: '계정에 적절한 권한이 있는지 확인하세요.',
      },
      {
        code: 'CSW1010',
        description: '잘못된 열거형 값',
        action:
          'API 문서를 확인하여 열거형 필드에 올바른 값을 전달했는지 확인하세요.',
      },
    ],
    business: [
      {
        code: 'CSW1100',
        description: '엔티티를 찾을 수 없음',
        action: '올바른 ID를 전달했는지 확인하세요.',
      },
      {
        code: 'CSW1101',
        description: '잘못된 엔티티 상태',
        action: '엔티티 상태를 업데이트하세요.',
      },
      {
        code: 'CSW1103',
        description: '알림 전송 실패',
        action: '<linkSupport>고객센터에 문의</linkSupport>하세요.',
      },
      {
        code: 'CSW1105',
        description: '지원되지 않는 알림 이벤트',
        action: '<linkSupport>고객센터에 문의</linkSupport>하세요.',
      },
      {
        code: 'CSW1106',
        description: '잘못된 JWT 토큰',
        action: '올바른 토큰을 사용했는지 확인하세요.',
      },
      {
        code: 'CSW1107',
        description: 'JWT 토큰 만료',
        action: '새 토큰을 생성하세요.',
      },
      {
        code: 'CSW1108',
        description: '잘못된 워터마크 메시지',
        action:
          'API 문서를 확인하여 워터마크 메시지 필드에 올바른 값을 전달했는지 확인하세요.',
      },
      {
        code: 'CSW1109',
        description: '주문 파일이 삭제됨',
        action:
          '주문 파일이 이미 삭제되었습니다. 새로운 주문을 제출하거나 다른 주문을 시도하세요.',
      },
    ],
  },
  detection: {
    system: [
      {
        code: 'CSP1000',
        description: '시스템 오류 (원인 불명)',
        action:
          '요청을 재시도하거나 <linkSupport>고객센터에 문의</linkSupport>하세요.',
      },
      {
        code: 'CSP1001',
        description: '잘못된 입력 필드 (필수 필드 누락)',
        action: '응답 내용을 확인하세요.',
      },
      {
        code: 'CSP1002',
        description: '요청 파라미터 누락',
        action: '응답 내용을 확인하세요.',
      },
      {
        code: 'CSP1003',
        description: '읽을 수 없는 HTTP 메시지 (JSON 객체 아님)',
        action: '요청 본문이 JSON인지 확인하세요.',
      },
      {
        code: 'CSP1004',
        description: '방식 인수 유형 불일치',
        action: '요청에 올바른 값을 전달했는지 확인하세요.',
      },
      {
        code: 'CSP1005',
        description: '지원되지 않는 HTTP 미디어 타입',
        action: '올바른 미디어 타입인지 확인하세요.',
      },
      {
        code: 'CSP1006',
        description: '지원되지 않는 HTTP 요청 방식',
        action:
          'POST, PUT, GET, PATCH, DELETE 중 올바른 방식을 사용했는지 확인하세요.',
      },
      {
        code: 'CSP1007',
        description: '요청 헤더 누락',
        action: '필수 헤더가 있는지 API 문서를 확인하세요.',
      },
      {
        code: 'CSP1008',
        description: '잘못된 숫자 형식',
        action: '숫자 필드에 문자열을 전달하지 않았는지 확인하세요.',
      },
      {
        code: 'CSP1009',
        description: '권한 없음',
        action: '계정에 적절한 권한이 있는지 확인하세요.',
      },
      {
        code: 'CSP1010',
        description: '잘못된 열거형 값',
        action:
          'API 문서를 확인하여 열거형 필드에 올바른 값을 전달했는지 확인하세요.',
      },
    ],
    business: [
      {
        code: 'CSP1100',
        description: '엔티티를 찾을 수 없음',
        action: '올바른 ID를 전달했는지 확인하세요.',
      },
      {
        code: 'CSP1101',
        description: '잘못된 엔티티 상태',
        action: '엔티티 상태를 업데이트하세요.',
      },
      {
        code: 'CSP1106',
        description: '잘못된 JWT 토큰',
        action: '올바른 토큰을 사용했는지 확인하세요.',
      },
      {
        code: 'CSP1107',
        description: 'JWT 토큰 만료',
        action: '새 토큰을 생성하세요.',
      },
      {
        code: 'CSP1108',
        description: '문서 해상도 필드 값 누락',
        action: '요청에 문서 해상도 필드 값을 포함하세요.',
      },
      {
        code: 'CSP1109',
        description: '원본 파일 키 필드 값 누락',
        action: '요청에 원본 파일 키 필드 값을 포함하세요.',
      },
    ],
  },
};

export default errorCodesData;
