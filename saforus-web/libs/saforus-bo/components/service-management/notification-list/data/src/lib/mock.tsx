export function mockNotifications(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          type: 'NOTICE',
          description: 'SaForus Web Services Page Address Change Guide',
          langs: 'EN|KO',
          editor: '김민제',
          status: 'PUBLISH',
          displayedOn: 'Dashboard',
          startNotice: '2024-01-03T15:33:16Z',
          endNotice: '2024-01-03T15:33:16Z',
        },
        {
          id: 2,
          type: 'EVENT',
          description: 'Piracy detection',
          langs: 'EN|KO',
          editor: '김민제',
          status: 'HIDE',
          displayedOn: 'Piracy Detection Page',
          startNotice: '2024-01-03T15:33:16Z',
          endNotice: '2024-01-03T15:33:16Z',
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

export function mockNotificationType(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          label: 'All',
          value: 'ALL'
        },
        {
          id: 2,
          label: 'Notice',
          value: 'NOTICE'
        },
        {
          id: 3,
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
    }, 1000);
  });
}

export function mockNotificationStatus(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          label: 'All',
          value: 'ALL'
        },
        {
          id: 2,
          label: 'Publish',
          value: 'PUBLISH'
        },
        {
          id: 3,
          label: 'Hide',
          value: 'HIDE'
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

export function mockNotificationEditor(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          label: 'All',
          value: 'ALL'
        },
        {
          id: 2,
          label: 'Donna (tabc@gmail.com)',
          value: 'tabc@gmail.com'
        },
        {
          id: 3,
          label: 'Donnabc (tabcde@gmail.com)',
          value: 'tabcde@gmail.com'
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
