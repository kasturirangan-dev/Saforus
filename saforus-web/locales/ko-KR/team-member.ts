const teamMember = {
  'team-member': {
    'team-member-info': {
      'search-placeholder':
        '팀에 가입한 이메일 또는 이름으로 멤버를 검색해 보세요.',
      'no-team': '팀이 없습니다.',
      'no-team-des-1': '팀을 생성하고 멤버들을 초대하세요.',
      'no-team-des-2': '멤버들의 주문내역을 공유하고 관리할 수 있습니다.',
      'team-details': '팀 상세정보',
      'team-owner': '팀 마스터',
      'team-service-plan': '이용 중인 서비스 플랜',
      description: '팀 설명',
      created: '생성일',
      'search-member': '검색하기',
      role: '권한',
      status: '상태',
      date: '날짜',
      members: '전체 %{total} 명',
      'detail-members': '멤버 (전체 %{total})',
      'invite-member': '멤버 초대하기',
      'remove-members': '멤버 삭제하기',
      'free-plan': '무료 체험 플랜',
      'standard-plan': '스탠다드 플랜',
      'enterprise-plan': '엔터프라이즈 플랜',
    },
    table: {
      email: '이메일',
      name: '이름',
      role: '권한',
      status: '상태',
      joined: '가입일',
      'invited-date': '초대중',
      'expired-date': '초대만료',
      'no-rows': '주문내역이 없습니다.',
    },
    status: {
      joined: '가입함',
      invited: '초대중',
      expired: '초대만료',
      cancelled: '취소 된',
    },
    role: {
      owner: '마스터',
      member: '멤버',
      viewer: '뷰어',
    },
    button: {
      'create-team': '팀 생성하기',
      cancel: '취소',
      continue: '팀 생성하기',
    },
    dialog: {
      'create-team-title': '팀 생성하기',
      'create-team-description': '팀 정보를 입력해 주세요.',
      'invite-member-title': '멤버 초대하기',
      'invite-member-description':
        '초대할 팀원의 이름과 이메일을 입력해 주세요.',
      'remove-team-member-title': '멤버 삭제하기',
      'remove-team-member-description':
        '선택한 멤버 %{size}명을 팀에서 삭제할까요? 초대 중인 유저는 초대 이메일이 만료됩니다.',
      'invite-member-failed':
        '[에러 코드:%{code}] 멤버를 초대 하는데 실패했습니다.',
      'invite-member-failed-nocode': '멤버를 초대 하는데 실패했습니다.',
      'invite-member-failed-exceeded-limit':
        '팀의 최대 인원은 %{quantity}명입니다.',
      'accept-invitation-title': '[팀]의 초대를 받았습니다.',
      'member-of-another-team':
        '초대한 사용자가 다른 팀에 소속되어 초대할 수 없습니다.',
      'accept-invitation-description':
        '팀에 초대에 승인하면 자동으로 팀 서비스 이용 약관을 동의하고, 기업이름, URL, 사업국가 등 계정 정보들이 %{team}정보로 변경됩니다.',
      'confirm-invitation-title': '팀 초대 확인',
      'confirm-invitation-description':
        '%{team} 가입하기를 눌러 팀에 합류할 수 있습니다. \n팀 가입에 원치 않으시면 거절을 누르거나, 무시하세요.',
      'confirm-invitation-accept': '가입하기',
      'confirm-invitation-decline': '거절',

      'accept-policy-checkbox':
        '<strong>[필수]</strong> SaForus의 팀 <0><strong>서비스 이용 약관</strong></0>에 동의합니다.',
    },
    'create-team': {
      'team-name': '팀 이름',
      'team-name-placeholder': '팀 이름을 입력해 주세요.',
      'team-description': '팀 설명',
      'team-description-placeholder': '최대 500글자까지 입력할 수 있습니다.',
    },
    'invite-member': {
      name: '이름',
      'name-placeholder': '이름을 입력해 주세요.',
      email: '이메일',
      'email-placeholder': '이메일을 입력해 주세요.',
      role: '권한',
      'role-placeholder': '권한을 선택해 주세요.',
    },
    'accept-invitation': {
      'accept-invitation-cancel-button': '거절하기',
      'accept-invitation-accept-button': '초대 승인하기',
    },
    'expired-email-view': {
      title: '유효시간 만료',
      heading: '초대 이메일이 만료되었습니다.',
      description:
        '팀에 가입하려면, 팀 마스터에게 초대 이메일을 다시 요청해 주세요.',
      button: '메인페이지로 이동하기',
    },
    message: {
      'create-team-successful': '팀을 성공적으로 생성했어요!',
      'create-team-failure-no-code':
        '팀 생성에 실패했습니다. 문제 해결을 위해 고객센터에 문의해 주세요.',
      'create-team-failure-code':
        '[에러 코드: %{code}] 팀 생성에 실패했습니다. 문제 해결을 위해 고객센터에 문의해 주세요.',
      'update-team-successful': '팀 정보가 업데이트되었습니다.',
      'update-team-failure':
        '팀 정보를 업데이트할 수 없습니다. 고객 지원에 문의하십시오. 어떤 것을 업데이트해야 하는지 설명해 주시겠습니까?',
      'invite-member-successful': '멤버에게 초대 메일을 발송했습니다!',
      'remove-member-successful': '멤버 %{size}명이 삭제되었습니다.',
      'accept-invitation-successful': '%{team} 에 %{role}로 가입되었습니다.',
      'decline-invitation-successful': '팀 가입을 거절했습니다.',
      'invitation-error': {
        expired: '초대 링크가 만료되었습니다.',
        declined: '이전에 거부된 초대입니다.',
        accepted: '초대는 이미 수락되었습니다.',
        'team-deleted':
          '팀이 존재하지 않아서 초대 링크가 더 이상 활성화되지 않았습니다.',
        'not-found':
          '초대를 찾을 수 없거나 볼 권한이 없습니다. 로그인한 계정을 다시 확인해주세요.',
      },
    },
    tooltip: {
      master: {
        content1: '팀의 소유자 및 관리자입니다.',
        content2: '팀원을 초대 하거나 팀에서 내보낼 수 있어요.',
        content3: '팀의 사이트와 스토리지 정보를 구성할 수 있어요.',
        content4: '팀에서 사용하는 요금제 및 결제정보를 관리 합니다.',
      },
      member: {
        content1: '새로운 주문서를 생성하고 제출할 수 있어요.',
        content2: '팀의 주문서를 조회하고 결과를 다운로드 할 수 있어요.',
      },
      viewer: {
        content1: '팀의 주문서를 조회하고 결과를 다운로드 할 수 있어요.',
        content2: '새로운 주문서 제출은 할 수 없어요.',
      },
    },
  },
  'team-detail': {
    title: '팀 상세정보',
    'team-overview': '팀 정보',
    name: '이름',
    owner: '소유자',
    description: '설명',
    'company-name': '회사 이름',
    'company-url': '회사 URL',
    country: '사업 운영 국가',
    'team-service-plan': '이용 중인 서비스 플랜',
    'subscription-on': '%{date} 구독했습니다',
    'subscription-type': '구독 유형',
    change: '변경',
    'delete-team': '팀 삭제하기',
    'team-history-order': '팀 주문내역 (전체%{total})',
    dialog: {
      'change-owner-title': '팀 관리자를 변경하시겠습니까?',
      'change-owner-description-1':
        '팀 관리자는 팀의 서비스 결제 및 구성원을 관리할 수 있는 권한을 가지고 있으며, 팀 관리자가 변경될 경우 위 권한 또한 이용할 수 없습니다.',
      'change-owner-description-2':
        '팀 관리자를 변경하면 자동으로 로그아웃 됩니다.',
      'checkbox-title':
        '위 내용을 확인했으며, ‘%{new_owner}’으로 팀 관리자로 변경합니다.',
      'change-owner-button': '팀 관리자 변경하기',
    },
    'free-plan': '무료 체험 플랜',
  },
  'delete-team': {
    'button-delete': '팀 삭제하기',
    dialog: {
      'remove-team-title': '팀 삭제하기',
      'remove-team-description':
        '팀을 삭제하면 팀에서 주문한 내역들도 같이 삭제되며, 이전 기록은 복구 할 수 없습니다.',
      'confirm-msg-one': 'SaForus 주문 내역을 백업 파일로 다운로드합니다.',
      'confirm-msg-two': '위의 안내를 숙지하고, 팀을 삭제합니다.',
      'confirm-required': '확인이 필요합니다.',
      'btn-cancel': '취소',
      'btn-delete': '팀 삭제하기',
    },
  },
};

export default teamMember;
