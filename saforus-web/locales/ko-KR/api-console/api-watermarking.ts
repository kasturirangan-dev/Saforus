const apiWatermarking = {
  create: {
    title: '워터마크 삽입',
    description: '콘텐츠에 보이지 않는 워터마크를 삽입하세요.',
    'upload-file': '파일 첨부',
    'drop-file-text': '워터마크 삽입할 파일을 첨부하세요.',
    'browse-file-text':
      '파일을 여기로 드래그 하거나 내 <0>컴퓨터</0>에서 불러오세요.',
    'insert-watermark': '워터마크 삽입',
    watermark: {
      description: '워터마크 설명',
      placeholder: '해당 워터마크에 대한 설명',
      limit: '동일한 주문에 최대 10개의 워터마크를 생성할 수 있습니다.',
      'description-tooltip': '워터마크에 대한 설명',
    },
    'submit-order': '요청하기',
    loading: '처리중입니다...',
    success: '요청했습니다!',
    failed: '알 수 없는 오류가 발생했습니다.',
    errorCode: '오류: %{code}',
    'try-again': '다시 시도해주세요!',
  },
  'order-detail': {
    title: '워터마크 삽입 내역',
    description: '콘텐츠에 보이지 않는 워터마크를 삽입하세요.',
    'order-file-title': '워터마크 삽입 내역 상세',
    'order-file-description': '콘텐츠에 보이지 않는 워터마크를 삽입하세요.',
    'order-number': '주문 번호',
    'requested-date': '요청일',
    'original-file': '원본 파일',
    status: '작업 상태',
    'watermarked-files': '워터마크된 파일',
    completed: '작업 완료',
    failed: '작업 실패',
    'file-number': '요청 파일 번호',
    'process-date': '처리일',
    watermark: {
      description: '워터마크 설명',
      'created-date': '생성 일시',
      status: '상태',
      'description-tooltip': '워터마크에 대한 설명',
      'created-date-tooltip': '워터마크 요청을 생성한 일시',
      'status-tooltip': '워터마킹 요청 상태',
    },
  },
};

export default apiWatermarking;
