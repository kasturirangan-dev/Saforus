import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPut,
} from '@web-workspace/shared/api/http-client';
import { ApiResponseData } from '@web-workspace/api-console/common/model';
import { ProfileInfomation } from './interface';

export const QUERY_KEY = {
  MY_ACCOUNT: 'MY_ACCOUNT',
};

const apiKeyEndpoint = '/api/saforus-cs-api-auth/ext/v1/accounts';

export async function getUserDetail(userId: string): Promise<ApiResponseData> {
  const response = await apiGet({
    url: `${apiKeyEndpoint}/${userId}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function deactivateAccount(): Promise<ApiResponseData> {
  const response = await apiPost({
    url: `${apiKeyEndpoint}/deactivate`,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function updateUserInfo(
  userId: string,
  data: Partial<ProfileInfomation>
): Promise<ApiResponseData> {
  const response = await apiPatch({
    url: `${apiKeyEndpoint}/${userId}`,
    data,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function updateUserAvatar(file: File): Promise<any> {
  let fileToUpload = file;
  if (!file.name) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace(/[:.]/g, '-');
    const fileExtension = file.type.split('/')[1];
    const newFileName = `avatar-${formattedDate}.${fileExtension}`;
    fileToUpload = new File([file], newFileName, { type: file.type });
  }

  const formData = new FormData();
  formData.append('file', fileToUpload);
  const response = await apiPut({
    url: `${apiKeyEndpoint}/upload-avatar`,
    data: formData,
    timeout: 10 * 60 * 1000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    showToast: true,
  });

  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function deleteUserAvatar(): Promise<any> {
  const response = await apiDelete({
    url: `${apiKeyEndpoint}/remove-avatar`,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}
