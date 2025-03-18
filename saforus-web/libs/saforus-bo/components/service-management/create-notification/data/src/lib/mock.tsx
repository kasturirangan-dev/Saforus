import { PageShowNotification } from './interface';

export function mockNotificationType(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          label: 'Notice',
          value: 'NOTICE',
        },
        {
          id: 2,
          label: 'Event',
          value: 'EVENT',
        },
      ];
      // Resolve the promise with the mock data
      const response = {
        mess: 'success',
        notificationData: data,
      };
      resolve(response);
    }, 0);
  });
}

export function mockPageShow(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          label: 'Log in Page',
          value: PageShowNotification.Login,
        },
        {
          id: 2,
          label: 'Dashboard',
          value: PageShowNotification.Dashboard,
        },
        {
          id: 3,
          label: 'Digital Watermarking Page',
          value: PageShowNotification.DigitalWatermarking,
        },
        {
          id: 4,
          label: 'Piracy Detection Page',
          value: PageShowNotification.PiracyDetection,
        },
      ];
      // Resolve the promise with the mock data
      const response = {
        mess: 'success',
        notificationData: data,
      };
      resolve(response);
    }, 1000);
  });
}

// id: string | number;
// type: NotificationType;
// summary: string;
// title: string;
// titleInEnglish: string;
// titleInKorean: string;
// imgFile: ImageFile | null;
// isDoNotViewButtonShow: boolean;
// isBannerShow: boolean;
// description: string;
// descriptionInEnglish: string;
// descriptionInKorean: string;
// editor: string | number;
// status: NotificationStatus;
// showOnPage: PageShowNotification | undefined;
// startNotice: Date | number | string;
// endNotice: Date | number | string;
// noticePeriodInvalid: boolean;

export function mockNotifications(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 0,
          noticeId: 123,
          lang: 'EN',
          title: 'some notice title',
          message: 'string',
          bannerUrl: 'https://picsum.photos/450/250',
          createdAt: '2024-01-14T16:43:29.311',
          updatedAt: '2024-01-14T16:43:29.311',
          createdBy: 'string',
          updatedBy: 'string',
          version: 0,
        },
        {
          id: 1,
          noticeId: 123,
          lang: 'KO',
          title: '[Korean version] some notice title',
          message: '[Korean version] string',
          bannerUrl: 'https://picsum.photos/450/250',
          createdAt: '2024-01-14T16:43:29.311',
          updatedAt: '2024-01-14T16:43:29.311',
          createdBy: 'string',
          updatedBy: 'string',
          version: 0,
        },
      ];
      // Resolve the promise with the mock data
      const response = {
        transactionId: null,
        httpStatus: 'OK',
        resultCode: 200,
        resultMsg: 'OK',
        resourceId: null,
        resourceURL: null,
        data: data,
      };
      resolve(response);
    }, 1000);
  });
}
