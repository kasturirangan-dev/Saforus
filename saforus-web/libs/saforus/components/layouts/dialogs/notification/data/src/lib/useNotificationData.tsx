import { useQuery } from 'react-query';
import { useSnapshot } from 'valtio';
import NotificationStore from './store';
import { getNotification } from './api';
import i18next from 'i18next';
import { NotificationType, ResponseNotificationInformation } from './interface';

export function useNotificationData() {
  const { setNotificationInfor, currentPage } = useSnapshot(NotificationStore);
  const { isLoading } = useQuery<unknown, Error, any>({
    queryKey: ['Notification', currentPage, i18next.language],
    queryFn: () => {
      if (currentPage) {
        return getNotification(currentPage);
      }
      return null;
    },
    onSuccess: (response: ResponseNotificationInformation) => {
      if (response) {
        const dataResponse = response.data[0];
        if (dataResponse) {
          const result = {
            type: dataResponse.type,
            title: dataResponse.title,
            imageSrc: dataResponse.bannerUrl,
            description: dataResponse.message,
            isShowBanner: dataResponse.showBanner,
            isHideAvailable: dataResponse.showDoNotViewButton,
            showOnPage: dataResponse.displayedOn,
          };
          setNotificationInfor(result);
        } else {
          // This is used when noti does not have full lang support.
          // To see the notification, you must switch to the supported notification language.
          // If you want a notification with an unsupported language to be displayed in a
          // supported language, remove this section
          const result = {
            type: NotificationType.Notice,
            title: '',
            imageSrc: '',
            description: '',
            isShowBanner: false,
            isHideAvailable: false,
            showOnPage: undefined,
          };
          setNotificationInfor(result);
        }
      }
    },
    retry: false,
  });

  return {
    loading: isLoading,
  };
}
