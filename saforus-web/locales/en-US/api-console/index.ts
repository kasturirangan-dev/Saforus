import { apiSidemenu, apiTabmenu, apiGnbmenu } from './api-menu';
import { apiDashboard } from './api-dashoard';
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
    termsofservice: 'Terms of Service',
    privacypolicy: 'Privacy Policy',
    contactus: 'Contact Us',
    address:
      'Saforus - 13F, Ssangrim Building 286 Toegye-Ro, Jung-Gu, 04615 Seoul, Republic Of Korea',
    contact: 'support@saforus.com',
    company: 'MarkAny Inc',
    allrightsreserved: 'All rights reserved.',
    productBy: 'The product by MarkAny Co., Ltd.',
  },
  apiDashboard,
  apiKeyManagement,
  apiAccount,
  apiServicePlan,
  apiRegister,
  'api-file-supported': {
    title: 'Supported Format',
    tooltip:
      'The accuracy and processing time of\n watermarking and detection may vary based on\n file size, resolution, and PDF page count. SaForus\n does not guarantee 100% detection',
    'file-size':
      'You can upload files up to %{size} per file for each order. For larger files, please <0>Upgrade</0> to a higher plan.',
    'file-size-2':
      'You can upload files up to %{size} per file for each order. For any issues, please contact our <0>Help Center</0>',
    'file-size-contact':
      'For further assistance, please contact our <0>Help Center</0>',
    'invalid-file':
      'The uploaded file is not supported. Please check your file format or file size and try again.',
    'invalid-name': `File name with special characters (& $ @ = ; / : + , ? { } ^ % \` [ ] " ' < > ~ # |) is not supported. Please rename the file and try again!`,
    table: {
      type: 'Type',
      "file-format": 'File Format',
      'min-res': 'Min Resolution',
      'max-res': 'Max Resolution',
      watermarking: 'Watermarking',
      detection: 'Detection',
    }
  },
  'limit-reached': {
    'storage-title': 'Storage Limit Reached',
    'storage-desc':
      'You have exceeded your storage usage limit.\nTo proceed with new requests, please upgrade your plan or free up space by deleting unused files',
    'req-title': 'Web Request Limit Reached',
    'req-desc':
      'You have exceeded the maximum number of file requests allowed in your current plan.\nPlease upgrade your plan to increase the limit or wait until the next cycle',
    btn: {
      'free-up': 'Free up space',
      'upgrade-plan': 'Upgrade Plan',
      close: 'Close',
    },
  },
  apiWatermarking,
  apiDetection,
  apiOrderList,
  apiPaymentManagement,
};
export default apiConsole;
