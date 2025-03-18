import { proxy, subscribe } from 'valtio';
import { DateData, UsageData, UserTrendData } from './interface';
import { devtools } from 'valtio/utils';
import { sub } from 'date-fns';
import { UserInformation } from '@web-workspace/saforus-bo/components/user-management/search-user/data';

export interface AdminDashboardStoreState {
  // Service usage data
  usageData: UsageData;
  serviceUsageDate: DateData;
  setUsageData(data: UsageData): void;
  updateServiceUsageDate(newServiceUsageDate: DateData): void;

  // User management
  users: UserInformation[];
  setUsers: (users: UserInformation[]) => void;

  //User trend
  userTrend: UserTrendData;
  setUserTrend: (data: UserTrendData) => void;
}

function adminDashboardStore() {
  const currentDate = new Date();

  const store: AdminDashboardStoreState = {
    usageData: {
      noticeCount: {
        hidden: 0,
        published: 0,
      },
      pdInfo: {
        totalSize: 0,
        pdOrderCount: {
          detected: 0,
          undetected: 0,
          inProgress: 0,
          failed: 0,
        },
      },
      wtrInfo: {
        totalSize: 0,
        wtrOrderCount: {
          completed: 0,
          inProgress: 0,
          failed: 0,
        },
      },
      userCount: {
        active: 0,
        locked: 0,
        pendingActivation: 0,
        suspended: 0,
      },
    },
    serviceUsageDate: {
      startDate: sub(currentDate, { days: 30 }),
      endDate: currentDate,
    },
    setUsageData: (data) => {
      AdminDashboardStore.usageData = data;
    },
    updateServiceUsageDate: (newServiceUsageDate: DateData) => {
      AdminDashboardStore.serviceUsageDate = newServiceUsageDate;
    },

    users: [],
    setUsers: (users) => {
      AdminDashboardStore.users = users;
    },

    userTrend: { increasePercentage: 0, userCount: [] },
    setUserTrend: (data) => {
      AdminDashboardStore.userTrend = data;
    },
  };

  return store;
}

export const AdminDashboardStore = proxy<AdminDashboardStoreState>(
  adminDashboardStore()
);

devtools(AdminDashboardStore, { name: 'ADMIN_DASHBOARD_STORE' });
