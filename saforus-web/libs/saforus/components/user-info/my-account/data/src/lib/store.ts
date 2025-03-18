import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import {
  CompanyInformationType,
  EmailSubscriptionType,
  LanguageAndRegionType,
  LoginInformationType,
  TeamInformationType,
} from './interface';
import {
  mockUpdateTeamInformation,
  mockUpdateCompanyInformation as updateCompanyInformation,
} from './mock';
import { Country } from './interface';
import { getLocalTimeZone } from '@web-workspace/shared/helpers/dates';
import { getAttachmentByUrl } from '@web-workspace/shared/helpers/files/download-file';

interface MyAccountStoreType {
  incorrectPasswordCount: number;
  setIncorrectPasswordCount: (count: number) => void;
  loginInformation: LoginInformationType;
  setLoginInformation: (data: Partial<LoginInformationType>) => void;
  companyInformation: CompanyInformationType;
  teamInformation: TeamInformationType;
  updateTeamInformation: (data: TeamInformationType) => Promise<{
    isSuccess: boolean;
    data: TeamInformationType;
    message?: string;
  }>;
  setCompanyInformation: (data: Partial<CompanyInformationType>) => void;
  setTeamInformation: (data: Partial<TeamInformationType>) => void;
  updateCompanyInformation: (data: CompanyInformationType) => Promise<{
    isSuccess: boolean;
    data: CompanyInformationType;
    message?: string;
  }>;
  emailSubscription: EmailSubscriptionType;
  setEmailSubscription: (data: Partial<EmailSubscriptionType>) => void;
  languageAndRegion: LanguageAndRegionType;
  setLanguageAndRegion: (data: Partial<LanguageAndRegionType>) => void;
  countries: Country[];
  setCountry: (countries: Country[]) => void;
  setName: (name: string) => void;
  setMobile: (num: string) => void;
  setCompanyName: (name: string) => void;
  setCompanyUrl: (url: string) => void;
  setCountryInfo: (country: Country) => void;
  setSubscribedEmail: (isSub: boolean) => void;
  setSubscribeDate: (date: string) => void;
  setTimeZoneInfo: (data: any) => void;
  setLanguageInfo: (value: string) => void;
}

function createStore() {
  const store: MyAccountStoreType = {
    incorrectPasswordCount: 0,
    setIncorrectPasswordCount(count) {
      MyAccountStore.incorrectPasswordCount = count;
    },
    loginInformation: {
      avatar: '',
      userName: '',
      loginId: '',
      mobileNumber: '',
      companyName: '',
      companyUrl: '',
      countryOfIncorporation: '',
      fullName: '',
      timeZone: '',
      languageCode: '',
      userRole: '',
      currentSessionStartedAt: '',
      emailSubscriptionOnOffAt: '',
    },
    setName: (name: string) => {
      MyAccountStore.loginInformation.fullName = name;
    },
    setMobile: (mobileNumber: string) => {
      MyAccountStore.loginInformation.mobileNumber = mobileNumber;
    },
    countries: [],
    setCountry: (countries) => {
      MyAccountStore.countries = countries;
    },
    setCompanyName: (name: string) => {
      MyAccountStore.loginInformation.companyName = name;
    },
    setCompanyUrl: (url: string) => {
      MyAccountStore.loginInformation.companyUrl = url;
    },
    setSubscribedEmail: (isSub: boolean) => {
      MyAccountStore.loginInformation.hasSubscribedEmailUpdate = isSub;
    },
    setSubscribeDate: (date: string) => {
      MyAccountStore.loginInformation.emailSubscriptionOnOffAt = date;
    },
    setCountryInfo: (country: Country) => {
      MyAccountStore.loginInformation.countryCode = country?.countryCode;
      MyAccountStore.loginInformation.countryName = country?.country;
      MyAccountStore.loginInformation.countryShortName = country?.shortName;
    },
    setLanguageInfo: (value: string) => {
      MyAccountStore.loginInformation.languageCode = value;
    },
    setTimeZoneInfo: (value: any) => {
      MyAccountStore.loginInformation.timeZone = value.value;
      MyAccountStore.loginInformation.timeZoneName = value.label;
    },
    setLoginInformation: async (data) => {
      let teamInfo = {};
      if (data?.userRole === 'PRIVATE_USER') {
        teamInfo = {
          teamDescription: null,
          teamName: null,
          teamOwner: null,
          teamServicePlan: null,
        };
      }

      // Set time zone automatically: User's Local Time Zone.
      const timeZone = data?.timeZone ?? getLocalTimeZone().localTz;

      // Fetch the avatar
      let avatarUrl = '';
      if (data?.fileCloudPath) {
        try {
          const imageUrl = `${data.fileCloudPath}`;
          const result = await getAttachmentByUrl({ url: imageUrl });
          avatarUrl = result as string;
        } catch (error) {
          console.error('Failed to fetch attachment:', error);
        }
      }

      MyAccountStore.loginInformation = {
        ...MyAccountStore.loginInformation,
        ...data,
        ...teamInfo,
        avatar: avatarUrl,
        timeZone: timeZone,
      };
    },
    teamInformation: {
      teamDescription: '',
      teamName: '',
      teamOwner: '',
      teamServicePlan: '',
    },
    companyInformation: {
      companyName: '',
      countryOfIncorporation: '',
      companyUrl: '',
      zipPostalCode: '',
      streetAddress: '',
      city: '',
      stateProvince: '',
    },
    setCompanyInformation: (data) => {
      MyAccountStore.companyInformation = {
        ...MyAccountStore.companyInformation,
        ...data,
      };
    },
    setTeamInformation: (data) => {
      let teamInfo = {};
      if (MyAccountStore.loginInformation.userRole === 'PRIVATE_USER') {
        teamInfo = {
          teamDescription: null,
          teamName: null,
          teamOwner: null,
          teamServicePlan: null,
        };
      }
      MyAccountStore.teamInformation = {
        ...MyAccountStore.teamInformation,
        ...data,
        ...teamInfo,
      };
    },
    emailSubscription: {
      email: '',
      receiveNotification: false,
    },
    updateCompanyInformation: async (
      data: CompanyInformationType
    ): Promise<{
      isSuccess: boolean;
      data: CompanyInformationType;
      message?: string;
    }> => {
      const response = await updateCompanyInformation(data);

      if (response.isSuccess) {
        store.setCompanyInformation(response.data);
      } else {
        console.error(response.message);
      }

      return response;
    },
    updateTeamInformation: async (
      data: TeamInformationType
    ): Promise<{
      isSuccess: boolean;
      data: TeamInformationType;
      message?: string;
    }> => {
      const response = await mockUpdateTeamInformation(data);

      if (response.isSuccess) {
        store.setTeamInformation(response.data);
      } else {
        console.error(response.message);
      }

      return response;
    },

    setEmailSubscription: (data) => {
      MyAccountStore.emailSubscription = {
        ...MyAccountStore.emailSubscription,
        ...data,
      };
    },
    languageAndRegion: {
      language: '',
      timezone: '',
    },
    setLanguageAndRegion: (data) => {
      MyAccountStore.languageAndRegion = {
        ...MyAccountStore.languageAndRegion,
        ...data,
      };
    },
  };

  return store;
}

const MyAccountStore = proxy<MyAccountStoreType>(createStore());

devtools(MyAccountStore, { name: 'MY_ACCOUNT' });

export default MyAccountStore;
