import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { isNotEmpty } from '@web-workspace/shared/helpers/strings';
import * as CryptoJS from 'crypto-js';
import {
  formatedTimezone,
  getLocalTimeZone,
} from '@web-workspace/shared/helpers/dates';
import { pick } from 'lodash-es';
import { SubscriptionDetail } from '@web-workspace/api-console/common/model';

export interface User {
  // User Info is established when a user logs in or updates their account.
  // This is accomplished using the setUserInfo and updateProfile functions.
  id: string;
  email: string;
  token: string;
  refreshToken?: string;
  accountName: string;
  zoneId: string;
  subscription?: SubscriptionDetail;
  roles?: string[];
  avatarUrl?: string;
}

export type UserMode = User

interface CsApiAuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  token: string | null;
  userInfo: UserMode | null;
  setIsLogIn: (value: boolean) => void;
  setUserInfo: (value?: UserMode) => void;
  updateProfile: (value?: Partial<User>) => void;

  isExpired: boolean;
  setIsExpired: (value: boolean) => void;

  clearAuthState: () => void;

  password: string | null;
  setUserPassword: (value?: string) => void;
  syncUserInfoCookies: () => void;
  timeZone: string | null;
  tzDisplayOffset: number; // Offet between local timezone and user's timezone
  syncDisplayTimezone: () => void; // Base on user token data
}

const CsApiAuthStore = proxy<CsApiAuthState>({
  isLoggedIn: false,
  isLoading: true,
  userInfo: null,
  isExpired: false,
  token: null,
  password: null,
  timeZone: '',
  tzDisplayOffset: 0, // Offet between local timezone and user's timezone
  setIsLogIn: (value: boolean) => {
    CsApiAuthStore.isLoggedIn = value;
  },
  setUserPassword: (value?: string) => {
    const key = getEnvVar('VITE_SAFORUS');
    const hashPwd = CryptoJS.HmacSHA512(value ?? '', key);
    const hashPass = hashPwd.toString(CryptoJS.enc.Hex);
    CsApiAuthStore.password = hashPass;
    localStorage.setItem('VITE_SAFORUS', hashPass);
  },
  setUserInfo: (value?: UserMode) => {
    if (value) {
      localStorage.setItem('cs_api_userInfo', JSON.stringify(value));
      localStorage.setItem('cs_api_token', value.token);

      CsApiAuthStore.userInfo = value;
      CsApiAuthStore.token = value.token;
    } else {
      localStorage.removeItem('cs_api_userInfo');
      localStorage.removeItem('cs_api_token');
      CsApiAuthStore.userInfo = null;
      CsApiAuthStore.token = null;
    }
    CsApiAuthStore.syncDisplayTimezone();
  },

  updateProfile: (profile?: Partial<User>) => {
    const currentZoneId = CsApiAuthStore.userInfo?.zoneId;
    const updateData = pick(profile, ['accountName', 'avatarUrl', 'zoneId']);

    CsApiAuthStore.userInfo = {
      ...CsApiAuthStore.userInfo,
      ...updateData,
    } as UserMode;

    if (profile?.zoneId != currentZoneId) {
      CsApiAuthStore.syncDisplayTimezone();
    }

    localStorage.setItem(
      'cs_api_userInfo',
      JSON.stringify(CsApiAuthStore.userInfo)
    );
  },

  syncUserInfoCookies: () => {
    const userInfo = localStorage.getItem('cs_api_userInfo');
    const token = localStorage.getItem('cs_api_token');
    token && (CsApiAuthStore.token = token);
    userInfo && (CsApiAuthStore.userInfo = JSON.parse(userInfo));
    CsApiAuthStore.syncDisplayTimezone();
  },
  setIsExpired: (value: boolean) => {
    CsApiAuthStore.isExpired = value;
  },
  clearAuthState: () => {
    CsApiAuthStore.setIsLogIn(false);
    CsApiAuthStore.setUserInfo();
    CsApiAuthStore.setIsExpired(false);
    localStorage.removeItem('hasVisited');
    localStorage.removeItem('Expired');
    localStorage.removeItem('VITE_SAFORUS');
  },

  syncDisplayTimezone: () => {
    // User's timezone
    // Example: Africa/Nairobi, UTC+03:00
    const zoneId = CsApiAuthStore.userInfo?.zoneId;

    // Local timezone
    const { localTzOffet, localTz } = getLocalTimeZone();
    if (zoneId) {
      const { standardOffset, timeZone } = formatedTimezone(zoneId);
      // Calculate offet between local timezone and user's timezone
      CsApiAuthStore.tzDisplayOffset = standardOffset - localTzOffet;
      CsApiAuthStore.timeZone = timeZone;
    } else {
      CsApiAuthStore.tzDisplayOffset = 0;
      CsApiAuthStore.timeZone = localTz;
    }
  },
});

// Functions to modify the state
const checkLoginStatus = () => {
  const userInfo = localStorage.getItem('cs_api_token');
  CsApiAuthStore.isLoggedIn = isNotEmpty(userInfo);
  CsApiAuthStore.isLoading = false;
};

const getUserInfo = () => {
  CsApiAuthStore.password = localStorage.getItem('VITE_SAFORUS');
  CsApiAuthStore.syncUserInfoCookies();
};

getUserInfo();
checkLoginStatus();

devtools(CsApiAuthStore, { name: 'CsApiAuthStore' });

export default CsApiAuthStore;
