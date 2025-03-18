import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
  downloadFile,
} from '@web-workspace/shared/api/http-client';
import { saveAs } from 'file-saver';
import { Inquiry, ResponseInquiries } from './interface';
import queryString from 'query-string';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import {
  User,
  UserInformation,
  getUserList,
} from '@web-workspace/saforus-bo/components/user-management/search-user/data';

export const INQUIRY_QUERY_KEY = {
  INQUIRY_LIST: 'inquiry_list',
  INQUIRY_DETAIL: 'inquiry_detail',
  CATEGORY: 'category',
  STATUS: 'status',
};

const createInquiryEndpoint = '/api/v1/cs-bo-web-be/inquiries';
const inquiryDetailEndpoint = '/api/v1/cs-bo-web-be/inquiries';
const downloadInquiryEndpoint = '/api/v1/cs-bo-web-be/inquiries/attachments';

export async function fetchInquiries(data: any): Promise<ResponseInquiries> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${inquiryDetailEndpoint}?${searchParams}`,
  });

  // attach more data from user api getUserList()
  const userIds = new Set(
    response?.data?.data?.elementList?.map((item: Inquiry) => item.userId)
  );
  const emailsData = await getUserList({
    userIds: [...userIds].join(','),
  });
  const emailsMap = emailsData?.data?.elementList?.reduce(
    (acc: any, item: UserInformation) => {
      acc[item.id] = {
        email: item.email,
        fullName: item.fullName,
        avatar: item.avatar,
      };
      return acc;
    },
    {}
  );

  response?.data?.data?.elementList?.map((item: Inquiry) => {
    item.email = emailsMap?.[item?.userId]?.email;
    item.fullName = emailsMap?.[item?.userId]?.fullName;
    item.avatar = emailsMap?.[item?.userId]?.avatar;
  });

  return response.data;
}

export async function fetchInquiryDetail(
  inquiryNo: string
): Promise<ResponseInquiries> {
  const response = await apiGet({
    url: `${inquiryDetailEndpoint}/${inquiryNo}`,
  });
  
  // attach more data from user api getUserList()
  const userIds = new Set(
    response?.data?.data?.elementList?.map((item: Inquiry) => item.userId)
  );
  const emailsData = await getUserList({
    userIds: [...userIds].join(','),
  });
  const emailsMap = emailsData?.data?.elementList?.reduce(
    (acc: any, item: UserInformation) => {
      acc[item.id] = {
        email: item.email,
        fullName: item.fullName,
        avatar: item.avatar,
      };
      return acc;
    },
    {}
  );
  response?.data?.data?.elementList?.map((item: Inquiry) => {
    item.email = emailsMap?.[item?.userId]?.email;
    item.fullName = emailsMap?.[item?.userId]?.fullName;
    item.avatar = emailsMap?.[item?.userId]?.avatar;
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

export async function updateInquiry(id: string, data: FormData): Promise<any> {
  const response = await apiPut({
    url: `${createInquiryEndpoint}/${id}`,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 60000,
    showToast: true,
  });
  return response.data;
}

export async function onDownloadFile(fileId: string, fileName: string) {
  return await downloadFile({
    fileUrl: `${downloadInquiryEndpoint}/${fileId}`,
    fileName,
  });
}
