const apiPaymentManagement = {
  title: '결제 관리',
  description: '모든 결제 내역을 한눈에 확인 할 수 있습니다.',
  paymentMethod: '결제 방법',
  paymentHistory: '결제 내역',
  addCard: '새 카드 추가',
  default: '기본',
  setDefault: '기본으로 설정',
  delete: '삭제',
  MONTHLY: '월간',
  YEARLY: '연간',
  table: {
    date: '날짜',
    paymentMethod: '결제 방법',
    status: '현황',
    plan: '요금제',
    billingCycle: '결제 주기',
    amount: '금액',
    invoice: '인보이스',
    'no-list-title': '아직 결제 내역이 없습니다.',
    'no-list-description': '결제 후 결제 내역이 표시 됩니다.',
  },
  status: {
    success: '결제 완료',
    failed: '결제 실패',
  },
  msg: {
    'card-added': '카드 등록이 완료되었습니다.',
    'card-added-failed': '카드 등록이 실패 하였습니다. 다시 시도해주세요.',
    'card-remove': '등록된 카드가 삭제되었습니다.',
    'card-remove-failed': '카드 등록이 실패 하였습니다. 다시 시도해주세요.',
    'card-default-remove':
      '이 카드는 기본 결제 카드로 등록 되어 있습니다. 이 카드를 삭제하기 전에 다른 카드를 기본 결제 카드로 설정해주세요.',
    'card-active-remove':
      '결제될 비용이 남아 있어 카드를 제거할 수 없습니다. 이번 결제 사이클이 종료된 후 삭제해 주세요.',
  },
  removeDialog: {
    title: '카드 삭제',
    description: `이 카드를 결제카드 목록에서 삭제하겠습니까? 삭제하면 되돌릴 수 없습니다.`,
    remove: '삭제',
    cancel: '취소',
  },
};

export { apiPaymentManagement };
