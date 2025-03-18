import { Box, ButtonBase, styled, Typography } from '@mui/material';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { formatSize, pxToVw } from '@web-workspace/saforus/common/utils';
import { useTranslation } from 'react-i18next';
import { differenceDays } from '@web-workspace/shared/helpers/dates';
import { snapshot, useSnapshot } from 'valtio';
import useSubscription from '@web-workspace/shared/hooks/use-subscription';
import { ProgressCard } from '@web-workspace/saforus/components/dashboard/service-usage/common';
import {
  FeatureFlag,
  isFeatureEnabled,
} from '@web-workspace/shared/feature-flag';
import { DashboardServiceUsageStore } from '@web-workspace/saforus/components/dashboard/service-usage/data';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';

const StyledProgressCard = styled(ProgressCard)(({ theme }) => ({
  flex: 1,
  padding: pxToVw(['12px', '16px']),
  minWidth: pxToVw('220px'),
  [theme.breakpoints.up('md')]: {
    padding: pxToVw(['12px', '20px']),
  },
  [theme.breakpoints.up('desk')]: {
    padding: pxToVw(['12px', '24px']),
  },
}));

const PlainInfo = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left',
  gap: pxToVw('4px'),
  [theme.breakpoints.up('desk')]: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: pxToVw('8px'),
  },
}));

type BillingOverviewProps = {
  loading: boolean;
};

const BillingOverview = ({ loading }: BillingOverviewProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const seeMore = () => {
    navigate(ROUTES.USER_INFO.SERVICE_PLAN.path);
  };

  const { subscriptionPlanDetail } = snapshot(useSubscription);
  const isFree =
    subscriptionPlanDetail?.subscriptionCostType?.toLowerCase() === 'free';
  const planLeft = differenceDays(
    new Date(),
    subscriptionPlanDetail?.subscriptionEndsAt
  );

  const {
    forensicWatermarkingData,
    fileStorageCapacityData,
    numberOfProcessingFilesData,
  } = useSnapshot(DashboardServiceUsageStore);

  /**
   * Calculates the available capacity @const availableWaterMarkingCapacity
   *
   * The `wtrCapacitySize` from `forensicWatermarkingData` is assumed to be in GB.
   * It's converted to bytes by multiplying by 1024 three times.
   * The `wtrUsedCapacitySize` which is also in GB is then subtracted from this value after converting it to bytes.
   * The result is formatted into a human-readable size string (e.g., "10 GB") using the `formatSize` function.
   *
   * @returns {string} The available watermarking capacity, formatted as a human-readable size string.
   */
  const availableWatermarkingCapacity: string = formatSize(
    forensicWatermarkingData?.wtrCapacitySize * 1024 * 1024 * 1024 -
      forensicWatermarkingData?.wtrUsedCapacitySize * 1024 * 1024 * 1024
  );
  //Calculates the available capacity @const availableCouldStorageCapacity with the same logic as above
  const availableCloudStorageCapacity: string = formatSize(
    forensicWatermarkingData?.cloudStorageSize * 1024 * 1024 * 1024 -
      forensicWatermarkingData?.cloudUsedStorageSize * 1024 * 1024 * 1024
  );
  if (isFree) return null;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: pxToVw('1rem'),
        padding: pxToVw('16px'),
        position: 'relative',
        background: isFree ? 'var(--purple-50)' : 'var(--neutral-400)',
        borderRadius: pxToVw('8px'),
      }}
    >
      <LoadingOverLayer loading={loading} isTransparent />
      {/* PlainDetail */}
      <PlainInfo onClick={seeMore}>
        {isFree ? (
          <Typography
            variant="caption"
            color="var(--base-white)"
            fontWeight={600}
            sx={{
              padding: pxToVw(['2px', '8px']),
              backgroundColor: 'var(--purple-400)',
              borderRadius: pxToVw('5px'),
            }}
          >
            {t('dashboard.service-usage.usage-by-period.day-trial')}
          </Typography>
        ) : (
          <Typography variant="h6" color="var(--purple-400)">
            {`${subscriptionPlanDetail?.title} Plan`}
          </Typography>
        )}
        <Box display="flex" alignItems="center">
          <Typography
            variant="subtitle2"
            color="var(--gray-700)"
            fontWeight={600}
          >
            {t('dashboard.service-usage.usage-by-period.days-left', {
              numberOfDay: planLeft || '--',
            })}
          </Typography>

          <ChevronRightIcon
            sx={{
              fontSize: pxToVw('20px'),
              color: 'var(--gray-500)',
            }}
          />
        </Box>
      </PlainInfo>

      {/* Capacity & Storage */}
      <Box display={'flex'} gap={pxToVw('1rem')} flex={1}>
        <StyledProgressCard
          title={t('dashboard.service-usage.watermarking-capacity.title')}
          totalNumber={
            forensicWatermarkingData?.wtrCapacitySize ||
            subscriptionPlanDetail?.wtrCapacitySize ||
            0
          }
          unit={numberOfProcessingFilesData.unit}
          percent={
            Math.floor(
              (forensicWatermarkingData?.wtrUsedPercentage * 100) / 100
            ) || 0
          }
          tooltip={availableWatermarkingCapacity + ' Available'}
        />
        {!isFree && (
          <StyledProgressCard
            title={t('dashboard.service-usage.cloud-storage.title')}
            totalNumber={
              forensicWatermarkingData?.cloudStorageSize ||
              subscriptionPlanDetail?.cloudStorageSize ||
              0
            }
            unit={fileStorageCapacityData.unit}
            percent={
              Math.floor(
                (forensicWatermarkingData?.cloudUsedPercentage * 100) / 100
              ) || 0
            }
            tooltip={availableCloudStorageCapacity + ' Available'}
            available={isFeatureEnabled(FeatureFlag.SHOW_CLOUD_STORAGE)}
          />
        )}
      </Box>
    </Box>
  );
};

export default BillingOverview;
