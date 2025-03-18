import { useQuery } from 'react-query';
import { fetchForensicWatermarkingUsage, fetchGraph } from './api';
import { useSnapshot } from 'valtio';
import { DashboardServiceUsageStore } from './storeState';
import {
  DateFormat,
  formatDate,
  formatTzDate,
} from '@web-workspace/shared/helpers/dates';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';
import i18next from 'i18next';
import { getTeamId } from '@web-workspace/saforus/common/utils';

export function useDashboardData() {
  const {
    updateChartData,
    serviceUsageDate,
    setForensicWatermarkingData,
    period,
    graphDate,
  } = useSnapshot(DashboardServiceUsageStore);

  const teamId = getTeamId();
  const tzOffset = getMinuteOffset();

  const { isLoading } = useQuery<unknown, Error, any>({
    queryKey: ['GraphData', graphDate, period, i18next.language],
    enabled: !!teamId,
    queryFn: async () => {
      return fetchGraph({
        startDate: formatDate(graphDate.startDate, DateFormat.ISO_DATETIME),
        endDate: formatDate(graphDate.endDate, DateFormat.ISO_DATETIME),
        teamId,
        userUsesPeriod: period,
      });
    },
    onSuccess: (response) => {
      if (response && response.data) {
        response?.data?.forEach((item: any) => {
          item.periodName = i18next.t(item.periodName);
        });
        updateChartData(response?.data);
      }
    },
  });

  /*
    useQuery hook for fetching forensic watermarking usage data.
  */
  const { isLoading: isWaterMarkingLoading } = useQuery<unknown, Error, any>({
    queryKey: ['FORENSIC_WATERMARKING_USAGE', serviceUsageDate],
    onSuccess: (response) => {
      setForensicWatermarkingData(response?.data);
    },
    queryFn: async () => {
      return fetchForensicWatermarkingUsage(
        formatTzDate(serviceUsageDate.startDate, tzOffset),
        formatTzDate(serviceUsageDate.endDate, tzOffset, false),
        getTeamId()
      );
    },
  });

  return {
    loading: isLoading,
    isServiceUsageLoading: isWaterMarkingLoading,
  };
}
