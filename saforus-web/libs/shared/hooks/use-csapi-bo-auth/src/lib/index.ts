import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { isNotEmpty } from '@web-workspace/shared/helpers/strings';
import * as CryptoJS from 'crypto-js';
import {
  formatedTimezone,
  getLocalTimeZone,
} from '@web-workspace/shared/helpers/dates';

export interface User {
  id: string;
  email: string;
  token: string;
  type: string;
  accountName?: string;
  zoneId?: string;
  subscriptionTier?: string;
  roles?: string[];
}

export interface UserMode extends User {
  master: boolean;
  devMode: boolean;
}

interface CsApiBoAuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  userInfo: UserMode | null;
  setIsLogIn: (value: boolean) => void;
  setUserInfo: (value?: UserMode) => void;
  setDevMode: (value: boolean) => void;
  setUserRole: (value?: string | null) => void;

  isExpired: boolean;
  setIsExpired: (value: boolean) => void;

  clearAuthState: () => void;
  token: string | null;

  password: string | null;
  setUserPassword: (value?: string) => void;
  syncUserInfoCookies: () => void;
  timeZone: string | null;
  tzDisplayOffset: number; // Offet between local timezone and user's timezone
  syncDisplayTimezone: () => void; // Base on user token data
}

const CsApiBoAuthStore = proxy<CsApiBoAuthState>({
  isLoggedIn: false,
  isLoading: true,
  userInfo: null,
  isExpired: false,
  token: null,
  password: null,
  timeZone: '',
  tzDisplayOffset: 0, // Offet between local timezone and user's timezone
  setIsLogIn: (value: boolean) => {
    CsApiBoAuthStore.isLoggedIn = value;
  },
  setUserPassword: (value?: string) => {
    const key = getEnvVar('VITE_SAFORUS');
    const hashPwd = CryptoJS.HmacSHA512(value ?? '', key);
    const hashPass = hashPwd.toString(CryptoJS.enc.Hex);
    CsApiBoAuthStore.password = hashPass;
    localStorage.setItem('VITE_SAFORUS', hashPass);
  },
  setUserInfo: (value?: UserMode) => {
    if (value) {
      localStorage.setItem('cs_api_bo_userInfo', JSON.stringify(value));
      localStorage.setItem('cs_api_bo_token', value.token);

      CsApiBoAuthStore.userInfo = value;
      CsApiBoAuthStore.token = value.token;
    } else {
      localStorage.removeItem('cs_api_bo_userInfo');
      localStorage.removeItem('cs_api_bo_token');
      CsApiBoAuthStore.userInfo = null;
      CsApiBoAuthStore.token = null;
      localStorage.removeItem('VITE_SAFORUS');
    }
    CsApiBoAuthStore.syncDisplayTimezone();
  },
  syncUserInfoCookies: () => {
    const userInfo = localStorage.getItem('cs_api_bo_userInfo');
    const token = localStorage.getItem('cs_api_bo_token');
    token && (CsApiBoAuthStore.token = token);
    userInfo && (CsApiBoAuthStore.userInfo = JSON.parse(userInfo));
    CsApiBoAuthStore.syncDisplayTimezone();
  },
  setDevMode: (value: boolean) => {
    CsApiBoAuthStore.userInfo = {
      ...CsApiBoAuthStore.userInfo,
      devMode: value,
    } as UserMode;
    localStorage.setItem(
      'cs_api_bo_userInfo',
      JSON.stringify(CsApiBoAuthStore.userInfo)
    );
  },
  setUserRole: (value?: string | null) => {
    if (value) {
      const data = { ...CsApiBoAuthStore.userInfo, role: value } as UserMode;
      CsApiBoAuthStore.userInfo = data;
      localStorage.setItem('cs_api_bo_userInfo', JSON.stringify(data));
    }
  },

  setIsExpired: (value: boolean) => {
    CsApiBoAuthStore.isExpired = value;
  },
  clearAuthState: () => {
    CsApiBoAuthStore.setIsLogIn(false);
    CsApiBoAuthStore.setUserInfo();
    CsApiBoAuthStore.setIsExpired(false);
    localStorage.removeItem('hasVisited');
    localStorage.removeItem('Expired');
  },

  syncDisplayTimezone: () => {
    // User's timezone
    // Example: Africa/Nairobi, UTC+03:00
    const zoneId = CsApiBoAuthStore.userInfo?.zoneId;

    // Local timezone
    const { localTzOffet, localTz } = getLocalTimeZone();

    if (zoneId) {
      const { standardOffset, timeZone } = formatedTimezone(zoneId);

      // Calculate offet between local timezone and user's timezone
      CsApiBoAuthStore.tzDisplayOffset = standardOffset - localTzOffet;
      CsApiBoAuthStore.timeZone = timeZone;
    } else {
      CsApiBoAuthStore.tzDisplayOffset = 0;
      CsApiBoAuthStore.timeZone = localTz;
    }
  },
});

// Functions to modify the state
const checkLoginStatus = () => {
  const userInfo = localStorage.getItem('cs_api_bo_token');
  CsApiBoAuthStore.isLoggedIn = isNotEmpty(userInfo);
  CsApiBoAuthStore.isLoading = false;
};

const getUserInfo = () => {
  CsApiBoAuthStore.password = localStorage.getItem('VITE_SAFORUS');
  CsApiBoAuthStore.syncUserInfoCookies();
};

getUserInfo();
checkLoginStatus();

devtools(CsApiBoAuthStore, { name: 'CsApiBoAuthStore' });

export default CsApiBoAuthStore;
