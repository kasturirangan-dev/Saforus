const adminDashboard = {
  title: '대시보드',
  filters: {
    date: '기간',
  },
  status: {
    invited: 'Invited',
    active: 'Active',
    suspended: 'Suspended',
    locked: 'Locked',
    hidden: '숨김',
    published: '노출',
  },
  'user-role': {
    owner: 'Master',
    member: 'Member',
    viewer: 'Viewer',
    user: 'User',
  },
  'see-more': '더보기',
  summary: {
    title: '요약',
    users: '사용자',
    wtr: '워터마킹',
    pd: '워터마크 검출',
    notice: '공지 및 이벤트',
    total: '전체',
  },
  'user-overview': {
    title: '사용자',
    email: '이메일',
    name: '이름',
    type: '등급',
    'team-name': '구속 팀',
    subscription: '구독 플랜',
    status: '상태',
    joined: '참여 일시',
  },
  'user-trend': {
    title: '사용자 트렌드',
    description: '%{previous} 년 대비 %{current}년 신규 사용자 수',
  },
};

export default adminDashboard;
