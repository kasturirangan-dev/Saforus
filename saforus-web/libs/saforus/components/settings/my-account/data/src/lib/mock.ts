import { UserInfo } from './interface';

let mockUserInfo: UserInfo = {
  id: '9AM8',
  name: 'Test User',
  photoUrl: '',
  email: 'test@gmail.com',
  phoneNumber: '010-1234-5678',
  companyInfo: {
    id: '10ABM1',
    name: 'Test Company',
    selectedLanguageIndex: 0,
    selectedLanguage: 'KO',
    countryCode: '82',
    country: 'KOREA',
    shortName: 'KR',
    companyUrl: 'https://www.saforus.com',
    zipCodeOrPostCode: '12345',
    streetAddress: '서울시 강남구 테헤란로 427',
    city: '서울시',
    stateOrProvince: '강남구',
    createdAt: new Date(),
  },
  emailSubscriptionEnable: true,
  subscriptionAt: new Date(),
  createdAt: new Date(),
};

export function mockFetchUserInfo(): Promise<UserInfo> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserInfo); // Return a copy of the mockSites list to simulate API response
    }, 1000); // Simulate API delay
  });
}

export function mockUpdateUserInfo(
  siteId: string,
  updatedOverview: Partial<UserInfo>
): Promise<UserInfo> {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockUserInfo = {
        ...mockUserInfo,
        ...updatedOverview,
      };
      resolve(mockUserInfo);
    }, 1000); // Simulate API delay
  });
}
