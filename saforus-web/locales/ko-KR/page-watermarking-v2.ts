const watermarking = {
  'create-watermarking': {
    title: '디지털 워터마킹',
    description: '콘텐츠에 보이지 않는 워터마크를 삽입하세요.',
    'attack-file': {
      title: '파일 첨부',
      description: '워터마크를 삽입할 파일을 첨부하세요.',
      'drop-file-text': '워터마크 삽입할 파일을 첨부하세요.',
      'browse-file-text':
        '파일을 여기로 드래그 하거나 <0>내 컴퓨터</0>에서 불러오세요.',
      'current-usage': '현재 사용량',
      'invalid-name':
        '파일명에 특수 문자 (& $ @ = ; / : + , ? { } ^ % ` [ ] " \' < > ~ # |)가 포함된 경우 지원되지 않습니다. 파일명을 수정한 후 다시 시도해 주세요.',
      unsupported: '지원되지 않는 파일 형식입니다.',
      oneFileAllowed: '파일은 하나만 첨부할 수 있습니다.',
      'try-again': '다시 시도',
    },
    'file-information': {
      title: '워터마크 삽입',
      'watermark-code': '워터마크 코드',
      'watermark-code-description':
        '각 파일에 고유한 워터마크 코드가 자동 생성되며, 요청이 65,536건을 초과하면 코드가 중복될 수 있습니다.',
      description: '식별값',
      'placeholder-watermark-code':
        '파일 식별값을 입력 하세요 (예: A 업체와 공유).',
      'watermark-code-limit': '워터마크가 삽입된 파일이 생성됩니다.',
    },
    supported: {
      title: '지원 파일 형식',
      'file-size':
        '워터마크 생성 1건 당 최대 600MB까지 지원합니다. 대용량 파일은 <0>고객센터</0>로 문의해 주세요.',
    },
    'insert-watermark': '요청하기',
    success: '요청했습니다!',
    'failed-title': '알 수 없는 오류가 발생했습니다.',
    'failed-description': '다시 시도해주세요!',
  },
  'view-watermarked-order': {
    title: '워터마크 다운로드',
    description: '콘텐츠에 보이지 않는 워터마크를 삽입하세요.',
    search: {
      title: '검색',
      reset: '초기화',
      format: '파일 형식',
      requested: '요청일',
    },
    table: {
      'order-no': '주문 번호',
      'watermarked-file': '워터마크된 파일',
      format: '파일형식',
      'file-name': '워터마크된 파일',
      requestor: '요청자',
      status: '작업 상태',
      requested: '요청 일시',
      action: '활용',
      'no-results': '요청된 워터마크 주문이 없습니다.',
    },
    'inprogress-message': '워터마크 작업이 진행중입니다. 잠시만 기다려주세요.',
  },

  'watermarked-order-detail': {
    title: '주문상세',
    description: '콘텐츠에 보이지 않는 워터마크를 삽입하세요.',
    'order-number': '주문 번호',
    status: '작업 상태',
    'requested-date': '요청일',

    'file-information': {
      title: '워터마크된 파일',
      'watermark-code': '워터마크 코드',
      description: '식별값',
    },
    share: '공유',
    'share-success': '‘%{email}’ 성공적으로 공유되었습니다',
    'share-fail': '이메일을 보낼 수 없습니다. 다시 시도해 주세요.',
    'download-files': '다운로드',

    'shared-history': {
      title: '공유 내역',
      'watermark-code': '워터마크 코드',
      'file-name': '파일 명',
      'share-email': '공유 받은 자',
      'share-date': '공유 일시',
    },

    'delete-order': {
      title: '주문내역 삭제',
      description:
        '주문내역을 삭제하면, 이 주문서에 포함된 워터마크 검출을 신청할 수 없습니다. 정말 삭제하시겠습니까? \n 모든 파일과 데이터는 삭제되고 복구할 수 없습니다.',
      cancel: '취소',
      delete: '삭제',
    },
    'delete-success': '주문 %{orderNo} 이(가) 삭제되었습니다.',
  },
};

export default watermarking;
