const apiRegister = {
  form: {
    'join-us': 'Join Us!',
    'your-name': '이름',
    email: '이메일',
    password: '비밀번호',
    'confirm-pass': '비밀번호 확인',
    'company-name': '회사 이름',
    'mobile-number': '전화 번호',
    'placeholder-yourname': '이름을 입력해 주세요.',
    'placeholder-email3': '이메일을 입력해 주세요.',
    'placeholder-pass2': '비밀번호를 입력해 주세요.',
    'placeholder-confirm-pass': '비밀번호를 다시 입력해 주세요.',
    'placeholder-companyname': '회사 이름을 입력해 주세요.',
    'has-account': '세이포러스 회원 계정이 있으신가요?',
    'placeholder-mobilenumber': '전화 번호를 입력해 주세요.',
    'agree-all': '세이포러스 서비스 전체 약관에 동의',
    'more-14': '[필수] 만 14세 이상입니다',
    'agree-condition': '서비스 이용약관',
    'agree-policy': '개인정보 수집이용',
    'consent-email': '[선택] 혜택 안내 및 뉴스레터 수신에 동의',
    donthaveaccount: '아직 세이포러스 회원이 아니신가요?',
  },
  errors: {
    'name-start-no-space': '첫 글자는 반드시 문자로 시작해야 합니다.',
    phone: '전화번호를 입력해주세요.',
    'phone-invalid': '유효하지 않은 전화 번호입니다.',
    'confirm-pass-req': '비밀번호를 입력해주세요.',
    'confirm-pass-match': '비밀번호가 맞지 않습니다.',
    'pass-incorrect-format': '비밀번호 형식이 맞지 않습니다.',
    'account-verified':
    '이 활성화 링크는 이미 사용되었을 수 있습니다. 계정으로 로그인해 보세요. 추가 도움이 필요하시면 문의해 주세요',
  },
  'page-register-done': {
    'content-description-1': '회원가입 인증메일을 보냈습니다.',
    'content-description-2':
      '3일 이내 이메일 인증 후 \n 서비스 이용 가능합니다.',
    title: '회원가입 해주셔서 감사합니다.',
  },
  'page-register-completed': {
    title: '회원가입 완료!',
    description1: '등록 절차가 완료되었습니다.',
    description2: '지금 로그인할 수 있어요.',
    'title-expired': '이메일 인증 링크 만료!',
    'expired-description1':
      '인증 링크가 만료되어 계정을 활성화할 수 없습니다.\n 걱정하지 마세요!',
    'expired-description2': '으로 다시 링크를 보내드릴 수 있습니다.',
  },
  'page-verify-email': {
    description: 'SaForus 서비스에  가입했습니다.',
  },
  button: {
    resend: '활성화 링크 다시 보내기',
    login: '로그인',
    'sign-up': '회원가입',
  },
  dialogs: {
    'register-error': {
      title: '오류가 발생했습니다.',
      description:
        '회원가입에 실패했습니다. 다시 시도하거나 고객 선터\n에 문의해 주세요.',
      button: {
        contact: '문의하기',
        'try-again': '다시 시도하기',
      },
    },
  },
};

export { apiRegister };
