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

export type NotificationLang = {
  English: boolean;
  Korea: boolean;
};

export const enum PageShowNotification {
  Login = 'LOGIN',
  Dashboard = 'DASHBOARD',
  DigitalWatermarking = 'DIGITAL_WATERMARKING_PAGE',
  PiracyDetection = 'PIRACY_DETECTION_PAGE',
}

export const enum PageInWord {
  Login = 'Login',
  Dashboard = 'Dashboard',
  DigitalWatermarking = 'Digital Watermarking Page',
  PiracyDetection = 'Piracy Detection',
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

/* notice example
// "id": 0,
// "type": "NOTICE",
// "description": "string",
// "status": "PUBLISH",
// "startTime": "2024-01-14T16:11:55.401",
// "endTime": "2024-01-14T16:11:55.401",
// "showDoNotViewButton": true,
// "showBanner": true,
// "displayedOn": "LOGIN",
// "langs": "string",
// "createdAt": "2024-01-14T16:11:55.401",
// "updatedAt": "2024-01-14T16:11:55.401",
// "createdBy": "string",
// "updatedBy": "string",
// "version": 0
*/

export type Notification = {
  id: string | number;
  type: NotificationType;
  description: string;
  status: NotificationStatus;
  startTime: Date | string;
  endTime: Date | string;
  showDoNotViewButton: boolean;
  showBanner: boolean;
  displayedOn: string;
  title: string;
  langs: string;
  updatedBy: string;
};

export interface RequestNotificationList {
  type: string;
  updatedBy: number;
  status: string;
  startTime: number | Date;
  endTime: number | Date;
  sortBy: string;
  sortOrder: string;
  pageNo: number;
  elementPerPage: number;
}

/* 
- type - Optional, the notice type to filter, if not specified then no filter will be applied on this field.
- updatedBy - Optional, the editor identifier to filter, if not specified then no filter will be applied on this field.
- status - Optional, the notice status to filter, if not specified then no filter will be applied on this field.
- startTime - Mandatory, the lower bound date time to filter on the notice start time.
- endTime - Mandatory, the upper bound date time to filter on the notice start time.
- sortBy - Optional, the field to sort by. The supported values are:
  +TYPE
  +STATUS
  +DISPLAYED_ON
  +START_TIME (default)
- sortOrder - Optional, the order to sort. The supported values are:
  +ASC
  +DESC (default)
- pageNo - Optional, Result page number, should start from 0(default), max 50.
- elementPerPage - Optional, Number of elements per page, default to 10, min 5, max 100.
*/

export const enum TableFieldKey {
  id = 'id',
  type = 'type',
  description = 'description',
  status = 'status',
  startTime = 'startTime',
  endTime = 'endTime',
  showDoNotViewButton = 'showDoNotViewButton',
  showBanner = 'showBanner',
  displayedOn = 'displayedOn',
  title = 'title',
  langs = 'langs',
  updatedBy = 'updatedBy',
}
