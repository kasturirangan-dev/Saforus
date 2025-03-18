const apiOrderList = {
  title: '워터마크 삽입/검출 내역',
  search: {
    title: '검색 ',
    reset: '초기화',
    'order-type': '주문 유형',
    format: '파일 형식',
    'request-date': '요청일',
    status: '작업 상태',
    keyword: '키워드',
    'keyword-placeholder': '주문 번호 또는 파일 이름',
    search: '검색',
    channel: '서비스',
  },
  table: {
    WTR: '워터마크',
    PD: '검출',
    'order-type': '주문 유형',
    'order-no': '주문 번호',
    status: '작업 상태',
    'request-date': '요청 일시',
    'original-file': '원본 파일',
    'no-results': '검색 결과가 없습니다',
    'no-results-des-1': '검색어나 필터를 조정해 보세요.',
    'no-results-des-2':
      '<0>워터마크 삽입</0> 또는 <1>워터마크 검출</1>를 사용하여 새 주문을 생성할 수도 있습니다.',
    total: '전체',
    'expired-tooltip': '만료된 주문의 세부 정보를 확인할 수 없습니다.',
  },
  delete: {
    'wtr-title': '워터마킹 내역 삭제',
    'wtr-description':
      '워터마킹 내역을 삭제하면 해당 워터마크는 더이상 검출이 불가하며, 삭제된 데이터는 복구할 수 없습니다.\n삭제하시겠습니까?',
    'pd-title': '검출 내역 삭제',
    'pd-description':
      '삭제된 검출 내역과 데이터는 복구할 수 없습니다.\n삭제하시겠습니까?',
    success: ' The order %{orderName} has been deleted.',
    'btn-cancel': '취소',
    'btn-delete': '삭제',
  },
};

export default apiOrderList;
