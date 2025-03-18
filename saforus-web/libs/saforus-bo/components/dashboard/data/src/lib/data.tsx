import { useQuery } from 'react-query';
import { formatTzDate } from '@web-workspace/shared/helpers/dates';

import { QUERY_KEY, getUsageSummary, getUserList, getUserTrend } from './api';
import { AdminDashboardStore } from './store';
import { useSnapshot } from 'valtio';
import { randomId } from '@web-workspace/shared/helpers/strings';
import { addDays } from 'date-fns';

export const useAdminDashboardData = () => {
  const { serviceUsageDate, setUsageData, setUsers, setUserTrend } =
    useSnapshot(AdminDashboardStore);

  const { isLoading: loadingSummary } = useQuery(
    [QUERY_KEY.USAGE_SUMMARY, serviceUsageDate],
    () => {
      // Fetch data with date filter
      // Form 00:00 of start date to 23:59 of end date
      // Convert from local time to UTC time before sending to the server
      const reqData = {
        startDate: formatTzDate(serviceUsageDate.startDate, 0),
        endDate: formatTzDate(serviceUsageDate.endDate, 0, false),
      };
      return getUsageSummary(reqData);
    },
    {
      onSuccess: (response) => {
        if (response && response.data) {
          setUsageData(response.data);
        }
      },
    }
  );

  const { isLoading: loadingUser } = useQuery(
    [QUERY_KEY.USER_LIST],
    () => {
      // Get recent added users
      const reqData = {
        joinedDateStart: formatTzDate(new Date('2023-10-01'), 0), // start of service
        joinedDateEnd: formatTzDate(new Date(), 0, false),
        sortBy: 'JOINED_DATE',
        sortOrder: 'DESC',
        status: 'ALL',
        userType: 'ALL',
        pageNo: 0,
        elementPerPage: 8,
      };
      return getUserList(reqData);
    },
    {
      onSuccess: (response) => {
        if (response && response.data) {
          // some data may duplicate
          // this uniqueList is used to avoid strange behavior of list component(datagrid)
          const mapUsers = response.data.elementList.map((item) => ({
            ...item,
            userId: item.id,
            id: randomId(),
          }));
          setUsers(mapUsers);
        }
      },
    }
  );

  const { isLoading: loadingTrend } = useQuery(
    [QUERY_KEY.USER_TREND, serviceUsageDate],
    () => {
      // Get newest 12 months data
      const toDate = new Date();
      const fromDate = addDays(toDate, -365);
      const reqData = {
        startDate: formatTzDate(fromDate, 0),
        endDate: formatTzDate(toDate, 0, false),
      };
      return getUserTrend(reqData);
    },
    {
      onSuccess: (response) => {
        if (response && response.data) {
          setUserTrend({
            increasePercentage: response.data.increasePercentage,
            userCounts: response.data.userCounts.slice(-12),
          });
        }
      },
    }
  );

  return {
    loadingSummary,
    loadingUser,
    loadingTrend,
  };
};
