const multiDrm = {
  'create-order': {
    steps: {
      'packaging-option': '패키징 옵션 선택하기',
      'choose-storage': '패키징 할 스토리지 설정',
      'output-streaming': '콘텐츠 트랜스코딩 설정',
      'submit-order': '주문서 제출',
    },
    'packaging-option': {
      'supported-format': '포렌식 워터마킹 포맷',
      'forensic-watermarking': '포렌식 워터마킹',
      'forensic-watermarking-alert-check': `포렌식 워터마킹 솔루션을 적용하려면, 콘텐츠 파일 이름에 "영문, 숫자, 하이픈-,밑줄 _" 만 포함해 주세요.`,
      'forensic-watermarking-alert-uncheck': `파일 이름에는 문자, 숫자, 하이픈 "-" 또는 밑줄 "_"만 포함해야 합니다.`,
      'forensic-watermarking-check': `불법 복제로부터 내 콘텐츠를 보호하기 위해 포렌식 워터마킹 솔루션을 사용하고 싶습니다. 콘텐츠에 먼저 포렌식 워터마크가 적용된 후 DRM 솔루션이 적용됩니다.`,
      'forensic-watermarking-uncheck': `불법 복제로부터 내 콘텐츠를 보호하기 위해 포렌식 워터마킹 솔루션을 사용하고 싶습니다.`,
      'multi-drm': 'Multi DRM 선택',
      'multi-drm-check':
        '[필수] DRM을 선택하여 비디오 콘텐츠를 암호화하려면 체크하세요.',
      streaming: '스트리밍 형식',
      container: 'Container',
      video: '비디오 코덱',
      audio: '오디오 코덱',
    },
    'choose-storage': {
      'file-location': '패키징 할 스토리지 설정',
      'file-location-description': 'DRM을 적용할 비디오 스토리지를 선택하세요.',
    },
    'output-streaming': {
      'stream-format': '스트리밍 형식',
      'segment-duration': '세그먼트 지속시간 (초)',
      'stream-type': '스트리밍 형식',
      'stream-type-description':
        '콘텐츠 패키지에 대한 스트리밍 형식을 선택하세요.',
      'dash-option': '대시 옵션',
      'codec-and-rate': '코덱 & 프레임 속도',
      'resolution-and-bitrate': '해상도 & 비트 전송률',
      'resolution-and-bitrate-description':
        '출력 비디오 해상도 옵션을 선택합니다.',
      'apply-average-band': 'Apply average bandwidth to MPD',
      'min-buffer-time': '최소 버퍼 시간',
      'use-code-config': '기존 파일과 동일하게 설정합니다.',
      'video-codec': '비디오 코덱*',
      'audio-codec': '오디오 코덱*',
      'frame-rate': '프레임 속도*',
    },
    'submit-order': {
      'order-no': '주문 번호: %{orderNo}',
      'select-order': 'Select your',
    },
  },
  'packaging-configuration': {
    'file-name-container': '파일 이름름 %{fileName}',
    title: '콘텐츠 패키징 설정 정보',
    'file-name': '파일 이름름',
    'input-file-path': '입력 파일 경로',
    'output-file-path': '출력 파일 경로',
    region: '리전',
    'site-name': '사이트 이름',
    status: '진행 상태',
    'packaging-option': '패키징 옵션 선택',
    'streaming-type': '스트리밍 형식',
    'video-audio-configuration': '비디오 및 오디오 설정',
  },
  button: {
    'create-order': '새 주문서 생성하기',
    'cancel-order': 'Cancel Order',
    'back-prev': 'Back to Prev',
  },
  dialog: {
    'cancel-order-title': 'Do you want to cancel your content packaging order?',
    'cancel-order-description':
      'All data in the order form will be reinitialized',
    'agreement-cancel': 'Yes, I would like to cancel my order.',
  },
  'order-list': {
    'order-no': '주문 번호호',
    requester: '요청자',
    'site-name': '사이트 이름',
    'file-name': '파일 이름',
    status: '진행 상태',
    watermark: '워터마크 적용',
    drm: 'DRM적용',
    requested: '요청일',
  },
  'order-detail': {
    'site-name': '사이트 이름',
    'file-name': '파일 이름',
    resolution: '해상도',
    'streaming-format': '스트리밍 형식',
    watermark: '워터마크 적용',
    drm: 'DRM 적용',
    'output-file-path': '결과물 저장 위치',
  },
  breadcrumb: {
    'multi-drm-watermarking': 'Multi-DRM Packaging',
    'view-orders': 'View Orders',
    details: 'Details',
    'packaging-configuration': 'Packaging Configuration',
  },
  table: {
    definition: '화면품질',
    resolution: '해상도',
    bitrate: '비트 전송률(kbps)',
    'site-name': 'Site 이름',
    'file-name': '파일 이름',
    'video-codec': '비디오 코덱',
    'audio-codec': '오디오 코덱',
    'stream-formats': '스트리밍 형식',
    watermark: '워터마크',
    'drm-type': 'DRM',
  },
  tooltip: {
    'stream-format': 'Need more streaming format?',
    'stream-format-description': 'Please contact Customer Support to get help.',
    duration: 'Segment Duration',
    'duration-description':
      'Live streaming uses it to break the original files into multiple files, for smooth streaming.',
    mpd: 'MPD(Media Presentation Description)',
    'mpd-description':
      'A MPD file is used to hold the information on the various streams and the bandwidths they are associated with.',
  },
  message: {
    'least-one-of-streaming': '스트리밍 형식을 한 개 이상 선택하세요.',
    'least-one-of-resolution': '출력 비디오 해상도를 한 개 이상 선택하십시오.',
  },
};

export default multiDrm;
