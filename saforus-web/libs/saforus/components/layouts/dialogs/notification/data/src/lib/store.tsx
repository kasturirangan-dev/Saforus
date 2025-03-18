import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import {
  NotificationType,
  NotificationInformation,
  PageShowNotification,
  notiConfig,
} from './interface';

type State = {
  currentPage: PageShowNotification | undefined;
  notificationConfig: notiConfig;
  notificationInfor: NotificationInformation;
  showBanner: boolean;
  showNotification: boolean;
  hideTimeExpired: boolean;
};

type Actions = {
  setCurrentPage: (page: PageShowNotification | undefined) => void;
  setNotificationInfor: (information: any) => void;
  setHideNotificationTime: () => void;
  checkHideNotificationTimeExpired: () => void;
  setShowBanner: (value: boolean) => void;
  setShowNotification: (value: boolean) => void;
};
const now = new Date();
now.setHours(0, 0, 0, 0);
const initialState: State = {
  currentPage: undefined,
  notificationConfig: {
    [PageShowNotification.Login]: {
      showBanner: false,
      showNoti: true,
      hideTime: undefined,
    },
    [PageShowNotification.Dashboard]: {
      showBanner: false,
      showNoti: true,
      hideTime: undefined,
    },
    [PageShowNotification.DigitalWatermarking]: {
      showBanner: false,
      showNoti: true,
      hideTime: undefined,
    },
    [PageShowNotification.PiracyDetection]: {
      showBanner: false,
      showNoti: true,
      hideTime: undefined,
    },
  },
  notificationInfor: {
    type: NotificationType.Notice,
    title: '',
    imageSrc: '',
    description: '',
    isShowBanner: false,
    isHideAvailable: false,
    showOnPage: undefined,
  },
  showBanner: false,
  showNotification: true,
  hideTimeExpired: false,
};

const NotificationStore = proxy<State & Actions>(createStore());

function createStore() {
  const store: State & Actions = {
    ...initialState,
    setCurrentPage(page) {
      NotificationStore.currentPage = page;
      if (NotificationStore.currentPage) {
        NotificationStore.checkHideNotificationTimeExpired();
        const notiProps =
          NotificationStore.notificationConfig[NotificationStore.currentPage];
        NotificationStore.showBanner = notiProps.showBanner;
        NotificationStore.showNotification = notiProps.showNoti;
      }
    },
    setNotificationInfor(information) {
      NotificationStore.notificationInfor = information;
    },
    setHideNotificationTime() {
      const now = new Date();
      now.setHours(23, 59, 59, 999);
      if (NotificationStore.currentPage) {
        const notiProps =
          NotificationStore.notificationConfig[NotificationStore.currentPage];
        notiProps.hideTime = now;
      }
    },
    checkHideNotificationTimeExpired() {
      if (NotificationStore.currentPage) {
        const notiProps =
          NotificationStore.notificationConfig[NotificationStore.currentPage];
        const now = new Date();
        if (notiProps.hideTime) {
          if (now < notiProps.hideTime) {
            NotificationStore.hideTimeExpired = true;
          } else {
            NotificationStore.hideTimeExpired = false;
            notiProps.showBanner = false;
            notiProps.showNoti = true;
            NotificationStore.showNotification = true;
            NotificationStore.showBanner = false;
          }
        } else {
          NotificationStore.hideTimeExpired = false;
        }
      }
    },
    setShowBanner(value) {
      if (NotificationStore.currentPage) {
        const notiProps =
          NotificationStore.notificationConfig[NotificationStore.currentPage];
        notiProps.showBanner = value;
      }
      NotificationStore.showBanner = value;
    },
    setShowNotification(value) {
      if (NotificationStore.currentPage) {
        const notiProps =
          NotificationStore.notificationConfig[NotificationStore.currentPage];
        notiProps.showNoti = value;
      }
      NotificationStore.showNotification = value;
    },
  };
  return store;
}

devtools(NotificationStore, { name: 'NOTIFICATION' });

export default NotificationStore;
