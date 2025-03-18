const piracyDetection = {
  'create-new-request': {
    'header-title': '워터마크 검출',
    'header-description':
      '업로드된 파일에서 워터마크 코드를 검출을 하고 콘텐츠 무결성을 보장하세요.',
    'description-2':
      '워터마킹 성능이 개선되었습니다. 2024년 11월 13일 이전에 주문한 워터마킹 파일은 <0>고객센터</0>로 검출 요청해 주세요.',
    'sub-title': '포렌식 워터마크 검출을 요청할 콘텐츠의 타입을 선택해 주세요.',
    'request-title': '제목*',
    'request-title-placeholder': '제목을 입력해 주세요. (50자 이내)',
    'content-type': '검출할 콘텐츠 파일 형식을 선택해 주세요.',
    'order-number': '유출된 원본을 지정해주세요',
    'order-number-placeholder': '예시 FI-1675667544270',
    'order-number-helper-text':
      '유출된 콘텐츠의 워터마킹 주문번호를 선택하세요.',
    'find-order-number': '원본 찾기',
    'requested-file': '검출할 파일 위치',
    'upload-linked-file': '검출할 파일 업로드*',
    'upload-file': '검출할 파일 업로드*',
    'requested-file-description':
      '보이지 않는 워터마크를 검출하기 위해서 유출된 콘텐츠의 사본 파일을 세이포러스로 전송해 주세요.',
    'file-format':
      '파일 이름에 "영문, 숫자, -,_" 문자와 기호를 제외한 문자가 포함되면 워터마크 자동검출을 진행할 수 없어요.',
    'file-size': '최대 1GB 크기의 파일을 업로드 할 수 있습니다.',
    'file-size-support':
      '주문 1건 당 600MB까지 지원합니다. (대용량 파일은 고객센터에 문의해 주세요.)',
    'requirement-description':
      '유출된 파일에서 워터마크를 검출하기 위한 최소 요구사항을 확인하세요.',
    'remove-loading': '파일을 제거합니다.\n완료될 때까지 기다려 주십시오.',
    'create-loading': '파일을 전송하고 있어요.',
    'upload-my-file': '내 컴퓨터',
    'share-link': '클라우드 스토리지',
    'minimum-image-length': '이미지 권장 사이즈',
    'image-quality': '이미지 권장 해상도',
    'image-stability': '검출율 높이기',
    'minimum-video-length': '최소 비디오 길이',
    'video-quality': '비디오 품질',
    'video-stability': '비디오 안정성',
    'minimum-audio-length': '최소 오디오 길이',
    'audio-quality': '오디오 품질',
    'audio-stability': '오디오 안정성',
    'submit-request': '검출 요청하기',
    'attack-file': {
      title: '파일 첨부',
      'drop-file-text': '워터마크 검출할 파일을 첨부하세요',
      'browse-file-text':
        '파일을 여기로 드래그 하거나 <0>내 컴퓨터</0>에서 불러오세요.',
    },
    'search-watermark': {
      title: '유출된 원본을 지정하세요',
      'watermarked-file': '원본 찾기',
      searching: '검색 중입니다...',
      'not-found': '일치 항목을 찾을 수 없습니다.',
      'not-found-desc':
        '일부 경우 파일이 지원되지 않거나 원본 파일이 데이터베이스에 없을 수 있어 자동 검색이 불가능할 수 있습니다.',
      'try-again': '다시 시도',
      'help-text': '하거나 원본 콘텐츠를 수동으로 선택해 주세요.',
      'search-text': '오리지널 콘텐츠를 선택하세요',
      'search-file': '파일 찾기',
    },
    supported: {
      title: '검출 권장 조건',
      'file-size':
        '워터마크 생성 1건 당 최대 600MB까지 지원합니다. 대용량 파일은 <0>고객센터</0>로 문의해 주세요.',
      format: '검출 가능한 형식',
      wav: 'Wav(기본값)',
    },
    requirement: {
      img: {
        'resolution-in-pixels': '이미지 권장 사이즈',
        'resolution-1': '최소 512 X 512 (권장)',
        'supported-file-format': '검출 가능한 파일 포맷',
        'supported-format-1': 'JPG',
        'supported-format-2': 'BMP (RGB 24bit, RGBA 32bit or Gray 8bit)',
        'not-supported': '미지원 포맷',
        'not-supported-1': 'CMYK 포맷',
        'not-supported-2': '10비트 칼라 포맷',
        'not-supported-3': '1비트 흑백 포맷',
      },
      video: {
        'play-time': '검출 가능한 재생 시간',
        'play-time-1': '배포용 비디오 : 최소 3분 이상',
        'play-time-2': '스트리밍용 비디오 : 최소 15분 이상',
        resolution: '비디오 해상도 및 품질',
        'resolution-1': '최소 480p(SD), 1Mbps',
        'resolution-2': '권장 720p(HD), 30fps, 3Mbps 이상s',
        'supported-file-formats': '검출 가능한 포맷',
        'supported-file-formats-1': 'MP4 (CBR)',
        'supported-codec': '검출 가능한 코덱',
        'supported-codec-1': 'Video Codec (H.264 , H.265)',
        'supported-codec-2': 'Audio Codec (제한 없음)',
        note: '참고 사항',
        'note-1':
          '흔들림 없이 고정된 영상이 워터마크 검출율이 더 높습니다. 카메라 또는 스마트폰으로 사진을 찍어 화면이 심하게 흔들리는 경우 검출율이 낮아집니다.',
        'note-2':
          '최소 5분 이상 화면 버퍼링 없이 정상적으로 재생된 구간이 있어야 합니다.',
      },
      audio: {
        'play-time': '검출 가능한 재생 시간',
        'play-time-1': '최소 8초 이상',
        'play-time-2': '16 초 이상 권장',
        'file-format': '검출 가능한 포맷',
        'file-format-1': 'MP3, Wav(기본값)',
        'sampling-rate': '검출 가능한 샘플링 레이트',
        'sampling-rate-1': '44.1KHz',
        'sampling-rate-2': '48KHz',
      },
    },
    confirm: {
      'img-header': '검출가능한 파일 형식는 JPEG, BMP만 가능합니다.',
      'img-desc': '필요할 경우 파일 포맷 변환 후 검출하는것에 동의 합니다.',
      'audio-header': '검출가능한 파일 형식는 MP3, WAV만 가능합니다.',
      'audio-desc': '필요할 경우 파일 포맷 변환 후 검출하는것에 동의 합니다.',
      'video-header': '검출가능한 파일 형식는 MP4, WMV만 가능합니다.',
      'video-desc': '필요할 경우 파일 포맷 변환 후 검출하는것에 동의 합니다.',
      'document-desc':
        '필요할 경우 파일 포맷 변환 후 검출하는것에 동의 합니다.',
      'file-upload-failed': '파일 업로드에 실패했습니다.',
      'file-upload-failed-img':
        '이미지파일 형식이 아닙니다. 파일 형식에 맞게 업로드 해주세요.',
      'file-upload-failed-video':
        '비디오 파일 형식이 아닙니다. 파일 형식에 맞게 업로드 해주세요.',
      'file-upload-failed-audio':
        '오디오 파일 형식이 아닙니다. 파일 형식에 맞게 업로드 해주세요.',
      'file-upload-failed-any_available': '이 파일 형식은 ',
      'file-upload-failed-any_available_continued':
        ' 허용되지 않습니다. 지원되는 파일 형식에 따라 업로드해 주세요.',
      unsupported: '지원되지 않는 파일 형식입니다.',
      'file-upload-wrong-format-name':
        '주문 요청에 실패했습니다. 파일 이름과 파일 형식을 확인하십시오.',
      'file-upload-wrong-format':
        '검출 가능한 파일 형식이 아닙니다. \n 파일 형식에 맞게 업로드 해주세요.',
      'file-upload-max-size': '1GB 미만의 파일을 제출해 주세요.',
      'only-one-file-allowed': '파일은 하나만 첨부할 수 있습니다.',
      'retry-btn': '다시 시도',
    },
    'trial-description':
      '무료 요금제는 유출된 파일에서 검출된 워터마크 코드만 확인할 수 있어요.검출된 워터마크 코드의 수신자 정보를 확인하려면 서비스 플랜을 업그레이드 해 보세요.',
    message: {
      'failed-title': '알 수 없는 오류가 발생했습니다.',
      'failed-description': '다시 시도해주세요!',
      successful: '요청했습니다!',
      'failed-402010':
        '구독중인 서비스 플랜의 불법유출 검출 서비스 무료 이용 횟수를 초과했어요. 무료 이용 횟수를 추가하려면, 고객 센터로 문의해 주세요.',
      'need-permission':
        '주문 생성 권한이 없습니다. 팀 마스터에게 권한을 요청해 주세요.',
      'pd-request-limit':
        '요청 가능한 워터마크 검출 횟수를 초과했습니다. 추가 요청이 필요한 경우 고객센터에 문의해 주세요.',
    },
    'trial-title':
      '%{fullName} 님은 현재 무료평가판 (%{numberOfDay} 일 남음) 이용 중입니다.',
    'trial-description-1':
      '무료 요금제는 유출된 파일에서 검출된 워터마크 코드만 확인할 수 있어요.',
    'trial-description-2':
      '요금제를 업그레이드하여 프리미엄 기능을 이용할 수 있습니다.',
    'don-show-trial': '하루동안 보지 않음',
  },
  delete: {
    title: '주문 삭제 하시겠습니까?',
    description: '이 주문을 삭제하면 30일 후에는 복구할 수 없습니다.',
    button: {
      close: '취소',
      delete: '삭제',
    },
  },
  'piracy-order-view': {
    'order-list': '주문 목록',
    'header-title': '검출 주문 내역',
    'header-description':
      '워터마크 검출 요청을 모니터링하고 관리하여 각 주문의 상태와 결과를 확인할 수 있습니다.',
    'header-find-order': '디지털 워터마킹 주문번호 찾기',
    'search-order-no': '주문 번호 또는 주문서 제목 으로 검색 하세요',
    search: {
      title: '검색',
      reset: '전체 초기화',
      format: '파일 형식',
      requested: '요청일',
    },
    table: {
      results: '검출 결과',
      'order-no': '주문 번호',
      title: '제목',
      'file-name': '파일 이름',
      format: '파일 형식',
      status: '작업 상태',
      'content-type': '콘텐츠 타입',
      requestor: '요청자',
      'request-date': '요청 일시',
      'in-queue': '진행전',
      'in-progress': '작업중',
      completed: '작업 완료',
      failed: '작업 실패',
      expired: '만료됨',
      action: '활용',
      details: '워터마크된 파일',
      description: '워터마크된 파일',
    },
    'order-detail': {
      title: '워터마크 검출결과',
      'header-description':
        '업로드된 파일에서 워터마크 코드를 검출을 하고 콘텐츠 무결성을 보장하세요.',
      'order-title': '주문 번호 %{orderNo}',
      'order-number': '주문 번호',
      'request-date': '요청일',
      status: '진행 상태',
      'requested-file': '업로드된 파일',
      inqueue: '진행전',
      inprogress: '진행중',
      completed: '검출 완료',
      detected: '검출됨',
      undetected: '미검출',
      failed: '검출 실패',
      'auto-detection': '자동',
      'expert-detection': '전문가',
      'detection-result': '검출 결과',
      'content-type': '콘텐츠 타입',
      'file-format': '파일 포맷',
      'reference-order-no': '참조 주문 번호',
      'watermark-code': '워터마크 코드',
      'watermarked-date': '워터마크 날짜',
      'share-history': '공유 내역',
      description: '파일 식별값',
      'no-share': '아직 공유 내역이 없습니다.',
      'no-description': '설명 내용이 없습니다.',
      'failed-popup-title':
        '포렌식 워터마크 자동검출을 지원하지 않는 파일입니다.',
      'failed-popup-description':
        '<strong>자동 검출</strong> 은 워터마크를 적용한 콘텐츠 파일이나 유출된 콘텐츠를 직접 다운로드한 파일이 필요합니다. 유출된 콘텐츠를 카메라로 촬영하거나 화면 캡쳐 또는 녹음한 파일은 <strong>전문가 검출</strong> 을 신청해 주세요.',
      'failed-request-btn': '전문가 검출 신청하기',
      'view-faqs': 'View FAQs',
      'no-file-or-link-available': 'No file or link available!',
      'failed-to-detect': 'Failed to detect.',
      detecting: 'Detecting',
      'requirement-title':
        '유출된 파일에서 워터마크를 검출하기 위한 최소 요구사항을 확인하세요.',
      'failed-to-request-expert':
        '해당 주문은 전문가 검출 서비스를 요청할 수 없습니다.',
      'failed-due-to-server':
        '서버 오류로 워터마크 검출에 실패했습니다. 다시 시도해 주세요.',
      message: {
        'inprogress-des-1': '처리 중입니다...',
        'inprogress-des-2': '잠시만 기다려 주세요.',
        'undetected-des-1': '워터마크 코드가 검출되지 않았습니다.',
        'undetected-des-2':
          '업로드된 파일에 워터마크 코드가 포함되지 않았거나, 검출 할 수 없는 상태일 수 있습니다.',
        'undetected-des-3':
          '도움이 필요하시면 <0>고객센터</0>에 문의해 주세요.',
      },
    },
  },
  'find-order-number': {
    title: '원본 파일 선택',
    filter: '검색',
    reset: '초기화',
    'select-order-number': '선택한 주문',
    'not-select': '선택 안함 -- --',
    'btn-cancel': '취소',
    'btn-apply': '선택',
    'btn-select': '선택',
    'select-image-title': '목록에서 유출된 콘텐츠의 원본 파일을 선택해 주세요.',
    'no-image': '이미지를 선택해 주세요.',
    'no-audio': '오디오를 선택하세요.',
    'no-document': '페이지를 선택하여 \n미리 확인할 수 있습니다.',
    'selected-alert': '유출된 콘텐츠의 포렌식 워터마크 주문번호를 선택 했어요.',
    'not-selected-alert':
      '유출된 콘텐츠의 포렌식 워터마크 주문번호를 선택해 주세요.',
    'failed-retrieve': '선택한 파일을 불러오지 못했습니다.',
    'download-file': '<0>다운로드</0> 해서 확인해 주세요.',
    result: '전체 %{total}',
    'preview-alert': {
      DOCUMENT: '파일의 5페이지 미리보기입니다.',
    },
    'click-to-preview': 'Click to preview',
    'no-results': '데이터 없음',
    'no-results-des':
      '업로드된 원본 파일이 없거나, 모든 파일이 이미 삭제되었을 수 있습니다',
  },
  'submit-order': {
    title: '주문 완료',
    'order-no': '주문 번호',
    submitted: '제출 일시',
    status: {
      'in-queue': '진행전',
      'in-progress': '작업중',
      completed: '작업 완료',
      detected: '검출됨',
      undetected: '미검출',
      failed: '작업 실패',
    },
    table: {
      'order-no': '워터마킹 주문번호',
      title: '제목',
      'file-name': '파일 이름',
      status: '진행 상태',
      'content-type': '콘텐츠 타입',
      requestor: '요청자',
      'request-date': '요청일',
      image: 'IMAGE',
      video: 'VIDEO',
      audio: 'AUDIO',
      'in-progress': '작업중',
    },
    'view-order-list': '검출요청 목록보기',
  },
  'privacy-model-view-order': {
    list: {
      title: '검출하려는 콘텐츠의 원본을 선택해 주세요.',
    },
    table: {
      'thumbnail-image': '원본 파일',
      'order-no': '주문 번호',
      'content-type': '콘텐츠 타입',
    },
  },
};

export default piracyDetection;
