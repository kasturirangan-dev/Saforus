import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { CompanyInformationType, TeamInformationType } from './interface';
import AuthStore from '@web-workspace/shared/hooks/use-auth';


export interface ApiResponse {
  isSuccess: boolean;
  data: any;
  message?: string;
}

const MOCK_USER_INFO = {
  loginInformation: {
    avatar: '',
    userName: AuthStore.userInfo?.fullName || 'Guest',
    loginId: AuthStore.userInfo?.email || '',
    mobileNumber: '+1 123-456-7890',
  },
  companyInformation: {
    companyName: 'Example Corp.',
    countryOfIncorporation: 'United States',
    companyUrl: getEnvVar('VITE_BASE_URL'),
    zipPostalCode: '12345',
    streetAddress: '123 Main St',
    city: 'New York',
    stateProvince: 'NY',
  },
  teamInformation: {
    teamName: '__',
    teamOwner: '__',
    teamServicePlan: '__',
    teamDescription: '__',
  },
  emailSubscription: {
    email: 'john.doe@example.com',
    receiveNotification: true,
  },
  languageAndRegion: {
    language: 'Kr',
    timezone: '(GMT+09:00) Seoul',
  },
};

export const mockFetchData = async (): Promise<ApiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isSuccess: true,
        data: MOCK_USER_INFO,
      });
    }, 1000);
  });
};

export const mockUpdateCompanyInformation = async (
  data: CompanyInformationType
): Promise<ApiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isSuccess: true,
        data: {
          ...MOCK_USER_INFO.companyInformation,
          ...data,
        },
      });
    }, 1000);
  });
};

export const mockUpdateTeamInformation = async (
  data: TeamInformationType
): Promise<ApiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isSuccess: true,
        data: {
          ...MOCK_USER_INFO.teamInformation,
          ...data,
        },
      });
    }, 1000);
  });
};
