import { ROUTES } from '@web-workspace/saforus/constants/routes';

export const enum NotificationType {
  All = 'ALL',
  Notice = 'NOTICE',
  Event = 'EVENT',
}

export const enum NotificationStatus {
  All = 'ALL',
  Publish = 'PUBLISH',
  Hide = 'HIDE',
}

export const enum PageShowNotification {
  Login = 'LOGIN',
  Dashboard = 'DASHBOARD',
  DigitalWatermarking = 'DIGITAL_WATERMARKING_PAGE',
  PiracyDetection = 'PIRACY_DETECTION_PAGE',
}

export const enum NotificationLang {
  EN = 'EN',
  KO = 'KO',
}

export const enum FormMode {
  Edit = 'EDIT',
  Create = 'CREATE',
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

export type ImageFile = {
  id: string | number;
  file: File;
  preview: string;
  size: number;
  ext: string;
};

export type NotificationForm = {
  id: string | number | undefined;
  type: NotificationType | string;
  summary: string;
  title: string | null | undefined;
  titleInEnglish: string | null | undefined;
  titleInKorean: string | null | undefined;
  imgFile: ImageFile | null;
  isDoNotViewButtonShow: boolean;
  isBannerShow: boolean;
  description: string | null | undefined;
  descriptionInEnglish: string | null | undefined;
  descriptionInKorean: string | null | undefined;
  editor: string | number;
  status: NotificationStatus | undefined;
  showOnPage: PageShowNotification | undefined;
  startNotice: Date | number | string;
  endNotice: Date | number | string;
  noticePeriodInvalid: boolean;
  filePreview: string | null | undefined;
  filePreviewEn: string | null | undefined;
  filePreviewKo: string | null | undefined;
  noticeVersion: number;
  noticeContentVersion: number | null | undefined;
  noticeContentVersionEn: number | null | undefined;
  noticeContentVersionKo: number | null | undefined;
  contentId: string | number | undefined;
  contentEnId: string | number | undefined;
  contentKoId: string | number | undefined;
  updatedAt: Date | number | string;
};

export type RequestCreateNotification = {
  type: NotificationType | string;
  description: string;
  title: string | null | undefined;
  status: NotificationStatus | undefined;
  startTime: Date | number | string;
  endTime: Date | number | string;
  // titleInEnglish: string;
  // titleInKorean: string;
  banner: File | undefined;
  showDoNotViewButton: boolean;
  showBanner: boolean;
  displayedOn: PageShowNotification | undefined;
  message: string | null | undefined;
  // descriptionInEnglish: string;
  // descriptionInKorean: string;
  // editor: string | number;
  lang: NotificationLang;
  noticePeriodInvalid: boolean;
  statusInvalid: boolean;
};

export type Notice = {
  id: number | string | null;
  type: string | null;
  description: string | null;
  status: NotificationStatus | undefined;
  startTime: string | null;
  endTime: string | null;
  showDoNotViewButton: boolean;
  showBanner: boolean;
  displayedOn: string | null;
  langs: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  version: number;
};

export type Content = {
  id: string | number | undefined;
  noticeId: number | null;
  lang: NotificationLang | null;
  title: string | null;
  message: string | null;
  bannerUrl: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  version: number | null;
};

export type ResponseGetNotificationContent = {
  transactionId: string | null;
  httpStatus: string | null;
  resultCode: number;
  resultMsg: string | null;
  resourceId: string | null;
  resourceURL: string | null;
  data: Content[];
};

export type ResponseGetNotificationInfor = {
  transactionId: string | null;
  httpStatus: string | null;
  resultCode: number;
  resultMsg: string | null;
  resourceId: string | null;
  resourceURL: string | null;
  data: any;
};
