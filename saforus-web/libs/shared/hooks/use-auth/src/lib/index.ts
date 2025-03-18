import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { isNotEmpty } from '@web-workspace/shared/helpers/strings';
import { TOption } from '@web-workspace/saforus/common/model';
import { SubscriptionPlanDetail } from '@web-workspace/shared/hooks/use-subscription';
import {
  formatedTimezone,
  getLocalTimeZone,
} from '@web-workspace/shared/helpers/dates';
import * as CryptoJS from 'crypto-js';
import jwt_decode from 'jwt-decode';
import { userInfo } from 'os';

export interface SubscriptionPlan {
  id: number;
  serviceType: string | null;
  createdAt: string | null;
}

export interface Team {
  id: number | null;
  name: string;
  teamOwnerId?: string;
  teamOwnerName?: string;
  teamOwnerEmail?: string;
  description: string;
  company?: string | null;
  companyUrl?: string | null;
  teamMemberList?: Member[];
  subscriptionPlan?: SubscriptionPlan | null;
  countryCode?: number;
  country?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  createdBy: string | null;
  isDefaultTeam: boolean;
}

export interface Member {
  teamMemberUserId: string;
  teamId: number | null;
  role: string | null;
  userRole?: string | null;
  approver: string | null;
  status: string | null;
  emailAddress: string;
  fullName: string;
  invitationSentAt: string | null;
  invitationAcceptedAt: string | null;
  invitationExpiredAt: string | null;
  updatedAt: string | null;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  company: string | null;
  countryCode: number;
  country: string | null;
  shortName: string | null;
  token: string;
  teamDetailList: Team[] | null;
  role: string | null | undefined;
  subscriptionPlanStatus: string | null;
  subscriptionPlanDetailList: SubscriptionPlanDetail[] | null;
  timeZone: string | null;
  timeZoneName: string | null;
}

export interface UserMode extends User {
  master: boolean;
  devMode: boolean;
  requesters: TOption[];
}

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  userInfo: UserMode | null;
  setIsLogIn: (value: boolean) => void;
  setUserInfo: (value?: UserMode) => void;
  updateProfile: (value: Partial<User>) => void;
  setDevMode: (value: boolean) => void;
  setUserRole: (value?: string | null) => void;
  isExpired: boolean;
  setIsExpired: (value: boolean) => void;
  timeIdle: number;
  timeBeforeIdle: number;
  numberOfTab: number;
  lastApiTime: string;
  numberOfTabIdle: number;
  isTabIdle: boolean;
  setNumberOfTab: (value: number) => void;
  setLastApiTime: (value: string) => void;
  setNumberOfTabIdle: (value: number) => void;
  setIsTabIdle: () => void;
  isAppIdleWithSingleTab: boolean;
  isAppIdleWithMultipleTab: boolean;
  clearAuthState: () => void;
  token: string | null;
  password: string | null;
  setUserPassword: (value?: string) => void;
  syncUserInfoCookies: () => void;
  getUserObject: () => void;
  timeZone: string | null;
  tzDisplayOffset: number | null; // Offet between local timezone and user's timezone
  syncDisplayTimezone: () => void; // Base on userInfo and token data
  joinTeam: (updateToken: string) => void;
}

