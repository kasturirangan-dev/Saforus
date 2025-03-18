import { apiPost } from '@web-workspace/shared/api/http-client';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import CreateNotificationStore from './store';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { NotificationStatus, PageShowNotification } from './interface';

const CREATE_NOTIFICATION = '/api/v1/cs-bo-web-be/notices';

export async function createNewNotification(): Promise<any> {
  const mainURL = getEnvVar('VITE_API_URL');
  const data = CreateNotificationStore.formData;
  const displayedOn = data?.get('displayedOn');
  let page: string;
  switch (displayedOn) {
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
  const apiUrl = `${mainURL}${CREATE_NOTIFICATION}`;
  const response = await apiPost({
    url: apiUrl,
    data: CreateNotificationStore.formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (response.isSuccess) {
    if (data?.get('status') === NotificationStatus.Publish)
      showToast.success(`Published the Notice to "${page}".`);
    else
      showToast.success(`Created notification successfully.`);
    return response.data;
  }
  throw response.data;
}
