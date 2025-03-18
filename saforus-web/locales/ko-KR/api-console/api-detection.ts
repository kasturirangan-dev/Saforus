const apiDetection = {
  create: {
    title: '워터마크 검출',
    description:
      '유출된 파일로부터 워터마크 코드를 분석하여 유출자를 추적할 수 있습니다.',
    'drop-file-text': '워터마크 검출할 파일을 첨부하세요.',
    'browse-file-text':
      '파일을 여기로 드래그 하거나 <0>내 컴퓨터에서</0> 불러오세요.',
    'request-detection': '검출 요청하기',
    loading: '처리중입니다...',
    success: '요청했습니다!',
    failed: '알 수 없는 오류가 발생했습니다.',
    errorCode: '오류: %{code}',
    'try-again': '다시 시도해주세요!',
  },
  'order-detail': {
    title: '워터마크 검출 내역',
    description:
      '유출된 파일로부터 워터마크 코드를 분석하여 유출자를 추적할 수 있습니다.',
    'order-file-title': '워터마크 검출 내역 상세',
    'order-file-description':
      '유출된 파일로부터 워터마크 코드를 분석하여 유출자를 추적할 수 있습니다.',
    'order-number': '주문 번호',
    'requested-date': '요청일',
    'requested-file': '요청 파일',
    status: '작업 상태',
    'file-number': '요청 파일 번호',
    'process-date': '처리일',
    'detection-result': '워터마크 검출결과',
    'watermark-description': '워터마크 설명',
    'created-date': '생성 일시',
    inprogress: '처리 중입니다...',
    'inprogress-des': '잠시만 기다려 주세요.',
    undetected: '워터마크 코드가 검출되지 않았습니다.',
    'retry-des':
      '워터마크 코드가 검출되지 않았습니다. 해당 파일에 검출 가능한 워터마크가 없거나 원본이 잘못 지정(또는 삭제)되었을 가능성이 있습니다. 원본을 다시 지정하여 시도하시겠습니까?',
    'undetected-des':
      '업로드된 파일에 워터마크 코드가 포함되지 않았거나, 검출 할 수 없는 상태일 수 있습니다. \n 도움이 필요하시면 <0>고객센터</0>에 문의해 주세요.',
    'retry-detection': '다시 시도',
  },
};

export default apiDetection;
