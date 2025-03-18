import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { isNotEmpty } from '@web-workspace/shared/helpers/strings';
import { TOption } from '@web-workspace/saforus/common/model';
import { SubscriptionPlanDetail } from '@web-workspace/shared/hooks/use-subscription';
import * as CryptoJS from 'crypto-js';

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
  subscriptionPlanDetailList: SubscriptionPlanDetail[] | null;
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
  setDevMode: (value: boolean) => void;
  setUserRole: (value?: string | null) => void;
  setUserRequester: (value?: TOption[]) => void;

  isExpired: boolean;
  setIsExpired: (value: boolean) => void;

  clearBoAuthState: () => void;
  token: string | null;

  password: string | null;
  setUserPassword: (value?: string) => void;
  syncUserInfoCookies: () => void;
  getUserObject: () => void;
}

const BoAuthStore = proxy<AuthState>({
  isLoggedIn: false,
  isLoading: true,
  userInfo: null,
  token: null,
  setIsLogIn: (value: boolean) => {
    BoAuthStore.isLoggedIn = value;
  },
  setUserInfo: (value?: UserMode) => {
    if (value) {
      // GET ROLE and set role for user
      const teamDetailList = value.teamDetailList;
      const pubTeams = teamDetailList?.filter((team) => !team.isDefaultTeam);
      if (pubTeams && pubTeams.length > 0) {
        value.role = pubTeams[0]?.teamMemberList?.find(
          (member) => member.emailAddress === value.email
        )?.role;
      } else {
        const privateTeams = teamDetailList?.filter(
          (team) => team.isDefaultTeam
        );
        if (privateTeams && privateTeams.length > 0) {
          value.role = privateTeams[0]?.teamMemberList?.find(
            (member) => member.emailAddress === value.email
          )?.role;
        }
      }

      localStorage.setItem('saforus_userInfo', JSON.stringify(value));
      localStorage.setItem('saforus_web_token', value.token);
      BoAuthStore.userInfo = value;
      BoAuthStore.token = value.token;
    } else {
      localStorage.removeItem('saforus_userInfo');
      localStorage.removeItem('saforus_web_token');
      BoAuthStore.userInfo = null;
      BoAuthStore.token = null;
      localStorage.removeItem('VITE_SAFORUS');
    }
  },
  setDevMode: (value: boolean) => {
    BoAuthStore.userInfo = {
      ...BoAuthStore.userInfo,
      devMode: value,
    } as UserMode;
    localStorage.setItem(
      'saforus_userInfo',
      JSON.stringify(BoAuthStore.userInfo)
    );
  },
  setUserRole: (value?: string | null) => {
    if (value) {
      const data = { ...BoAuthStore.userInfo, role: value } as UserMode;
      BoAuthStore.userInfo = data;
      localStorage.setItem('saforus_userInfo', JSON.stringify(data));
    }
  },
  setUserRequester: (value?: TOption[]) => {
    BoAuthStore.userInfo = {
      ...BoAuthStore.userInfo,
      requesters: value,
    } as UserMode;
    localStorage.setItem(
      'saforus_userInfo',
      JSON.stringify(BoAuthStore.userInfo)
    );
  },

  isExpired: false,
  setIsExpired: (value: boolean) => {
    BoAuthStore.isExpired = value;
  },

  password: null,
  setUserPassword: (value?: string) => {
    const key = getEnvVar('VITE_SAFORUS');
    const hashPwd = CryptoJS.HmacSHA512(value ?? '', key);

    const hashPass = hashPwd.toString(CryptoJS.enc.Hex);
    BoAuthStore.password = hashPass;
    localStorage.setItem('VITE_SAFORUS', hashPass);
  },
  syncUserInfoCookies: () => {
    const saforus_userInfo = localStorage.getItem('saforus_userInfo');
    const token = localStorage.getItem('saforus_web_token');
    token && (BoAuthStore.token = token);
    saforus_userInfo && (BoAuthStore.userInfo = JSON.parse(saforus_userInfo));
  },

  clearBoAuthState: () => {
    BoAuthStore.setIsLogIn(false);
    BoAuthStore.setUserInfo();
    BoAuthStore.setIsExpired(false);
    localStorage.removeItem('hasVisited');
    localStorage.removeItem('Expired');
  },
  getUserObject: () => {
    const passHash = localStorage.getItem('VITE_SAFORUS');
    BoAuthStore.password = passHash;
    const userInfo = localStorage.getItem('saforus_userInfo');
    BoAuthStore.userInfo = JSON.parse(userInfo ?? '{}');
  },
});

// Functions to modify the state
const checkLoginStatus = () => {
  const userInfo = localStorage.getItem('saforus_web_token');
  BoAuthStore.isLoggedIn = isNotEmpty(userInfo);
  BoAuthStore.isLoading = false;
};

const getUserInfo = () => {
  const userInfo = localStorage.getItem('saforus_userInfo');
  BoAuthStore.password = localStorage.getItem('VITE_SAFORUS');
  if (userInfo) {
    BoAuthStore.userInfo = JSON.parse(userInfo);
  }
  const token = localStorage.getItem('saforus_web_token');
  if (token) {
    BoAuthStore.token = token;
  }
};

getUserInfo();
checkLoginStatus();

devtools(BoAuthStore, { name: 'BO_AUTH_STORE' });

export default BoAuthStore;
