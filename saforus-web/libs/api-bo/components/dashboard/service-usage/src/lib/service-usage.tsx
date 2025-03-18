import { Box } from '@mui/material';
import { t } from 'i18next';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { MediaCard } from './views/media-card';
import { ApiDashboardStore } from '@web-workspace/api-bo/components/dashboard/data';
import { useSnapshot } from 'valtio';

interface ServiceUsageCardProps {
  type: 'watermarking' | 'detection';
  isLoading: boolean;
}

const ServiceUsageCard = ({ type, isLoading }: ServiceUsageCardProps) => {
  const { serviceUsageData } = useSnapshot(ApiDashboardStore)

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <LoadingOverLayer loading={isLoading} />

      <MediaCard
        type={type}
        title={t('common.content-type.image')}
        staticsData={serviceUsageData?.[type]?.image}
      />
      <MediaCard
        type={type}
        title={t('common.content-type.video')}
        staticsData={serviceUsageData?.[type]?.video}
      />
      <MediaCard
        type={type}
        title={t('common.content-type.audio')}
        staticsData={serviceUsageData?.[type]?.audio}
      />
      <MediaCard
        type={type}
        title={t('common.content-type.document')}
        staticsData={serviceUsageData?.[type]?.document}
      />
    </Box>
  );
};

export default ServiceUsageCard;
