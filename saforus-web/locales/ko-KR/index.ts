import { sidemenu, gnbmenu } from './menus';
import watermarking from './page-watermarking';
import { myaccount } from './my-account';
import { errmsg } from './error-message';
import multiDrm from './multi-drm';
import { dashboard } from './dashboard';
import piracyDetection from './piracy-detection';
import home from './home';
import teamMember from './team-member';
import help from './help';
import servicePlan from './service-plan';
import { billDetail } from './bill-detail';
import userManagement from './bo-user-management';
import boLogin from './bo-login';
import { calender } from './calender';
import { boSidemenu, boGnbmenu } from './bo-menus';
import orderManagement from './bo-order-management';
import userCredit from './user-credit';
import boSettings from './bo-setting';
import boInquiry from './bo-inquiry';
import serviceManagement from './bo-service-management';
import pageHeader from './page-header';
import apidoc from './api-doc';
import adminDashboard from './bo-admin-dashboard';
import apiConsole from './api-console';
import apiBo from './api-bo';
import apiDocs from './api-docs';
import watermarkingV2 from './page-watermarking-v2';
import detectWatermark from './detect-watermark';
import insertWatermark from './insert-watermark';

const KrTranslation = {
  button: {
    cancel: '취소 하기',
    confirm: '확인',
    save: '저장',
    search: '검색',
    close: '닫기',
    'back-to-start': '처음으로  돌아가기',
    continue: '요청 보내기',
    'reset-continue': '보내기',
    'reset-login': '로그인 하기',
    'log-in': '로그인',
    'back-previous-step': '이전 페이지로 돌아가기',
    register: '가입하기',
    'sign-up': '회원 가입',
    support: '고객 지원',
    delete: '삭제',
    archive: '보관',
    activate: '내 계정 활성화 하기',
    edit: '편집',
    next: '다음',
    prev: '이전',
    'cancel-order': '주문 취소',
    'cancel-order-prev': '닫기',
    invite: '초대하다',
    remove: '삭제하기',
    'see-more': '더 보기',
    submit: '문의하기',
    undo: '닫기',
    'see-all': '모두 보기',
    upgrade: '서비스 플랜 보기',
    update: '업데이트',
    add: '추가',
    no: '아니요',
    leave: '떠나기',
    'hide-a-day': '하루동안 보지 않음',
    ok: '확인',
    'reset-filters': '필터 초기화',
    view: {
      thumbnail: 'Thumbnail View',
      list: 'List View',
    },
  },

  menu: {
    contacts: '콘택트 렌즈',
    home: '집',
    resources: '자원',
    products: '우리의 제품',
    documentation: '선적 서류 비치',
    search: 'Search',
    help: 'Help',
    contact: 'Contact',
  },
  'tool-tip': {
    'pass-required-title': '안전한 비밀번호를  생성해 주세요.',
    'pass-des':
      '최소 8글자 이상 최대 12글자까지 입력할 수 있어요. 최소 1개의 숫자와, 1개의 특수 문자를 포함해 주세요.',
  },
  'page-not-found': {
    '404-not-found': '404 오류가 발생했어요',
    'page-not-exist': '요청하신 페이지를 가져올 수 없어요.',
    'page-not-exist-description': '회원님께서 요청하신 페이지를 찾지 못햇어요.',
  },
  'page-login': {
    welcome: '로그인',
    'keep-login': '로그인 상태 유지',
    'forgot-pass': '비밀번호를 잊었나요?',
    'api-forgot-pass': '비밀번호를 잊으셨나요?',
    'don-have-account': '아직 세이포러스 회원이 아니신가요? ',
    'contact-us': '문의 하기',
    'google-login': 'Continue with Google',
    'sign-up': '회원가입',
  },
  common: {
    'email-address': '이메일',
    email: '이메일',
    password: '비밀번호',
    'placeholder-email': '이메일을 입력하세요',
    'placeholder-pass': '비밀번호를 입력해주세요',
    'placeholder-email2': '이메일을 입력해 주세요',
    'placeholder-email3': '이메일 주소를 입력하세요.',
    'login-email-placeholder': '이메일 주소를 입력하세요.',
    'login-pass-placeholder': '비밀번호를 입력하세요.',
    loading: '로드중...',
    notification: '공고',
    'copy-success': '클립보드에 복사되었습니다!',
    'file-upload': {
      'drop-file': '파일을 드래그 하거나 여기에 첨부하세요.',
      'browse-file': '<0>내 컴퓨터</0>에서 불러오기',
      'drop-here': '여기에 파일을 놓아주세요',
      error: '파일 업로드에 실패했습니다. 다시 시도해주세요.',
    },
    'image-preview': '이미지 미리보기',
    preview: '이미지 미리보기',
    'content-type': {
      image: '이미지',
      video: '비디오',
      audio: '오디오',
      document: '문서',
    },
    'order-status': {
      'in-progress': '작업중',
      completed: '작업 완료',
      failed: '작업 실패',
      'in-queue': '진행전',
      expired: '파일만료',
      detected: '검출됨',
      undetected: '미검출',
      processed: '처리 완료',
    },
    'active-status': {
      active: '활성화',
      inactive: '비활성',
    },
    'password-requirements': {
      title: '안전한 비밀번호를 입력해 주세요.',
      '8-characters': '최소 8글자 이상',
      '1-number': '최소 1개의 숫자 포함',
      '1-uppercase': '최소 1개의 대문자와 소문자 포함',
      '1-symbol': '최소 1개의 특수문자 포함',
    },
    next: '다음',
    previous: '이전',
    total: '전체 %{total}',
    selected: '%{total}개 선택됨',
    notice: '공지',
    event: 'Event',
    'no-list': '목록이 없습니다.',
    'no-results': 'No results found',
    'read-more': '자세히보기',
    'no-list-title': '요청된 주문이 없습니다.',
    'no-list-description': '주문을 생성하면 데이터가 업데이트 됩니다.',
    'watermarking-order': '워터마킹 주문',
    'detection-order': '워터마크 검출 주문',
    'no-list-title-list': '주문이 없습니다.',
    'no-list-description-list': '을 시작해 보세요!',
    'cancel-title': '취소하시겠습니까?',
    'cancel-description':
      '나가시면 변경 사항이 저장되지 않습니다. \n 그래도 진행하시겠습니까?',
  },
  'page-register': {
    'your-name': '이름',
    'placeholder-companyname': '회사 이름을 입력해 주세요',
    'placeholder-confirm-pass': '비밀번호를 다시 입력해 주세요',
    'confirm-pass': '비밀번호 확인',
    'company-name': '회사 이름',
    'placeholder-yourname': '이름을 입력해 주세요',
    'country-of-incorporation': '사업 운영 국가',
    'has-account': '세이포러스 계정이 있으신가요?',
    'agree-condition': '서비스 이용약관',
    'agree-policy': '개인정보 수집이용에',
    'more-14': '[필수] 만 14세 이상입니다',
    'join-us': '회원가입',
    'placeholder-pass2': '비밀번호를 입력해 주세요',
    'placeholder-email3': '이메일 주소를 입력해 주세요',
    'placeholder-country': '국가를 선택해 주세요',
    'agree-all': '세이포러스 서비스 전체 약관에 동의',
    'consent-email': '[선택] 혜택 안내 및 뉴스레터 수신에 동의',
    'mobile-number': '전화 번호',
    'placeholder-mobilenumber': '전화 번호를 입력해 주세요',
  },
  'page-reset': {
    'reset-password': '비밀번호 초기화',
    'reset-pass-description': '회원가입에 사용한 이메일을 입력해 주세요',
    'request-reset': '초기화 링크 요청',
    'back-to-login': '로그인 페이지로 돌아가기',
    'resent-email': '비밀번호 재설정 메일 다시 보내기',
    dialog: {
      via: '로',
      'title-reset-email': '비밀번호 재설정 메일을 발송했어요',
      'content-description-1': '비밀번호 재설정 링크는 1시간 이후 만료 됩니다.',
      'content-description-1-1': '지금 바로 메일함을 확인해 주세요.',
      'content-description-2': '메일이 오지 않았다면 스팸함을 확인해 주세요.',
      'contact-support': '고객센터 문의하기',
      'blocked-sending-email':
        '비밀번호 재설정 이메일은하루에 최대 5번까지 발송할 수 있어요.',
      'back-to-reset': '비밀번호 재설정 요청하기',
      'title-reset-email-failed': '로비밀번호 재설정 요청을 처리할 수 없어요',
      'content-failed-description-1':
        'SaForus 회원가입에 사용한 이름과 이메일 주소를 입력하였는지 확인해 주세요.',
      'content-failed-description-2':
        '만약 등록한 이메일과 이름이 기억나지 않는다면, 아래 고객센터 문의하기 버튼을 눌러서 질문을 남겨주세요.',
    },
    'email-resent-successfully': '이메일 재전송 성공!',
  },
  'page-settings': {
    dashboard: '대시 보드',
    'service-usage': '패키징 및 전달 내역',
    'search-orders': '주문서  검색',
    'multi-drm-packaging': '멀티 DRM 패키징',
    'packaging-history': '패키징 작업현황 보기',
    'distribution-service': '배포용 서비스',
    'new-forensic-watermarking': '포렌식 워터마킹 요청',
    'watermarking-history': '워터마킹 작업현황 보기',
    'piracy-detection': '불법 유출 검출',
    'new-request': '신규 검출 요청',
    'detection-report': '검출 결과 보기',
    settings: '서비스 설정',
    'my-sites-storages': '나의 사이트 및 스토리지',
    'multi-drm': 'Multi-DRM 정보 설정',
    'my-account': '계정 관리',
    'streaming-service': '스트리밍 서비스',
  },
  'settings-pages': {
    'error-message': {
      'site-name-required': '필수 입력 값입니다.',
      'url-invalid': 'URL이 잘못되었습니다.',
      'url-required': '필수 입력 값입니다.',
    },
    sites: {
      title: '나의 사이트 및 스토리지',
      'add-site': '사이트 추가하기',
      'empty-list':
        '등록된 사이트가 없습니다.\n<0>사이트 추가하기</0> 버튼을 클릭하고 사이트를 등록하세요.',
    },
    'create-site': {
      title: '사이트 추가하기',
      subtitle: '세이포러스 서비스를 이용하실 사이트 정보를 등록해 주세요',
      'site-name': '사이트 이름',
      'site-url': '사이트 URL',
    },
    'site-detail': {
      'url-label': 'Site URL',
      'site-id-label': 'Site ID',
      'site-key-label': 'Site Key',
      'access-key-label': 'Access Key',
    },
    storage: {
      title: '스토리지 목록',
      'add-storage': '스토리지 추가하기',
      'add-storage-description':
        '콘텐츠를 저장할 수 있는 저장소를 안전하게 등록하려면 여기를 클릭하세요.',
      'empty-list':
        '등록된 스토리지가 없습니다.\n<bold>“스토리지 추가하기”</bold> 버튼을 클릭하고 스토리지를 등록하세요',
      edit: '수정',
      save: '저장',
      cancel: '취소',
      'cancel-add-new': '스토리지 추가를 취소했어요.',
      'add-new-success': '새로운 스토리지를 추가했어요.',
    },
    'delete-site': {
      title: "'%{name}' 사이트 정보를 정말 삭제 하시겠어요?",
      content:
        '사이트를 삭제하면 해당 사이트에서 작업한 서비스 요청기록이 조회되지 않아요. 그리고 사이트에 포함된 스토리지 정보도 모두 삭제되요.',
      'agree-term': '위 내용을 모두 읽고 확인 했어요.',
    },
    'delete-storage': {
      title: "'%{name}'  스토리지 정보를 정말 삭제하시겠어요?",
      content:
        '스토리지를 삭제하면, 이 스토리지를 이용하여 작업한 내역이 조회 되지 않아요. ‘삭제’  대신 ‘보관’ 기능을 사용해 보세요.',
      'agree-term': '위 내용을 모두 읽고 확인 했어요.',
    },
  },
  api: {
    '400': '잘못된 구문으로 인해 서버에서 요청을 이해할 수 없습니다.',
    '404': '요청한 페이지를 사용할 수 없거나 경우에 따라 존재하지 않습니다.',
    '500': '500 내부 서버 오류',
    'unknown-error':
      '이런! 문제가 발생했습니다. 해결하도록 노력하고 있습니다. 나중에 다시 시도해 주세요.',
    'download-file-failed':
      '내부 오류. 잠시 후 다시 시도해 주세요. 문제가 해결이 되지 않는다면 고객센터에 문의해 주세요.',
    login: {
      '401000': '이메일이 올바르지 않습니다. 입력한 이메일을 확인해 주세요.',
      '401005':
        '이메일 혹은 비밀번호가 일치하지 않습니다. 확인 후 다시 시도 해주세요.',
      '401008':
        '계정이 비활성 상태입니다. 계정을 활성화하려면 고객센터에 문의해 주세요.',
      '401010':
        '회원 가입을 완료해 주세요.\n 메일함에서 회원가입 안내 이메일을 열고 ‘이메일 주소 확인하기’ 버튼을 눌러주세요.',
      '401012':
        '계정 이용이 정지되어 로그인을 진행할 수 없습니다. 입력하신 계정으로 로그인 하려면 고객센터에 문의해 주세요.',
      '401013':
        '계정이 삭제되어 로그인을 진행할 수 없습니다. 서비스를 이용하시려면 계정을 새로 생성해 주세요.',
      '401014':
        '로그인 시도 실패가 너무 많아 계정이 24시간 동안 임시 차단되었습니다.\n‘비밀번호 찾기’를 통해 비밀번호를 재설정할 수 있습니다.',
      '501002':
        '[에러 코드: 501002] 사용자 데이터를 저장하지 못했습니다. 문제 해결을 위해 고객센터에 문의해 주세요.',
      '400': '정보가 올바르지 않습니다. 다시 확인해 주세요.',
      '401': '이메일 또는 비밀번호가 맞지 않습니다.',
      '404':
        '등록되지 않은 사용자 계정이에요. 이메일 주소가 맞는지 확인해 주세요. 서비스를 사용하려면 신규 회원가입을 해 주세요.',
      '405':
        '잘못된 비밀번호를 입력했어요. 다시 한번 입력해 주세요.\n 비밀번호가 생각나지 않으면, ‘비밀번호 찾기’를 선택해 주세요.',
      '406':
        '비밀번호를 5회 이상 잘못 입력했어요. ‘비밀번호 찾기’를 눌러서 비밀번호를 재 설정해 주세요.',
      '423': '계정이 잠겼습니다.',
      unregistered: '가입되어 있지 않은 계정입니다. 회원가입을 진행해주세요.',
      CSA11111:
        '로그인 시도 실패가 너무 많아 계정이 24시간 동안 임시 차단되었습니다.\n‘비밀번호 찾기’를 통해 비밀번호를 재설정할 수 있습니다.',
    },
    signup: {
      '400':
        '입력하신 정보가 올바르지 않습니다. 입력하신 정보를 확인해 주세요.',
      '401000':
        '입력하신 정보가 올바르지 않습니다. 입력하신 정보를 확인해 주세요.',
      '403': '이미 사용 중인 이메일입니다. 다른 이메일로 가입해 주세요.',
      '401004': '이미 사용 중인 이메일입니다. 다른 이메일로 가입해 주세요.',
      '501002':
        '[에러 코드: 501002] 사용자 데이터를 저장하지 못했습니다. 문제 해결을 위해 고객센터에 문의해 주세요.',
    },
    'reset-password': {
      '401017': '시도 횟수를 초과했습니다. 24시간 후에 다시 시도해 주세요.',
      '401008':
        '계정이 비활성 상태입니다. 계정을 활성화하려면 고객센터에 문의해 주세요.',
      '401010':
        '회원 가입을 완료해 주세요. 메일함에서 회원가입 안내 이메일을 열고 ‘이메일 주소 확인하기’ 버튼을 눌러주세요.',
      '401012':
        '계정 이용이 정지된 상태입니다. 계정을 활성화하려면 고객센터에 문의해 주세요.',
      '401013':
        '계정이 삭제되어 비밀번호를 설정할 수 없습니다. 서비스를 이용하시려면 계정을 새로 생성해 주세요.',
      '401016': '시도 횟수를 초과했습니다. 24시간 후에 다시 시도해 주세요.',
      '401018':
        '[에러 코드: 401018 잘못된 요청] JWT (JSON Web Token) 값이 존재하지 않습니다.',
      '401019':
        '[에러코드: 401019] 엑세스 토큰이 만료되었거나, 변경되었습니다.',
      '401020': '사용자를 찾을 수 없습니다. 새로 계정을 가입해 주세요.',
      '401021': '[에러 코드: 401021 잘못된 요청] 유효하지 않는 토큰입니다.',
      '401022':
        '[에러 코드: 401022] 계정 정보를 찾을 수 없습니다. 문제 해결을 위해 고객센터에 문의해 주세요.',
      '401023':
        '계정이 활성화 상태여야 비밀번호를 재 설정 할 수 있습니다. 가입한 이메일의 메일함을 확인하고 계정을 활성화해 주세요.',
      '401024':
        '[에러 코드: 401024] 계정 정보가 업데이트 되었습니다. 다시 로그인을 시도해주세요. 문제가 해결이 되지 않는다면 고객센터에 문의해 주세요',
      '501002':
        '[에러 코드: 501002] 사용자 데이터를 저장하지 못했습니다. 문제 해결을 위해 고객센터에 문의해 주세요.',
      '400': '정보가 올바르지 않습니다. 다시 확인해 주세요.',
      '404':
        '등록되지 않은 사용자 계정이에요. 이메일 주소가 맞는지 확인해 주세요. 서비스를 사용하려면 신규 회원가입을 해 주세요.',
      '406': '일일 최대 요청 수를 초과했습니다.',
      '423': '계정이 잠겼습니다.',
      CSA1100: `등록되지 않은 사용자 계정이에요. 이메일 주소가 맞는지 확인해 주세요.\n서비스를 사용하려면 신규 회원가입을 해 주세요.`,
    },
    'new-password': {
      '401000': '이메일이 올바르지 않습니다. 입력한 이메일을 확인해 주세요.',
      '401008':
        '계정이 비활성 상태입니다. 계정을 활성화하려면 고객센터에 문의해 주세요.',
      '401010':
        '계정이 활성화 상태여야 비밀번호를 재 설정 할 수 있습니다. 가입한 이메일의 메일함을 확인하고 계정을 활성화해 주세요.',
      '401012':
        '계정 이용이 정지된 상태입니다. 계정을 활성화하려면 고객센터에 문의해 주세요.',
      '401013':
        '계정이 삭제되어 비밀번호를 설정할 수 없습니다. 서비스를 이용하시려면 계정을 새로 생성해 주세요.',
      '401016': '시도 횟수를 초과했습니다. 24시간 후에 다시 시도해 주세요.',
      '401018':
        '[에러 코드: 401018 잘못된 요청] JWT (JSON Web Token) 값이 존재하지 않습니다.',
      '401019':
        '[에러코드: 401019] 엑세스 토큰이 만료되었거나, 변경되었습니다.',
      '401020': '사용자를 찾을 수 없습니다. 새로 계정을 가입해 주세요.',
      '401021': '[에러 코드: 401021 잘못된 요청] 유효하지 않는 토큰입니다.',
      '401022':
        '[에러 코드: 401022] 계정 정보를 찾을 수 없습니다. 문제 해결을 위해 고객센터에 문의해 주세요.',
      '401023':
        '계정이 활성화 상태여야 비밀번호를 재 설정 할 수 있습니다. 가입한 이메일의 메일함을 확인하고 계정을 활성화해 주세요.',
      '401024':
        '[에러 코드: 401024] 계정 정보가 업데이트 되었습니다. 다시 로그인을 시도해주세요. 문제가 해결이 되지 않는다면 고객센터에 문의해 주세요',
      '501002':
        '[에러 코드: 501002] 사용자 데이터를 저장하지 못했습니다. 문제 해결을 위해 고객센터에 문의해 주세요.',
      '400': '정보가 올바르지 않습니다. 다시 확인해 주세요.',
      '401': '기간이 만료되었습니다. 새로운 비밀번호 재설정을 요청하세요.',
      '404': '정보가 올바르지 않습니다. 다시 확인해 주세요.',
      '406': '일일 최대 요청 수를 초과했습니다.',
      '423': '계정이 잠겼습니다.',
    },
    activation: {
      '400': '정보가 올바르지 않습니다. 다시 확인해 주세요.',
      '401':
        '회원 가입을 완료해 주세요. 메일함에서 회원가입 안내 이메일을 열고 ‘이메일 주소 확인하기’ 버튼을 눌러주세요.',
      '404':
        '등록되지 않은 사용자 계정이에요. 이메일 주소가 맞는지 확인해 주세요. 서비스를 사용하려면 신규 회원가입을 해 주세요.',
      '423': '계정이 잠겼습니다.',
      '401008':
        '계정이 비활성 상태입니다. 계정을 활성화하려면 고객센터에 문의해 주세요.',
      '401010':
        '활성화 이메일을 보냈습니다. 메일함을 확인하고 계정을 활성화해 주세요.',
      '401018':
        '[에러 코드: 401018 잘못된 요청] JWT (JSON Web Token) 값이 존재하지 않습니다.',
      '401019':
        '[에러코드: 401019] 엑세스 토큰이 만료되었거나, 변경되었습니다.',
      '401020': '사용자를 찾을 수 없습니다. 새로 계정을 가입해 주세요.',
      '401021': '[에러 코드: 401021 잘못된 요청] 유효하지 않는 토큰입니다.',
      '401022':
        '[에러 코드: 401022] 계정 정보를 찾을 수 없습니다. 문제 해결을 위해 고객센터에 문의해 주세요.',
      '401023':
        '계정이 활성화 상태여야 비밀번호를 재 설정 할 수 있습니다. 가입한 이메일의 메일함을 확인하고 계정을 활성화해 주세요.',
      '401024':
        '[에러 코드: 401024] 계정 정보가 업데이트 되었습니다. 다시 로그인을 시도해주세요. 문제가 해결이 되지 않는다면 고객센터에 문의해 주세요',
      '501002':
        '[에러 코드: 501002] 사용자 데이터를 저장하지 못했습니다. 문제 해결을 위해 고객센터에 문의해 주세요.',
    },
    'resend-activation': {
      '401':
        '회원 가입을 완료해 주세요. 메일함에서 회원가입 안내 이메일을 열고 ‘이메일 주소 확인하기’ 버튼을 눌러주세요.',
      '404':
        '등록되지 않은 사용자 계정이에요. 이메일 주소가 맞는지 확인해 주세요. 서비스를 사용하려면 신규 회원가입을 해 주세요.',
      '406': '일일 최대 요청 수를 초과했습니다.',
      '423': '계정이 잠겼습니다.',
      '401001':
        '계정이 이미 활성화 되어있는 상태입니다. 입력하신 이메일로 로그인 후 서비스를 이용해 주세요.',
      '401006':
        '등록되지 않은 계정입니다. 서비스를 사용하려면 회원 가입하고 계정을 생성해 주세요.',
      '401010':
        '활성화 이메일을 보냈습니다. 메일함을 확인하고 계정을 활성화해 주세요.',
      '401012':
        '계정 이용이 정지된 상태입니다. 계정을 활성화하려면 고객센터에 문의해 주세요.',
      '401013':
        '계정이 삭제되어 계정을 활성화할 수 없습니다. 서비스를 이용하시려면 계정을 새로 생성해 주세요.',
      '401015': '시도 횟수를 초과했습니다. 24시간 후에 다시 시도해 주세요.',
      '501002':
        '[에러 코드: 501002] 사용자 데이터를 저장하지 못했습니다. 문제 해결을 위해 고객센터에 문의해 주세요',
    },
    'submit-order-fwm': {
      timeout:
        '파일 업로드 시간이 초과되어 주문 제출에 실패했습니다. 다시 시도해 주세요.',
      'incorrect-format':
        '업로드한 파일이 지원하지 않는 파일 형식입니다. 작업 가능한 파일 형식은 이미지: JPEG; 오디오: MP3, WAV; 비디오: MP4 만 가능하며 업로드한 파일을 확인 후 다시 시도해 주세요. 임의로 파일 형식을 변경한 경우 주문 작업이 제한될 수 있습니다.',
      'key-already-exists':
        '주문 번호가 이미 존재합니다. 파일을 업로드하려면 새 주문을 만드세요.',
    },
  },
  'page-new-password': {
    'reset-account-pass': '비밀번호 재설정',
    'reset-password-email': '계정의 새로운 비밀번호를 설정해 주세요.',
    'new-password': '비밀번호 재설정',
    'confirm-pass': '비밀번호 확인',
    'placeholder-confirm-pass': '비밀번호를 다시 입력해주세요',
    'reset-password': '비밀번호 재설정',
  },
  'page-reset-done': {
    title: '비밀번호 재설정 완료',
    description: '변경한 비밀번호로 로그인 해 주세요.',
  },
  'page-verify-email': {
    title: '회원가입 확인',
    via: '으로',
    'content-description-1': 'SaForus 서비스에 가입했어요.',
    'content-description-2': '아래 버튼을 눌러서 계정을 활성화 해 주세요',
    'expired-title': '회원가입 인증기한 만료',
    'expired-description': '계정을 활성화 할수 없어요.',
    'expired-button': '인증메일 다시 보내기',
    'activation-title': 'Account activation is required',
    'activation-description-1': '으로 이메일을 보냈어요.',
    'activation-description-2':
      '받은편지함에서 회원가입 안내 메일을 열고 3일 이내에 이메일 주소를 인증해 주세요.',
  },
  'page-register-done': {
    via: '로',
    'content-description-1': '회원가입 인증메일을 보냈습니다.',
    'content-description-2': '3일 이내 이메일 인증 후 서비스 이용 가능합니다.',
    title: '회원가입 해주셔서 감사합니다.',
  },
  'page-register-completed': {
    title: '회원가입 완료!',
    description1: '등록 절차가 완료되었습니다.',
    description2: '지금 로그인할 수 있어요.',
  },
  'error-message': errmsg,
  'expired-dialog': {
    title: '세션이 만료 되었어요.',
    body: 'Saforus 서비스를 계속 이용 하려면 다시 로그인 해 주세요.',
    button: '로그인',
  },
  'inactive-dialog': {
    title: '장시간 미사용으로 서비스 접속이 끊어집니다',
    description: '%{remain}초 후 로그아웃 예정이에요.',
    'button-stay': '로그인 유지',
    'button-logout': '로그아웃하기',
  },
  'session-timeout': {
    title: '로그인 후 24시간이 지나서 보안을 위해 자동으로 세션이 만료됩니다.',
    description: '서비스를 계속 이용하시려면 다시 로그인 해 주세요. ',
    'button-login': '로그인하기',
  },
  'logout-confirm': {
    title: '로그아웃',
    description: '로그아웃 하시겠습니까?',
    'button-logout': '로그아웃',
  },
  'announcement-dialog': {
    title: '세이포러스 서비스 신규 오픈 및 베타서비스 종료 \n 안내',
    greeting: '안녕하세요! 세이포러스(SaForus)입니다. ',
    description1:
      '세이포러스 서비스가 새롭게 오픈됩니다. 기존에 저장된 계정 \n정보와 데이터는 모두 삭제될 예정이오니',
    date: '3월 4일(화)',
    description2:
      '런칭 이후 신규회원 \n으로 가입하시어 새로운 계정을 통해 서비스를 이용해 주시길 부탁드립니다.',
    apology:
      '불편을 드리는점 양해 부탁드리며, 더욱 좋은 서비스로 보답하겠습니다.',
    regards: '감사합니다.',
    button: {
      dontshowtoday: '오늘 하루 보지 않기',
      remindmelater: '다음 보기',
    },
  },
  'redirection-dialog': {
    title: '로그인 필요합니다!',
    description: '이 기능을 사용하려면 로그인이 필요합니다.\n진행하시겠습니까?',
    button: {
      continue: '계속하기',
      cancel: '취소',
    },
  },
  apidoc,
  sidemenu,
  gnbmenu,
  ...watermarking,
  ...watermarkingV2,
  myaccount,
  multiDrm,
  dashboard,
  ...piracyDetection,
  home,
  help,
  billDetail,
  servicePlan,
  ...teamMember,
  userManagement,
  boLogin,
  ...calender,
  boSidemenu,
  boGnbmenu,
  orderManagement,
  userCredit,
  boSettings,
  boInquiry,
  serviceManagement,
  pageHeader,
  adminDashboard,
  ...apiConsole,
  ...apiBo,
  ...apiDocs,
};

export default KrTranslation;
