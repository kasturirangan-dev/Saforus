const apiAccount = {
  title: '나의 계정 관리',
  description:
    '개인 정보와 계정 설정을 편리하게 관리하세요.',
  'personal-information': {
    title: '개인 정보',
    name: '이름',
    email: '이메일',
    company: '회사명',
    'service-plan': '서비스 플랜',
    phone: '전화 번호'
  },
  'account-information': {
    title: '계정 정보',
    'login-account': '로그인 계정',
    'account-id': '계정 ID',
    'created-date': '회원가입 일시',
  },
  'timezone-settings': '시간대 설정',
  'recent-session': '현재 세션:',
  button: {
    'edit-profile': '정보 수정',
    change: '변경하기',
    'save-changes': '저장',
    deactivate: '비활성화',
    'change-password': '비밀번호 변경',
    logout: '로그아웃',
    'change-passowrd-confirm': '저장',
    cancel: '취소',
  },
  'edit-profile': {
    title: '개인 정보 수정',
    'user-name': '이름',
    'company-name': '회사명',
    'phone-number': '전화 번호'
  },
  'deactivate-account': {
    title: '계정을 비활성화 하시겠습니까?',
    description:
      '서비스 플랜과 모든 데이터는 손실되며 365일 이내에 복구할 수 없습니다.',
    close: '취소',
    yes: '확인',
  },
  'avatar-editor': {
    title: '프로필 이미지',
    'upload-photo': '업로드',
    'update-photo': '업로드',
    save: 'Save',
    success: '프로필 이미지가 성공적으로 업데이트되었습니다!',
    fail: '이미지 업데이트에 실패했습니다. 다시 시도해 주세요!',
    'delete-success': '프로필 삭제가 성공적으로 업데이트되었습니다!',
    'delete-fail': '이미지 삭제에 실패했습니다. 다시 시도해 주세요!',
  },
  'edit-timezone': {
    title: '시간대 설정',
    timezone: '시간대 선택',
    success: '시간대 변경에 성공했습니다.',
    fail: '시간대 변경에 실패했습니다.'
  },
};

export { apiAccount };
