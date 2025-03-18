import { ROUTES } from '@web-workspace/saforus/constants/routes';

export const enum NotificationType {
  Notice = 'NOTICE',
  Event = 'EVENT',
}

export const enum PageShowNotification {
  Login = 'LOGIN',
  Dashboard = 'DASHBOARD',
  DigitalWatermarking = 'DIGITAL_WATERMARKING_PAGE',
  PiracyDetection = 'PIRACY_DETECTION_PAGE',
}

export const NotificationPage: {
  [key in PageShowNotification]: string;
} = {
  [PageShowNotification.Login]: ROUTES.LOGIN.path,
  [PageShowNotification.Dashboard]: ROUTES.DASHBOARD.PACKAGES_DELIVERY.path,
  [PageShowNotification.DigitalWatermarking]:
    ROUTES.FORENSIC_WATERMARKING.NEW_FORENSIC_WATERMARKING.path,
  [PageShowNotification.PiracyDetection]:
    ROUTES.PIRACY_DETECTION.NEW_REQUEST.path,
};

export type NotificationInformation = {
  type: NotificationType;
  title: string;
  imageSrc: string;
  description: string;
  isShowBanner: boolean;
  isHideAvailable: boolean;
  showOnPage: PageShowNotification | string | undefined;
};

type NotiProps = {
  showBanner: boolean;
  showNoti: boolean;
  hideTime: Date | undefined;
};

// Define a type notiConfig that maps the keys of PageShowNotification to NotiProps
export type notiConfig = {
  [K in PageShowNotification]: NotiProps;
};

export type ResponseNotificationInformation = {
  transactionId: string | null;
  httpStatus: string | null;
  resultCode: number;
  resultMsg: string | null;
  resourceId: string | null;
  resourceURL: string | null;
  data: [
    {
      id: number;
      type: string;
      startTime: string;
      endTime: string;
      showDoNotViewButton: boolean;
      showBanner: boolean;
      displayedOn: string;
      lang: string;
      title: string;
      message: string;
      bannerUrl: string | null;
    }
  ];
};
