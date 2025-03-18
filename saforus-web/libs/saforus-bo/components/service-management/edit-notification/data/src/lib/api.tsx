/* 
Note:
- Notification structure in BE: 1 notice go along with 2 content 
represent for 2 lang is en and ko
                    ------------------Notice----------------
                    |"id": 0,                               |
                    |"type": "NOTICE",                      |
                    |"description": "string",               |
                    |"status": "PUBLISH",                   |
                    |"startTime": "2024-01-14T16:11:55.401",|
                    |"endTime": "2024-01-14T16:11:55.401",  |
                    |"showDoNotViewButton": true,           |
                    |"showBanner": true,                    |
                    |"displayedOn": "LOGIN",                |
                    |"langs": "string",                     |
                    |"createdAt": "2024-01-14T16:11:55.401",|
                    |"updatedAt": "2024-01-14T16:11:55.401",|
                    |"createdBy": "string",                 |
                    |"updatedBy": "string",                 |
                    |"version": 0                           |
                    ----------------------------------------
                                        |(1)
                                        |
                                        V(2)
                    ------------------Content---------------
                    |"id": 0,                               |
                    |"noticeId": 123,                       |
                    |"lang": "EN",                          |
                    |"title": "some notice title",          |
                    |"message": "string",                   |
                    |"bannerUrl": "https://de6nscivdttxy.cloudfront.net/notices/abc.jpg",|
                    |"createdAt": "2024-01-14T16:11:55.401",|
                    |"updatedAt": "2024-01-14T16:11:55.401",|
                    |"createdBy": "string",                 |
                    |"updatedBy": "string",                 |
                    |"version": 0                           |
                    ----------------------------------------
- getNotificationContent is used for get content of a notice. 
Data can contain 1-2 content represent for each content in each lang
- updateNotificationNewContent is used for when a noti just have a 
content for 1 lang when you want to update to have content for other lang
- updateNotificationExistContent is used when you want to make change to a content that already exist
*/
import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
} from '@web-workspace/shared/api/http-client';
import CreateNotificationStore from '@web-workspace/saforus-bo/components/service-management/create-notification/data';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';

const NOTIFICATION_URL = '/api/v1/cs-bo-web-be/notices';

export async function getNotificationContent(
  id: string | undefined
): Promise<any> {
  const notificationId = id;
  if (notificationId) {
    const apiUrl = `${NOTIFICATION_URL}/${notificationId}/notice-contents`;
    const response = await apiGet({
      url: apiUrl,
    });
    if (response.isSuccess) {
      return response.data;
    }
    throw response.data;
  }
  showToast.warning('Field notificationId undefined!');
}

export async function getNotificationInfor(
  id: string | undefined
): Promise<any> {
  const notificationId = id;
  if (notificationId) {
    const apiUrl = `${NOTIFICATION_URL}/${notificationId}`;
    const response = await apiGet({
      url: apiUrl,
    });
    if (response.isSuccess) {
      return response.data;
    }
    throw response.data;
  }
  showToast.warning('Field notificationId undefined!');
}

export async function updateNotificationNewContent(): Promise<any> {
  const notificationId = CreateNotificationStore.notificationForm.id;
  const apiUrl = `${NOTIFICATION_URL}/${notificationId}/notice-contents`;
  if (notificationId) {
    const response = await apiPost({
      url: apiUrl,
      data: CreateNotificationStore.formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.isSuccess) {
      showToast.success(`Update notification successfully.`);
      return response.data;
    }
    throw response.data;
  }
  showToast.warning('Field notificationId undefined!');
}

export async function updateNotificationExistContent(): Promise<any> {
  const notificationId = CreateNotificationStore.notificationForm.id;
  const contentId = CreateNotificationStore.notificationForm.contentId;
  const apiUrl = `${NOTIFICATION_URL}/${notificationId}/notice-contents/${contentId}`;
  if (notificationId) {
    const response = await apiPatch({
      url: apiUrl,
      data: CreateNotificationStore.formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.isSuccess) {
      showToast.success(`Update notification successfully.`);
      return response.data;
    }
    throw response.data;
  }
  showToast.warning('Field notificationId undefined!');
}

export async function deleteNotification(): Promise<any> {
  const notificationId = CreateNotificationStore.notificationForm.id;
  const apiUrl = `${NOTIFICATION_URL}/${notificationId}`;
  if (notificationId) {
    const response = await apiDelete({
      url: apiUrl,
    });
    if (response.isSuccess) {
      showToast.success(`Delete notification successfully.`);
      return response.data;
    }
    throw response.data;
  }
  showToast.warning('Field notificationId undefined!');
}