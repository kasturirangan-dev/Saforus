import {
  Backdrop,
  Box,
  ButtonBase,
  CircularProgress,
  Typography,
  styled,
} from '@mui/material';
import { t } from 'i18next';
import { StatisticCard } from '@web-workspace/saforus/components/dashboard/service-usage/common';
import {
  DashboardServiceUsageStore,
  PiracyData,
  WatermarkingUses,
} from '@web-workspace/saforus/components/dashboard/service-usage/data';
import { useSnapshot } from 'valtio';
import { pxToVw } from '@web-workspace/saforus/common/utils';
import digitalIcon from './assets/digital.svg';
import piracyIcon from './assets/piracy.svg';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';

const StyledStatisticCard = styled(StatisticCard)(({ theme }) => ({
  flex: 1,
  backgroundColor: 'var(--base-white)',
  '& .total-count': {
    '@container (max-width: 1200px)': {
      display: 'none',
    },
  },
}));

interface ServiceUsageCardProps {
  title: string;
  serviceIcon: string;
  serviceUrl: string;
  statisticsData: WatermarkingUses | PiracyData;
  loading: boolean;
  statsFor: 'WKM' | 'PD';
}

const ServiceUsageCard = ({
  title,
  serviceIcon,
  serviceUrl,
  statisticsData,
  loading,
  statsFor,
}: ServiceUsageCardProps) => {
  const navigate = useNavigate();

  const seeMore = () => {
    navigate(serviceUrl);
  };

  const statsConfig = {
    WKM: [
      { title: t('common.content-type.image'), data: statisticsData?.imageStat },
      { title: t('common.content-type.video'), data: statisticsData?.videoStat },
      { title: t('common.content-type.audio'), data: statisticsData?.audioStat },
      { title: t('common.content-type.document'), data: statisticsData?.documentStat },
    ],
    PD: [
      { title: t('common.content-type.image'), data: statisticsData?.imageStat },
      { title: t('common.content-type.video'), data: statisticsData?.videoStat },
      { title: t('common.content-type.audio'), data: statisticsData?.audioStat },
      { title: t('common.content-type.document'), data: statisticsData?.documentStat },
    ],
  };

  const currentStats = statsConfig[statsFor];

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={pxToVw(8)}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        containerType: 'inline-size',
      }}
    >
      <Backdrop
        open={loading}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          color: 'var(--main-brand)',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ButtonBase sx={{ marginRight: 'auto' }} onClick={seeMore}>
        <Box
          display="flex"
          padding={pxToVw('4px')}
          borderRadius={pxToVw('4px')}
          border={`${pxToVw('1px')} solid var(--purple-100)`}
          marginRight={'10px'}
        >
          <img
            src={serviceIcon}
            alt="service icon"
            height={pxToVw(20, true)}
            width={pxToVw(20, true)}
          />
        </Box>
        <Typography
          fontSize={pxToVw('20px')}
          fontWeight={500}
          lineHeight={pxToVw('28px')}
          color="var(--gray-700)"
        >
          {title}
        </Typography>
        <ChevronRightIcon
          sx={{
            fontSize: pxToVw('24px'),
            color: 'var(--gray-25)',
          }}
        />
      </ButtonBase>
      <Box display="flex" justifyContent="space-between" gap={pxToVw(16)}>
        {currentStats.map((stat, index) => (
          <StyledStatisticCard
            key={index}
            title={stat.title}
            staticsData={stat.data}
            statsFor={statsFor}
          />
        ))}
      </Box>
    </Box>
  );
};

interface ServiceUsageViewProps {
  className?: string;
  isServiceUsageLoading: boolean;
}

const ServiceUsageView: React.FC<ServiceUsageViewProps> = ({
  className,
  isServiceUsageLoading,
}) => {
  const { forensicWatermarkingData } = useSnapshot(DashboardServiceUsageStore);

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: pxToVw('36px'),
      }}
    >
      <ServiceUsageCard
        title={t(
          'dashboard.service-usage.forensic-watermarking-usage.watermarking'
        )}
        serviceIcon={digitalIcon}
        serviceUrl={ROUTES.FORENSIC_WATERMARKING.WATERMARKING_HISTORY.path}
        statisticsData={forensicWatermarkingData?.watermarkingUses}
        loading={isServiceUsageLoading}
        statsFor="WKM"
      />

      <ServiceUsageCard
        title={t(
          'dashboard.service-usage.forensic-watermarking-usage.piracy-detection'
        )}
        serviceIcon={piracyIcon}
        serviceUrl={ROUTES.PIRACY_DETECTION.VIEW_ORDER.path}
        statisticsData={forensicWatermarkingData?.piracyUsesStat}
        loading={isServiceUsageLoading}
        statsFor="PD"
      />
    </Box>
  );
};

export default ServiceUsageView;