const apiKeyManagement = {
  title: 'API 키 관리',
  description:
    'API 키를 손쉽게 관리할 수 있습니다.\n각 애플리케이션에 맞는 API카를 생성하고, 조회하고, 접근 권한을 설정할 수 있습니다.',
  table: {
    'api-keys': 'API 키',
    name: 'API 키 명',
    token: '토큰',
    status: '상태',
    expires: '유효 기한',
    'created-date': '생성 일시',
    action: 'Action',
    'days-left': '%{numberOfDay}일 남음',
    'never-expire': '기한 없음',
  },
  button: {
    create: 'API 키 생성',
    delete: '삭제',
    edit: '수정',
    close: '취소',
    discard: '취소',
    save: '저장',
    cancel: '취소',
    'contact-support': '문의하기',
  },
  form: {
    name: 'API 키 이름',
    'name-placeholder': '키 이름을 입력하세요.',
    status: '상태',
    expriation: '만료 날짜',
    'never-expire': '기한 없음',
  },
  create: {
    title: 'API 키 생성',
    description:
      'API 키의 이름과 만료 날짜를 설정한 후 \n API 키를 생성하세요.',
  },
  edit: {
    title: 'API 키 수정',
    description: 'API 키의 이름,  만료 날짜, 상태를 업데이트 할 수 있습니다.',
  },
  delete: {
    title: 'API 키 삭제하시겠습니까?',
    description:
      '삭제된 API 키는 영구적으로 비활성화되며, \n 복구할 수 없습니다. 삭제하시겠습니까?',
  },
  'reached-limit': {
    title: 'API키 생성 한도에 도달했습니다.',
    description:
      '계정당 최대 10개의 API 키를 사용할 수 있습니다. \n 추가 키가 필요하시면 고객 지원에 문의해 주세요.',
  },
  errmsg: {
    'names-max-length': '최대 30자까지 입력 가능합니다.',
  },
};

export { apiKeyManagement };
