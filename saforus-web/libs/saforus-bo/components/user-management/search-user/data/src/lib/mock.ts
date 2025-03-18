import { TOption } from '@web-workspace/saforus/common/model';
import {
  ResponseSearchAndList,
  User,
  UserInformation,
  UserStatus,
  UserSubscription,
  UserType,
} from './interface';

export function mockFetchTeamNameOptions(): Promise<TOption[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const options: TOption[] = [
        { label: 'All', value: 'ALL' },
        { label: 'Alpha', value: 'alpha' },
        { label: 'Beta', value: 'beta' },
        { label: 'Gamma', value: 'gamma' },
        { label: 'Delta', value: 'delta' },
      ];
      resolve(options);
    });
  });
}

export function mockFetchSubscriptionOptions(): Promise<TOption[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const options: TOption[] = [
        { label: 'All', value: 'ALL' },
        { label: 'Free', value: 'FREE' },
        { label: 'Standard', value: 'STANDARD' },
        { label: 'Enterprise', value: 'ENTERPRISE' },
      ];
      resolve(options);
    });
  });
}

export function mockFetchUserList(): Promise<ResponseSearchAndList> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create some mock data
      const users: User[] = [
        {
          id: '699',
          email: 'pvnghe@yopmail.com',
          name: 'NGhe',
          type: UserType.Master,
          teamName: null,
          subscription: UserSubscription.Free,
          status: UserStatus.Active,
          joinedDate: '2023-01-01',
        },
        {
          id: '700',
          email: 'pvnghe1@yopmail.com',
          name: 'Nghe one',
          type: UserType.Master,
          teamName: null,
          subscription: UserSubscription.Free,
          status: UserStatus.Active,
          joinedDate: '2023-02-01',
        },
        {
          id: '701',
          email: 'pvnghe2@yopmail.com',
          name: 'Nghe two',
          type: UserType.Viewer,
          teamName: null,
          subscription: null,
          status: UserStatus.Active,
          joinedDate: '2023-03-01',
        },
      ];
      // Resolve the promise with the mock data
      const response = {
        pageNo: 0,
        elementPerPage: 10,
        totalElements: 3,
        totalPages: 1,
        elementList: users,
      };
      resolve(response);
    });
  });
}

export const fetchUserInformation = () => {
  return new Promise((resolve, reject) => {
    // Create a mock user information object with some dummy data
    const userInformation: UserInformation = {
      avatar: '',
      id: 25,
      userName: 'johndoe',
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      mobileNumber: '+1234567890',
      hasSubscribedEmailUpdate: true,
      timeZone: 's.e.-asia',
      timeZoneName: 'Coordinated Universal Time',
      status: 'ACTIVE',
      currentSessionStartedAt: '2023-10-31T02:48:21.000Z',
      countryId: 1,
      countryCode: 1,
      countryShortName: 'US',
      countryName: 'United States of America',
      companyId: 1,
      companyName: 'Example Inc.',
      companyUrl: 'https://example.com',
      teamName: 'Team A',
      teamDescription: 'A team of awesome people',
      teamOwnerName: 'Jane Doe',
      languageCode: 'en',
      teamId: 1,
      teamOwnerEmail: 'janedoe@example.com',
      userRole: 'MASTER',
      subscriptionId: 1,
      subscriptionPlanName: 'Free',
    };
    // Resolve the promise with the mock user information object
    resolve(userInformation);
  });
};
