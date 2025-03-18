const watermarking = {
  'page-watermarking': {
    create: {
      title: '디지털 워터마킹 서비스',
      'order-title': '주문서 제목',
      'order-title-placeholder': '제목을 입력해 주세요 (최대 50자까지 입력)',
      'content-type': '콘텐츠 타입 선택',
      'content-type-description':
        '포렌식 워터마킹을 적용할 콘텐츠 타입을 선택하세요.',
      image: '이미지',
      video: '비디오',
      audio: '오디오',
      document: '문서',
      'image-format': '이미지 파일 형식',
      'audio-format': '오디오 파일 형식',
      'video-format': '비디오 파일 형식',
      'recommended-resolution': '권장 해상도',
      'recommended-resolution-description':
        '512x512 픽셀 이상 ( 최소 256x256 부터 가능)',
      'video-frame': '비디오 프레임 레이트',
      'video-frame-description': 'CFR (고정 프레임 레이트) 모드',
      'audio-rate': '오디오 샘플레이트',
      'file-location': '원본 파일 업로드',
      'file-location-description':
        '포렌식 워터마킹을 적용할 원본 파일이 저장된 위치를 선택하세요.',
      'file-location-format':
        '파일 이름은 "영문, 숫자, -, _" 만 포함해 주세요.',
      'file-location-capacity':
        '주문 1건 당 600MB까지 지원합니다. (대용량 파일은 고객센터에 문의해 주세요.)',
      pc: '개인 컴퓨터',
      'cloud-storage': '클라우드 스토리지',
      'presigned-url': '미리 서명된 URL',
      'file-list': '파일 목록 (%{allFiles}개 선택됨, 총 %{selectedFiles}개)',
      'file-list-description':
        '체크박스를 클릭해서 포렌식 워터마킹을 적용할 파일을 선택하세요',
      'set-watermarking-code': '워터마크 코드설정',
      'watermarking-code-description':
        '원본 파일에 삽입될 디지털 워터마크 코드를 1-2000 사이의 숫자로 입력해 주세요',
      'watermarking-code-description-standard':
        '원본에 삽입할 워터마크 코드를 %{startCode}~%{endCode} 사이의 숫자로 입력해 주세요.',
      'watermarking-code-description-standard-ex':
        '예: 1~5를 입력하면 눈에 보이지 않는 코드 1, 2, 3, 4, 5를 포함하는 5개의 파일이 생성됩니다.',
      'watermarking-code-description-trial':
        '원본에 삽입할 워터마크 코드를 %{startCode}~%{endCode} 사이의 숫자로 입력해 주세요.',
      'watermarking-code-description-trial-ex':
        '예: 1~5를 입력하면 눈에 보이지 않는 코드 1, 2, 3, 4, 5를 포함하는 5개의 파일이 생성됩니다.',
      'create-new-order': '새 주문서 생성하기',
      'start-code': '워터마크 시작코드',
      'end-code': '워터마크 종료코드',
      'drop-your-files':
        '포렌식 워터마킹을 적용할 원본 파일을 여기에 놓아주세요',
      'delete-selected': '선택항목삭제',
      'browse-files': '파일목록 불러오기',
      'from-your-computer': '내 컴퓨터에서',
      'site-credential': '사이트와 자격 증명서',
      'site-credential-description':
        '포렌식 워터마킹을 신청할 사이트와 자격증명서를 선택하세요.',
      message: {
        'between-1-and-2000': '워터마크 코드는 1에서 2000 사이여야 합니다.',
        '2000-or-less': '워터마크 코드는 2000 이하의 숫자만 가능합니다.',
        'end-code-greater':
          '워터마크 종료코드는 시작코드보다 크거나 같아야 합니다.',
        'file-length': '한 주문당 10개 이하의 파일을 선택해 주세요.',
        'video-length-single': '한 주문당 1개의 비디오 파일을 선택해 주세요.',
        'file-selected-capacity': '주문 1건 당 600MB까지 지원합니다.',
        'file-name-format': '파일 이름은 "영문, 숫자, -, _" 만 포함해 주세요.',
        'file-name-characters': '파일 이름은 200자 이내로 입력해 주세요.',
        'unsupported-file': '디지털 워터마킹을 지원하지 않는 파일 포맷입니다.',
        permission:
          '‘나의 사이트 및 스토리지’ 에 등록된 Access Key와 Secret Key 값을  확인해 주세요.',
        'load-files-failure':
          '입력한 파일경로에서 원본 파일을 불러올 수 없습니다.',
        'create-folder-successful':
          '포렌식 워터마킹 결과파일을 저장하기 위해서, 스토리지에 새로운 폴더를 생성했어요.',
        'please-create-folder': '출력 저장소에 폴더를 만드십시오.',
        'folder-existed': '출력 스토리지에 새로운 폴더를 생성할 수 없숩니다.',
        'need-permission':
          '주문 생성 권한이 없습니다. 팀 마스터에게 권한을 요청해 주세요.',
      },
      'file-location-storage': {
        'see-details': 'See details',
        'input-files': '원본 파일 위치',
        'input-files-description':
          '포렌식 워터마킹을 적용할 콘텐츠 파일이 저장된 스토리지를 선택하세요.',
        'output-files': '결과파일 저장 위치',
        'output-files-description':
          '포렌식 워터마킹이 적용된 결과 파일을 저장할 스토리지를 선택하세요.',
        'add-storage': '+스토리지 추가',
        'input-storage': 'Input Storage',
        'output-storage': 'Output Storage',
        'bucket-name': 'Bucket Name',
        'input-file-path': 'Input File Path',
        'output-file-path': 'Output File Path',
        'load-files': '파일 가져오기',
        'create-folder': '폴더 생성하기',
      },
      'trial-title':
        '%{fullName} 님은 현재 무료평가판 (%{numberOfDay} 일 남음) 이용 중입니다.',
      'trial-description-1':
        '무료 요금제는 파일 1개당 1~10 까지 디지털 워터마크 코드를 넣을수 있어요.',
      'trial-description-2':
        '요금제를 업그레이드하여 프리미엄 기능을 이용할 수 있습니다.',
      'don-show-trial': '하루동안 보지 않음',
      'delete-file-dialog': {
        title: '선택한 파일을 목록에서 삭제하시겠어요?',
        description: '삭제된 파일은 주문서에 포함되지 않습니다.',
        btnCancelText: '취소',
        btnContinueText: '삭제',
      },
      'storage-dialog': {
        title: '워터마크 작업 용량이 부족합니다.',
        description: `작업 가능한 워터마크 용량이 부족합니다. 파일 크기를 수정 \n 하거나 서비스 요금제를 업그레이드하여 더 많은 콘텐츠를 \n 보호하세요.`,
        noSpaceTitle: '워터마크 작업 용량이 초과되었습니다.',
        noSpaceDescription: `작업 가능한 워터마크 용량이 꽉 차서 새 주문을 \n 만들 수 없습니다. 요금제 업그레이드하여 더 많은 콘텐츠를 \n 보호하세요.`,
        currentAvailable: '남은 용량 %{currentAvailable}',
        primaryAction: '다시 시도',
        secondaryAction: '서비스 플랜 보러 가기',
        noSpacePrimaryAction: '서비스 플랜 보러 가기',
        noSpaceSecondaryAction: '닫기',
      },
      'warning-file-length-dialog': {
        title: '업로드 파일 개수를 초과했습니다.',
        description: '불러올 수 있는 파일 최대 개수는 %{length}개입니다.',
        'retry-btn': '다시 시도',
      },
    },
    'submitting-order': {
      title: '주문 확인',
      'order-no-description': '콘텐츠 파일을 확인 후 주문서를 제출해 주세요.',
      'submit-order': '주문서 제출하기',
      message: {
        failed:
          '주문서를 제출할 수 없습니다. 다시 시도 하거나 고객센터로 문의해 주세요.',
        successful: '주문서를 성공적으로 제출했습니다.',
      },
      'error-dialog': {
        title: '알수 없는 오류가 발생했습니다.',
        description: '(오류 번호: %{errorCode})',
      },
    },
    tooltip: {
      'image-title': '더 다양한 파일 형식이 필요한가요?',
      'image-description': '고객 지원 센터로 문의해 주세요.',
      'recommended-resolution': '권장 이미지 해상도란?',
      'recommended-resolution-description':
        '최소 256x256 해상도 이미지부터 워터마크 삽입이 가능합니다. 하지만 삽입된 워터마크의 검출율을 높이기 위해서 가능한 512x512 이상의 고화질 이미지를 사용해 주세요.',
      'video-frame': 'VFR(변동 프레임 레이트)는 지원되지 않아요.',
      'video-frame-description':
        'VFR 을 CFR 형식으로 변환한 후 포렌식 워터마킹을 다시 신청해 주세요.',
      'audio-title': '더 다양한 파일 형식이 필요한가요?',
      'audio-description': '고객 지원 센터로 문의해 주세요.',
      'audio-rate': '44.1 KHz 와 48 KHz ?',
      'audio-rate-description':
        '44.1KHz는 음악에서 사용하는 일반적인 샘플링 주파수이며, 48KHz는 영화에서 사용 됩니다.',
      'video-title': '더 다양한 파일 형식이 필요한가요?',
      'video-description': '고객 지원 센터로 문의해 주세요.',
      'input-path': 'Input File Path?',
      'input-path-description':
        '포렌식 워터마킹을 적용할 원본 내용 파일 이름 또는 경로를 입력하세요.',
      'output-path': 'Output File Path?',
      'output-path-description':
        '완료된 워터마크 파일은 출력 저장소에 새로 생성된  파일 경로 폴더에 저장됩니다.',
    },
    table: {
      'order-no': '주문 번호',
      title: '주문서 제목',
      requester: '요청자',
      summary: '주문 요약',
      format: '파일 형식',
      type: '콘텐츠 타입',
      requested: '요청일',
      'file-link': '다운로드',
      'file-name': '파일 이름',
      'content-type': '파일 형식',
      'file-format': '파일 형식',
      'file-size': '용량',
      'watermark-code': '워터마크 코드',
      supported: '적용 여부',
      status: '진행 상태',
      'no-rows': '포렌식 워터마킹을 적용할 수 있는 파일이 아직 없어요.',
      'service-type': '서비스 타입',
      'expiration-date': '요청일',
      'in-queue': '진행전',
      'in-progress': '작업중',
      completed: '작업 완료',
      failed: '작업 실패',
      'selected-row': '%{total}개 중 %{selected}개 선택됨',
      'selection-restriction': '1회에 10개 파일(동영상만 1개 파일)만 선택 가능',
      share: '공유',
      shared: '공유됨',
      'download-limits': '다운로드 횟수',
      'download-limits-tooltip-header': '다운로드 횟수?',
      'download-limits-tooltip':
        '중복된 공유를 막기 위해 다운로드 횟수를 3번으로 제한합니다.',
      'shared-to': '공유한 이메일',
      image: '이미지',
      video: '비디오',
      audio: '오디오',
      document: '문서',
    },
    'submitted-order': {
      title: '주문 완료',
      'order-no-description': '주문하신 내용을 처리하고 있어요',
      'view-order-list': '주문내역 목록보기',
      'view-order-list-description':
        '주문 목록에서도 진행 상황을 확인할 수 있습니다.',
    },
    'order-no': '주문 번호: %{orderNo}',
    details: '상세 내역',
    'loading-description-1': '주문을 제출 중입니다.',
    'loading-description-2': '잠시만 기다려 주세요.',
    dialog: {
      'change-content-title': '콘텐츠 타입을 %{contentType}로 변경하시나요?',
      'change-content-description':
        '콘텐츠 타입이 변경되면, 주문서 내용이 초기화 됩니다.',
      'files-location-title': '내 컴퓨터에서 원본파일을 가져오시나요?',
      'storage-location-title': '내 스토리지에서 원본파일을 가져오시나요?',
      'url-location-title': 'Presigned URL을 이용하여 원본파일을 가져오시나요?',
      'changed-location-description': '이전에 불러온 파일 목록은 사라집니다.',
      'cancel-order-title': '디지털 워터마크 주문을 취소하시겠습니까?',
      'cancel-order-description': '페이지를 나가면 작성한 주문서는 취소됩니다.',
      'cancel-check-title': '워터마크 주문을 취소합니다.',
      'share-title': '공유하기',
      'share-subtitle':
        '해당 워터마크된 <0>%{fileName}</0> 파일이 아래 이메일 주소로 전달될 겁니다.',
      'share-email-placeholder': '공유하실 이메일을 입력 하세요.',
      'share-email-description': '유효한 이메일 주소를 입력하세요.',
      'share-send': '보내기',
      'email-success': '이메일을 전송했습니다.',
      'email-fail': '이메일 전송을 실패했습니다.',
      'link-expired-title': '공유 링크 유효 기간이 종료되었습니다.',
      'link-expired-description1':
        '이 링크는 일정 시간이 지난 후에 만료됩니다.',
      'link-expired-description2': '링크를 공유한 사람에게 연락 바랍니다.',
    },
    status: {
      'in-progress': '작업중',
      completed: '작업 완료',
      failed: '작업 실패',
      'in-queue': '진행전',
      expired: '파일만료',
    },
  },
  'view-order': {
    title: '디지털 워터마킹 주문내역',
    'title-find-order': '디지털 워터마킹 주문번호 찾기',
    total: '전체 %{total}개 중 %{row}개',
    'search-order-no': '주문 번호 또는 주문서 제목 으로 검색 하세요',
    search: {
      title: '주문내역 검색',
      'service-type': '서비스 유형',
      'detection-type': '검출 모드',
      requester: '요청자',
      requestor: '요청자',
      status: '진행 상태',
      'content-type': '콘텐츠 타입',
      format: '파일 형식',
      'requested-date': '요청일',
      keywords: '검색어',
      'packaging-option': '패키징 선택사항',
    },
    list: {
      title: '검색 결과',
    },
    detail: {
      title: '상세 내역',
      'sub-title':
        '완성된 파일들은 다운로드 만료일 이전에 모두 다운로드 받아 주세요',
      breadcrumb: {
        'forensic-watermarking': '디지털 워터마킹',
        'view-orders': '신청내역',
        details: '주문상세',
      },
    },
  },
  'download-files': {
    'expiry-date': '만료일',
    'expires-on': '다운로드 만료일 %{expiresOn}',
    download: '선택항목 다운로드',
    downloadAll: '파일 다운로드 받기',
    downloadFile: '파일 다운로드',
    selected: '선택됨',
    note: '파일이 만료되기 전에 파일을 다운로드 하거나 공유해 주세요.',
    'share-link-history': '공유 링크 내역',
    breadcrumb: {
      'forensic-watermarking': '포렌식 워터마킹',
      'view-orders': '신청내역',
      details: '주문상세',
      'download-files': '다운로드 파일',
    },
    message: {
      'file-length': '10개 이하의 파일을 선택해 주세요.',
    },
    'download-limit-hit': {
      title: '파일 다운로드 횟수를 초과했습니다.',
      subtitle1: '이 파일에 다시 액세스하려면,',
      subtitle2: '파일을 공유한 사람에게  연락 바랍니다.',
    },
    'download-expired': {
      title: '공유 링크 유효 기간이 종료되었습니다.',
      subtitle1: '다운로드는 일정 시간이 지난 후에 만료됩니다.',
      subtitle2: '파일을 공유한 사람에게 연락 바랍니다.',
      expiredOrder: '다운로드 기간이 만료되었습니다.',
    },
    'share-warning': {
      'first-sentence':
        '파일에 삽입된 워터마크 코드의 고유성과 보안을 유지하기 위해 여러 사람에게 같은 파일을 공유하지 마세요.',
      'second-sentence':
        '파일의 고유성이 떨어져 유출된 경우 유출자를 찾기 어려울 수 있습니다.',
      'third-sentence':
        '다른 사람에게 공유된 파일은 다운로드 받을 수 없습니다.',
    },
  },
};

export default watermarking;
