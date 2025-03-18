import {
  Box,
  LinearProgress,
  linearProgressClasses,
  styled,
  Typography,
} from '@mui/material';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BinaryIcon from '../assets/binary.svg';
import CloudIcon from '../assets/cloud.svg';
import Button from '@web-workspace/shared/components/widgets/button';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { DashboardServiceUsageStore } from '@web-workspace/saforus/components/dashboard/service-usage/data';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import { BillingDetailStore } from '@web-workspace/saforus/components/user-info/billing-details/data';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { getMinuteOffset, pxToVw } from '@web-workspace/saforus/common/utils';
import {
  FeatureFlag,
  isFeatureEnabled,
} from '@web-workspace/shared/feature-flag';

const StyleLinearProgress = styled(LinearProgress)(({ theme }) => ({
  color: 'primary',
  width: '100%',
  height: '8px',
  borderRadius: '4px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'var(--purple-50)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: '4px',
    backgroundColor: 'var(--purple-600)',
  },
}));

const CapacityProgress = ({
  totalNumber,
  unit,
  percent,
  notionlabel,
}: {
  totalNumber?: number;
  unit?: string;
  percent?: number;
  notionlabel?: string;
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} gap={'1rem'} mt="1rem">
        <StyleLinearProgress value={percent} variant="determinate" />
        <Box
          sx={{
            whiteSpace: 'nowrap',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '28px',
              fontWeight: '700',
            }}
          >
            {notionlabel}
          </Typography>
          <Typography fontWeight={500}>{unit}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: '0.8rem',
          color: 'var(--gray-25)',
          fontSize: '14px',
        }}
      >
        <Typography>
          {percent}% {t('billDetail.full')}
        </Typography>
        <Typography>
          {t('billDetail.used', {
            total: totalNumber,
          })}
        </Typography>
      </Box>
    </Box>
  );
};

export default function PlanInfo({ loading }: { loading: boolean }) {
  const { subscriptionDetail } = useSnapshot(BillingDetailStore);
  const { t } = useTranslation();
  const tzOffset = getMinuteOffset();
  const navigate = useNavigate();
  const viewOtherPlans = () => {
    navigate(ROUTES.USER_INFO.SERVICE_PLAN.path, { replace: true });
  };
  const { forensicWatermarkingData, numberOfProcessingFilesData } = useSnapshot(
    DashboardServiceUsageStore
  );

  const expiredAt = formatDateWithLanguage({
    date: subscriptionDetail?.subscriptionEndsAt,
    withSlash: true,
    tzOffset,
  });
  const activeMember = subscriptionDetail?.noOfMembersPerTeam || 0;
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: 'var(--base-white)',
        padding: '20px 24px',
        mt: '24px',
      }}
    >
      <LoadingOverLayer loading={loading} />
      <Box
        sx={{
          display: 'flex',
          gap: '0.6rem',
          mb: '24px',
        }}
      >
        <Typography
          sx={{
            color: 'var(--gray-700)',
            fontWeight: 700,
            fontSize: '22px',
          }}
        >
          {subscriptionDetail?.title}
        </Typography>
        <Typography
          component={'span'}
          sx={{
            color: '#574EFA',
            padding: '2px 8px',
            fontSize: '13px',
            fontWeight: 500,
            lineHeight: '20px',
            backgroundColor: '#ECEBFF',
            borderRadius: '5px',
          }}
        >
          {t('servicePlan.subscription.active-subscription')}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
        }}
      >
        <Box
          sx={{
            padding: '20px 20px 24px 20px',
            border: '1px solid var(--neutral-700)',
            borderRadius: '5px',
            flex: 1,
          }}
        >
          <Typography color={'var(--gray-25)'} mb={'28px'}>
            {t('billDetail.plan-details')}:
          </Typography>
          <Box>
            <Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: t('billDetail.subscribe-monthly', {
                    endDate: expiredAt,
                  }),
                }}
              />
            </Typography>

            <Typography>
              {t('billDetail.active-members', { members: activeMember })}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            padding: '20px 20px 24px 20px',
            border: '1px solid var(--neutral-700)',
            borderRadius: '5px',
            flex: 1,
          }}
        >
          <Box display={'flex'} gap={'0.6rem'}>
            <img src={BinaryIcon} alt="binary-icon" />
            <Typography fontWeight={500}>
              {t('billDetail.watermarking-capacity')}
            </Typography>
          </Box>
          <CapacityProgress
            totalNumber={
              forensicWatermarkingData?.wtrCapacitySize ||
              subscriptionDetail?.wtrCapacitySize ||
              0
            }
            unit={numberOfProcessingFilesData.unit}
            percent={
              Math.floor(
                (forensicWatermarkingData?.wtrUsedPercentage * 100) / 100
              ) || 0
            }
            notionlabel={
              forensicWatermarkingData?.wtrCapacitySize?.toFixed(2) ||
              0 + ' ' + numberOfProcessingFilesData.unit
            }
          />
        </Box>
        {isFeatureEnabled(FeatureFlag.SHOW_CLOUD_STORAGE) ? (
          <Box
            sx={{
              padding: '20px 20px 24px 20px',
              border: '1px solid var(--neutral-700)',
              borderRadius: '5px',
              flex: 1,
            }}
          >
            <Box display={'flex'} gap={'0.6rem'}>
              <img src={CloudIcon} alt="cloud-icon" />
              <Typography fontWeight={500}>
                {t('billDetail.cloud-storage.title')}
              </Typography>
            </Box>
            <CapacityProgress
              totalNumber={
                forensicWatermarkingData?.cloudStorageSize ||
                subscriptionDetail?.cloudStorageSize ||
                0
              }
              unit={numberOfProcessingFilesData.unit}
              percent={
                Math.floor(
                  (forensicWatermarkingData?.cloudUsedPercentage * 100) / 100
                ) || 0
              }
              notionlabel={
                forensicWatermarkingData?.cloudStorageSize?.toFixed(2) ||
                0 + ' ' + numberOfProcessingFilesData.unit
              }
            />
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            border="1px solid var(--neutral-700)"
            borderRadius="5px"
            padding="16px 24px"
            gap="14px"
            flex={1}
            sx={{ backgroundColor: 'var(--neutral-100)' }}
          >
            <Typography
              fontSize={pxToVw('18px')}
              lineHeight={pxToVw('24px')}
              fontWeight="600"
              letterSpacing="-2%"
              color="var( --gray-25)"
            >
              {t('billDetail.cloud-storage.title')}
            </Typography>
            <Typography variant="body1" fontWeight={500} color="var(--gray-25)">
              {t('billDetail.cloud-storage.disabled')}
            </Typography>
          </Box>
        )}
      </Box>
      <Button
        onClick={viewOtherPlans}
        variant="outlined"
        sx={{ color: 'var(--gray-700)', mt: '1rem' }}
      >
        {t('billDetail.view-other')}
      </Button>
    </Box>
  );
}