const AuthStore = proxy<AuthState>({
  isLoggedIn: false,
  isLoading: true,
  userInfo: null,
  isExpired: false,
  timeIdle: 1000 * 60 * 15 + 30000,
  timeBeforeIdle: 30000,
  lastApiTime: new Date().toISOString(),
  numberOfTab: 0,
  isTabIdle: false,
  token: null,
  password: null,
  numberOfTabIdle: Number(localStorage.getItem('tabCountIdle')) || 0,
  timeZone: '',
  tzDisplayOffset: 0, // Offet between local timezone and user's timezone
  get isAppIdleWithSingleTab() {
    return checkAppIdleWithSingleTab();
  },

  get isAppIdleWithMultipleTab() {
    return checkAppIdleWithMultipleTab();
  },
  setIsLogIn: (value: boolean) => {
    AuthStore.isLoggedIn = value;
  },
  setUserPassword: (value?: string) => {
    const key = getEnvVar('VITE_SAFORUS');
    const hashPwd = CryptoJS.HmacSHA512(value ?? '', key);
    const hashPass = hashPwd.toString(CryptoJS.enc.Hex);
    AuthStore.password = hashPass;
    localStorage.setItem('VITE_SAFORUS', hashPass);
  },
  setUserInfo: (value?: UserMode) => {
    if (value) {
      // User role and requester option from team
      const teamDetailList = value.teamDetailList;
      const pubTeams = teamDetailList?.filter((team) => !team.isDefaultTeam);
      const privateTeams = teamDetailList?.filter((team) => team.isDefaultTeam);
      const team = pubTeams?.[0] || privateTeams?.[0];
      if (team) {
        value.role = team.teamMemberList?.find(
          (member) => member.teamMemberUserId === value.id
        )?.role;
        const member = team.teamMemberList?.map((e) => ({
          label: `${e.fullName} (${e.emailAddress})`,
          value: e.teamMemberUserId,
        }));

        value.requesters = [{ label: 'All', value: 'All' }, ...(member || [])];
      }

      // Set time zone automatically: User's Local Time Zone.
      value.timeZone = value.timeZone ?? getLocalTimeZone().localTz;

      localStorage.setItem('saforus_userInfo', JSON.stringify(value));
      localStorage.setItem('saforus_web_token', value.token);

      AuthStore.userInfo = value;
      AuthStore.token = value.token;
    } else {
      localStorage.removeItem('saforus_userInfo');
      localStorage.removeItem('saforus_web_token');
      AuthStore.userInfo = null;
      AuthStore.token = null;
      localStorage.removeItem('VITE_SAFORUS');
    }
    AuthStore.syncDisplayTimezone();
  },

  updateProfile: (data: Partial<User>) => {
    const updateUser = {
      ...AuthStore.userInfo,
      ...data,
    } as UserMode;
    AuthStore.setUserInfo(updateUser);
  },

  syncUserInfoCookies: () => {
    const userInfo = localStorage.getItem('saforus_userInfo');
    const token = localStorage.getItem('saforus_web_token');
    token && (AuthStore.token = token);
    userInfo && (AuthStore.userInfo = JSON.parse(userInfo));
    AuthStore.syncDisplayTimezone();
  },
  setDevMode: (value: boolean) => {
    AuthStore.userInfo = { ...AuthStore.userInfo, devMode: value } as UserMode;
    localStorage.setItem(
      'saforus_userInfo',
      JSON.stringify(AuthStore.userInfo)
    );
  },
  setUserRole: (value?: string | null) => {
    if (value) {
      const data = { ...AuthStore.userInfo, role: value } as UserMode;
      AuthStore.userInfo = data;
      localStorage.setItem('saforus_userInfo', JSON.stringify(data));
    }
  },

  setIsExpired: (value: boolean) => {
    AuthStore.isExpired = value;
  },

  setIsTabIdle: () => {
    AuthStore.isTabIdle = true;
  },
  setNumberOfTab: (value: number) => {
    AuthStore.numberOfTab = value;
    localStorage.setItem('tabCount', String(value));
  },
  setLastApiTime: (value: string) => {
    AuthStore.lastApiTime = value;
  },
  setNumberOfTabIdle: (value: number) => {
    AuthStore.numberOfTabIdle = value;
    localStorage.setItem('tabCountIdle', String(value));
  },
  clearAuthState: () => {
    AuthStore.setIsLogIn(false);
    AuthStore.setUserInfo();
    AuthStore.setIsExpired(false);
    localStorage.removeItem('hasVisited');
    localStorage.removeItem('Expired');
  },
  getUserObject: () => {
    const passHash = localStorage.getItem('VITE_SAFORUS');
    AuthStore.password = passHash;
    const userInfo = localStorage.getItem('saforus_userInfo');
    AuthStore.userInfo = JSON.parse(userInfo ?? '{}');
  },
  syncDisplayTimezone: () => {
    let timeZone = AuthStore.userInfo?.timeZone;
    // User timezone from token
    if (!timeZone) {
      const token = AuthStore.token;
      if (token) {
        const tokenContent = jwt_decode(token) as {
          timeZone: string;
        };
        timeZone = tokenContent?.timeZone;
      }
    }

    // Local timezone
    const { localTzOffet, localTz } = getLocalTimeZone();

    if (timeZone) {
      const { standardOffset, timeZone: formatedTz } =
        formatedTimezone(timeZone);

      // Calculate offet between local timezone and user's timezone
      AuthStore.tzDisplayOffset = standardOffset - localTzOffet;
      AuthStore.timeZone = formatedTz;
    } else {
      AuthStore.tzDisplayOffset = 0;
      AuthStore.timeZone = localTz;
    }
  },
  joinTeam: (updateToken: string) => {
    if (updateToken) {
      const updateUser = {
        ...AuthStore.userInfo,
        token: updateToken,
      } as UserMode;

      const decodedToken = jwt_decode(updateToken) as {
        subscriptionDetailData?: string;
        subscriptionPlanStatus?: string;
        teamDetailData?: string;
      };

      if (decodedToken.subscriptionDetailData) {
        updateUser.subscriptionPlanDetailList = JSON.parse(
          decodedToken.subscriptionDetailData
        ) as SubscriptionPlanDetail[];
      }
      updateUser.subscriptionPlanStatus =
        decodedToken.subscriptionPlanStatus || null;
      if (decodedToken.teamDetailData) {
        updateUser.teamDetailList = JSON.parse(
          decodedToken.teamDetailData
        ) as Team[];
      }
      AuthStore.setUserInfo(updateUser);
    }
  },
});

// Functions to modify the state
const checkLoginStatus = () => {
  const userInfo = localStorage.getItem('saforus_web_token');
  AuthStore.isLoggedIn = isNotEmpty(userInfo);
  AuthStore.isLoading = false;
};

const checkAppIdleWithSingleTab = (): boolean => {
  return AuthStore.isTabIdle;
};

const checkAppIdleWithMultipleTab = (): boolean => {
  return (
    AuthStore.numberOfTab > 0 &&
    AuthStore.numberOfTabIdle > 0 &&
    AuthStore.numberOfTab == AuthStore.numberOfTabIdle
  );
};

const getUserInfo = () => {
  const userInfo = localStorage.getItem('saforus_userInfo');
  AuthStore.password = localStorage.getItem('VITE_SAFORUS');
  if (userInfo) {
    AuthStore.userInfo = JSON.parse(userInfo);
  }
  const token = localStorage.getItem('saforus_web_token');
  if (token) {
    AuthStore.token = token;
  }
  AuthStore.syncDisplayTimezone();
};

getUserInfo();
checkLoginStatus();

devtools(AuthStore, { name: 'AuthStore' });

export default AuthStore;
