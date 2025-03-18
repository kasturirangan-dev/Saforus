import { apiDelete, apiGet, apiPost } from '@web-workspace/shared/api/http-client';
import { saveAs } from 'file-saver';
import { ResponseInquiries } from './interface';
import queryString from 'query-string';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { TFunction } from 'i18next';

export const INQUIRY_QUERY_KEY = {
  INQUIRY_LIST: 'inquiry_list',
  INQUIRY_DETAIL: 'inquiry_detail',
  CATEGORY: 'category',
  STATUS: 'status',
};


const createInquiryEndpoint = '/api/v1/saforus-web-be/inquiries';
const inquiryDetailEndpoint = '/api/v1/saforus-web-be/inquiries';
const downloadInquiryEndpoint = '/api/v1/saforus-web-be/inquiries/attachments';

export async function fetchInquiries(data: any): Promise<ResponseInquiries> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${inquiryDetailEndpoint}?${searchParams}`,
  });
  return response.data;
}

export async function fetchInquiryDetail(inquiryNo: string): Promise<ResponseInquiries> {
  // const data = { pageNo: 0, elementPerPage: 10 };
  // const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${inquiryDetailEndpoint}/${inquiryNo}`,
  });
  return response.data;
}

export async function cancelInquiry(inquiryId: number): Promise<any> {
  const response = await apiDelete({
    url: `${createInquiryEndpoint}/${inquiryId}`,
    showToast: true,
  });
  return response.data;
}

export async function createInquiry(data: FormData): Promise<any> {
  const response = await apiPost({
    url: `${createInquiryEndpoint}`,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 60000,
    showToast: true,
  });
  return response.data;
}

export async function onDownloadFile(fileId: string, fileName: string, t: TFunction) {
  try {
    const response = await fetch(`${downloadInquiryEndpoint}/${fileId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AuthStore.token || AuthStore.userInfo?.token}`,
      },
    });
    if (response.status === 200) {
      const blob = await response.blob();
      if (blob) saveAs(blob, fileName);
    } else {
      showToast.error(`${t('api.download-file-failed')}`, {
        delay: 0,
      });
      console.error('Error downloading the file:');
    }
    throw new Error('Network response was not ok.');
  } catch (error) {
    console.error('Error downloading the file:', error);
  }
}
