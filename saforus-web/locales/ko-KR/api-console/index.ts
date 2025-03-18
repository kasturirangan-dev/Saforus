import { apiDashboard } from './api-dashoard';
import { apiSidemenu, apiTabmenu, apiGnbmenu } from './api-menu';
import { apiKeyManagement } from './api-key-management';
import { apiAccount } from './api-account';
import { apiRegister } from './api-register';
import { apiServicePlan } from './api-myplan';
import apiWatermarking from './api-watermarking';
import apiDetection from './api-detection';
import apiOrderList from './api-order-list';
import { apiPaymentManagement } from './api-payment-management';

const apiConsole = {
  apiSidemenu,
  apiTabmenu,
  apiGnbmenu,
  'api-footer': {
    termsofservice: '서비스 이용 약관',
    privacypolicy: '개인정보 처리 방침',
    contactus: '문의 하기',
    address:
      '세이포러스 SaForus 04615 서울특별시 중구 장충동 퇴계로 286 쌍림빌딩 13층 (주)마크애니',
    contact: 'support@saforus.com',
    company: 'MarkAny Inc',
    allrightsreserved: 'All rights reserved.',
    productBy: '(주)마크애니',
  },
  apiDashboard,
  apiKeyManagement,
  apiAccount,
  apiServicePlan,
  apiRegister,
  'api-file-supported': {
    title: '지원 파일 형식',
    tooltip:
      '워터마킹 및 검출의 정확도와 처리 속도는 파일 크기, 해상\n도, PDF 페이지 수에 따라 달라질 수 있습니다. SaForus는\n 100% 검출을 보장하지 않습니다.',
    'file-size':
      '최대 %{size}의 파일까지 업로드가 가능합니다. 더 큰 용량의 파일을 업로드 하시려면 상위 플랜으로 <0>업그레이드</0> 하세요.',
    'file-size-2':
      '최대 %{size}까지 파일을 업로드할 수 있습니다.도움이 필요하시면 <0>고객센터로</0>로 문의하세요.',
    'file-size-contact': '<0>고객센터로</0> 문의하세요',
    'invalid-file':
      '업로드된 파일이 지원되지 않습니다. 파일 형식이나 파일 크기를 확인하고 다시 시도해 주세요.',
    'invalid-name': `파일명에 특수 문자 (& $ @ = ; / : + , ? { } ^ % \` [ ] " ' < > ~ # |)가 포함된 경우 지원되지 않습니다. 파일명을 수정한 후 다시 시도해 주세요.`,
    table: {
      type: '타입',
      'file-format': '파일 형식',
      'min-res': '최소 해상도',
      'max-res': '최대 해상도',
      watermarking: '워터마크',
      detection: '검출',
    },
  },
  'limit-reached': {
    'storage-title': '저장 공간 초과',
    'storage-desc':
      '저장 공간 사용 한도를 초과하였습니다. 새 요청을 진행하려면 플랜을 업그레이드하거나 사용하지 않는 파일을 삭제하여 공간을 확보하세요',
    'req-title': '웹 요청 한도 초과',
    'req-desc':
      '현재 플랜에서 허용된 최대 파일 요청 횟수를 초과하였습니다. 한도를 늘리려면 플랜을 업그레이드하거나 다음 사용 가능 기간까지 기다려 주세요',
    btn: {
      'free-up': '공간 확보하기',
      'upgrade-plan': '플랜 업그레이드',
      close: '닫기',
    },
  },
  apiWatermarking,
  apiDetection,
  apiOrderList,
  apiPaymentManagement,
};
export default apiConsole;
