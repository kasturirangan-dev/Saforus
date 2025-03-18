import { apiGet, apiPatch } from '@web-workspace/shared/api/http-client';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import queryString from 'query-string';
import {
  NotificationStatus,
  NotificationType,
  PageShowNotification,
  RequestNotificationList,
} from './interface';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { formatTzDate } from '@web-workspace/shared/helpers/dates';

export const NOTICES_LIST_QUERY_KEY = {
  SEARCH_NOTICES: 'search-notices',
};

const CREATE_NOTIFICATION = '/api/v1/cs-bo-web-be/notices';

export async function getNotificationList(
  searchParams: Partial<RequestNotificationList>
): Promise<any> {
  const { startTime, endTime, type, status } = searchParams;
  // Convert to start and end time of the day
  // Update tzOffset if have
  const startTimeISO = startTime ? formatTzDate(new Date(startTime), 0) : 'N/A';
  const endTimeISO = endTime
    ? formatTzDate(new Date(endTime), 0, false)
    : 'N/A';

  const noticeType = type === NotificationType.All ? undefined : type;
  const noticeStatus = status === NotificationStatus.All ? undefined : status;
  const param = queryString.stringify({
    ...searchParams,
    startTime: startTimeISO,
    endTime: endTimeISO,
    type: noticeType,
    status: noticeStatus,
    updatedBy: undefined, // set to undefied bc no api for this yet
  });

  const apiUrl = `${CREATE_NOTIFICATION}?${param}`;
  const response = await apiGet({ url: apiUrl });
  if (response.isSuccess) {
    return response.data;
  }
  throw response.data;
}

export async function updateNoticeStatus(
  id: number,
  status: string,
  noticeVersion: string,
  showOnPage: string
) {
  const formData = new FormData();

  let page: string;
  switch (showOnPage) {
    case PageShowNotification.Login:
      page = 'Login';
      break;
    case PageShowNotification.Dashboard:
      page = 'Dashboard';
      break;
    case PageShowNotification.DigitalWatermarking:
      page = 'Digital Watermarking Page';
      break;
    case PageShowNotification.PiracyDetection:
      page = 'Piracy Detection Page';
      break;
    default:
      page = '';
      break;
  }

  let noticeStatus: string
  switch (status) {
    case NotificationStatus.Publish:
      noticeStatus = 'displayed';
      break;
    case NotificationStatus.Hide:
      noticeStatus = 'hidden';
      break;
    default:
      noticeStatus = '';
      break;
  }

  formData.append('status', status);
  formData.append('noticeVersion', noticeVersion);
  const apiUrl = `${CREATE_NOTIFICATION}/${id}`;
  const response = await apiPatch({
    url: apiUrl,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (response.isSuccess) {
    showToast.success(`Notice is successfully ${noticeStatus} on ${page}.`)
    return response.data;
  }
  showToast.warning('Update status failed!');
  throw response.data;
}
