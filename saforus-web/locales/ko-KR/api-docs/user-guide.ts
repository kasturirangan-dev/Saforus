const userGuide = {
  title: '이용 안내',
  description:
    'SaForus CS API를 통해 콘텐츠에 보이지 않는 워터마크를 삽입하고, 워터마크가 적용된 파일을 검출해보세요.',
  version: {
    title: '버전 정보',
    'content-1': '버전: 1.0 \n 최종 수정일: 2024년 9월 2일',
  },
  introduction: {
    title: '서비스 소개',
    'content-1': `SaForus CS API를 이용하면, 고객사의 <anchorText>애플리케이션</anchorText>이나 웹 서비스에서 SaForus CS의 비가시성 워터마크 서비스를 직접 호출할 수 있습니다.

    이 서비스는 고객의 이미지, 영상, 음원 그리고 문서 자료에 보이지 않는 디지털 워터마크를 적용하고, 불법 유출된 자료에서 숨겨진 워터마크를 검출해 주는 서비스를 포함합니다. 그리고  API 사용량도 직접 확인할 수 있습니다.`,
  },
  supported: {
    title: '지원 형식',
    description: '이 서비스에서 지원하는 파일 형식은 아래와 같습니다.',
    'watermarking-formats': {
      title: '워터마크 삽입',
      image: 'JPG, PNG, TIFF, BMP',
      video: 'MP4',
      audio: 'MP3, WAV',
      document: 'PDF',
    },
    'detection-formats': {
      title: '워터마크 검출',
      image: 'JPG, PNG, TIFF, BMP',
      video: 'MP4 (CBR) ',
      audio: 'MP3, WAV(기본값)',
      document: 'PDF',
    },
    alert:
      '워터마크 생성 1건 당 최대 600MB까지 지원합니다. 대용량 파일은 <linkSupport>고객센터</linkSupport>로 문의해 주세요.',
  },
  environments: {
    title: '연동 서버 환경',
    description: '이 서비스는 아래 두 가지 개발 환경에서 동작합니다.',
    staging: {
      title: '스테이징 서버',
      content: `<ul>
          <li>API 연동 테스트를 위한 테스트 환경으로 대용량 파일을 테스트 하면 속도 저하가 발생 할 수 있음</li>
          <li>AWS 리전 : ap-northeast-2 AWS 리전(서울)</li>
          <li>서버 URL : <anchorText>https://stag-cs.saforus.com</anchorText></li>
        </ul>`,
    },
    production: {
      title: '프로덕션 서버',
      content: `<ul>
          <li>대량의 요청을 처리하도록 구성된 프로덕션 환경으로 다운타임을 최소화하고 최적의 성능을 보장</li>
          <li>AWS 리전 : ap-northeast-2 AWS 리전(서울)</li>
          <li>서버 URL : <anchorText>https://cs.saforus.com</anchorText></li>
        </ul>`,
    },
    alert:
      '<strong>참고사항:</strong> 스테이징 환경에서 제공하는 기능의 종류는 프로덕션 환경과 동일합니다. 다만 스테이징 환경은 API 처리 속도가 늦을 수 있습니다.',
  },
  structure: {
    title: 'API 문서 구조',
    description:
      'SaForus CS API 연동 가이드는 아래 내용을 순서대로 설명합니다.',
    'authentication-flow': {
      title: '인증하기',
      content: `<ul>
          <li>로그인</li> 
          <li>비밀번호 변경</li> 
          <li>비밀번호 초기화</li> 
          <li>웹훅 엔드포인트 생성</li> 
        </ul>`,
    },
    'watermarking-flow': {
      title: '워터마크 적용하기',
      content: `<ul>
          <li>워터마크 주문 생성</li>
          <li>워터마크 주문 조회</li>
        </ul>`,
    },
    'detection-flow': {
      title: '워터마크 검출하기',
      content: `<ul>
          <li>워터마크 검출 주문 생성</li>
          <li>워터마크 검출 주문 조회</li>
        </ul>`,
    },
    'webhook-flow': {
      title: '웹훅 등록하기',
      content: `<ul>
          <li>웹훅 등록</li>
          <li>웹훅 보안 (선택 사항)</li>
          <li>웹훅 이베트</li>
        </ul>`,
    },
  },
};
export default userGuide;
