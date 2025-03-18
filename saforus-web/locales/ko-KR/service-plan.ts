const servicePlan = {
  'header-title': '서비스 플랜',
  title: '서비스 플랜과 가격을 비교하고 서비스 구독을 시작해 보세요.',
  subscription: {
    'active-subscription': '서비스 이용중',
    'monthly-usage': '월 사용내역',
    'credit-usage': '크레딧 사용량',
    total: '선불 크레딧',
    used: '현재 사용량',
    balance: '남은 사용량',
    monthly: '월간결제',
    annually: '연간결제',
    'days-remaning': '일 남음',
    '10off': '10% OFF',
    'create-team': '팀 생성',
    'cloud-storage': '클라우드 저장 공간',
    'forensic-watermarking-capacity': '포렌식 워터마킹 서비스 용량',
    'watermark-code': '워터마크 코드',
    'downloads-per-order': '주문서 1건당 결과 다운로드',
    'piracy-detection-pm': '불법 유출 검출 서비스',
    'additional-charge': '추가구매 요금',
    'free-trial': '무료체험',
    standard: '스탠다드',
    enterprise: '기업용',
    'customized-price': '맞춤형 요금제',
    'not-supported': '지원 안함',
    supported: '지원',
    'number-of-downloads': '%{number} 회',
    'number-of-piracy-detection': '월 %{number} 회',
    'expert-detection': '(전문가 검출 지원 안함)',
    '1-expert-detection': '(전문가 검출 월 1회 무료)',
    'download-per-oder-note': '( 1회 추가 500원) ',
    'piracy-detection-note': '( 1회 추가 20만원, 월 4회이상 영업팀 문의 )',
    custom: '협의',
    'custom-pricing': '기업 요구에 따른 맞춤형 요금 설계',
    'invoices-and-billing': '결제 내역 조회',
    'subscribe-success':
      '선택하신 플랜으로 서비스 구독을 시작합니다.\n' +
      '세이포러스를 선택해 주셔서 감사합니다.',
    'subscription-fail':
      '선택하신 플랜으로 서비스 구독을 시작할 수 없습니다. \n' +
      '계속 오류가 발생하면 고객 지원팀에 도움을 요청 하세요.',
    'subscription-payment-fail':
      '[오류 코드 : XXX] 선택하신 플랜으로 서비스 구독을 시작할 수 없습니다. \n' +
      '계속 오류가 발생하면 고객 지원팀에 도움을 요청 하세요. ',
    'subscription-fail-waiting':
      '결제 진행 중입니다. 잠시 후 다시 시도해 주세요',
    'subscription-payment-success':
      '선택하신 플랜으로 서비스 구독을 시작합니다.\n' +
      '세이포러스를 선택해 주셔서 감사합니다.',
    'plan-selected-master': 'Master 계정에서 결제 내역 조회 가능합니다.',
    button: {
      'try-it-now': '바로 시작하기',
      'get-started': '시작하기',
      'switch-yearly': '연간결제로 변경하기',
      'switch-yearly-desc': '*연간결제로 변경하면 10%를 절약할 수 있습니다.',
      'switch-monthly': '월간결제로 변경하기',
      'switch-monthly-desc':
        '*연간결제의 10% 할인이 적용되지 않습니다.',
      'contact-sales': '영업팀 문의하기',
      'request-extension': '기간연장 신청하기',
    },
    dialog: {
      title: '새로운 변경 사항을 적용하려면 로그아웃하세요',
      description: '%{remain}초 후 로그아웃 예정이에요.',
      'button-stay': '로그인 유지',
      'button-logout': '로그아웃 하기',
      're-login-button': '로그인',
      description1: '서비스 무료플랜을 시작합니다.',
      description2: '플랜을 이용하기 위해 다시 로그인 해주세요.',
    },
  },
  'cancel-subscription': {
    'button-cancel': '서비스 구독 취소하기',
    'button-undo': '계속 사용 하기',
    header: '서비스 플랜 구독을 취소 하시겠어요?',
    'content-one':
      '지금 구독을 해지하면 %{Date} 이후 서비스 이용이 제한됩니다. 필요한 모든 자료를 서비스 구독 종료일 전에 직접 백업해 주세요.',
    'content-two':
      '서비스 구독 종료 후 자료를 다운로드 하려면, 고객센터에 문의해 주세요.',
    'confirm-title': '네, 위의 내용을 모두 읽고 이해 했습니다.',
  },
  'user-feedback': {
    header: '고객님의 의견을 듣고 싶어요',
    title:
      '고객님께서 서비스 구독을 해지하는 이유는 무엇 인가요? 더욱 좋은 서비스를 드릴 수 있도록 피드백 남겨주시면 감사하겠습니다. ',
    'reason-one': '서비스를 자주 사용하지 않아서',
    'reason-two': '꼭 필요한 기능들이 없어서',
    'reason-three': '이용 요금이 비싸서',
    'reason-four': '사용 방법이 어려워서 ',
    'reason-five': '서비스 내용이 기대한 것과 달라서',
    'reason-six': '서비스 품질에 불만족해서',
    comment: '추가 의견',
    'textare-placeholder': '여기에 자유롭게 적어 주세요.(최대 500 까지 )',
    note: '여러분의 피드백으로 더 좋은 SaForus를 만들겠습니다.',
  },
};

export default servicePlan;
