import { Box, Typography } from '@mui/material';
import { t } from 'i18next';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { MediaCard } from './views/media-card';
import { ApiDashboardStore } from '@web-workspace/api-console/components/dashboard/data';
import { useSnapshot } from 'valtio';

interface ServiceUsageCardProps {
  type: 'watermarking' | 'detection';
  isLoading: boolean;
}

const ServiceUsageCard = ({ type, isLoading }: ServiceUsageCardProps) => {
  const { detectionUsage, watermarkingUsage } = useSnapshot(ApiDashboardStore);

  const staticsData = type === 'detection' ? detectionUsage : watermarkingUsage;

  return (
    <Box
      sx={{
        background: 'var(--base-white)',
        padding: '16px',
        borderRadius: '8px',
      }}
    >
      <Typography
        fontSize="16px"
        fontWeight={500}
        lineHeight="24px"
        color="var(--gray-100)"
      >
        {t(`apiDashboard.service-usage.${type}`)}{' '}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '8px',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
          mt: '0.5rem',
        }}
      >
        <LoadingOverLayer loading={isLoading} />

        <MediaCard
          type={type}
          title={t('common.content-type.image')}
          staticsData={
            type === 'detection'
              ? staticsData.data?.image
              : staticsData.data?.image
          }
        />
        <MediaCard
          type={type}
          title={t('common.content-type.document')}
          staticsData={
            type === 'detection'
              ? staticsData?.data?.document
              : staticsData?.data?.document
          }
        />
      </Box>
    </Box>
  );
};

export default ServiceUsageCard;
