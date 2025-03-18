import { Box, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useApiDashboardData } from '@web-workspace/api-bo/components/dashboard/data';
import DashboardFilter from '@web-workspace/api-bo/components/dashboard/filter';
import {
  UsageChart,
  UsageSummary,
} from '@web-workspace/api-bo/components/dashboard/usage-overview';
import ServiceUsage from '@web-workspace/api-bo/components/dashboard/service-usage';
import statsIcon from './assets/stats.svg';
import wmIcon from './assets/wm.svg';
import pdIcon from './assets/pd.svg';
import { PageTitle } from '@web-workspace/api-bo/common/views';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
}));

const BoxContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}));


const ContentTitle = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box
        display="flex"
        padding="4px"
        borderRadius="4px"
        border={'1px solid var(--purple-100)'}
        marginRight="10px"
      >
        <img src={icon} alt="service icon" height={20} width={20} />
      </Box>
      <Typography
        fontSize="20px"
        fontWeight={700}
        lineHeight="28px"
        color="var(--gray-700)"
      >
        {title}
      </Typography>
    </Box>
  );
};
export function ApiConsoleDashboardContainer() {
  const { t } = useTranslation();

  const { loadingSummary, loadingUsageByDate, loadingServiceUsage } =
    useApiDashboardData();

  return (
    <BoxContainer>
      <PageTitle
      title='Markany Dashboard'
      >
        <DashboardFilter />
      </PageTitle>

      {/* Usage Overview */}
      <BoxContent>
        <ContentTitle
          title={t('apiDashboard.usage-overview.title')}
          icon={statsIcon}
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '3fr minmax(400px, 2fr)',
            gap: '16px',
            height: '380px',
          }}
        >
          <UsageChart isLoading={loadingUsageByDate} />
          <UsageSummary isLoading={loadingSummary} />
        </Box>
      </BoxContent>

      {/* Service Usage */}
      <BoxContent>
        <ContentTitle
          title={t('apiDashboard.service-usage.watermarking')}
          icon={wmIcon}
        />
        <ServiceUsage type="watermarking" isLoading={loadingServiceUsage} />
      </BoxContent>
      <BoxContent>
        <ContentTitle
          title={t('apiDashboard.service-usage.detection')}
          icon={pdIcon}
        />
        <ServiceUsage type="detection" isLoading={loadingServiceUsage} />
      </BoxContent>
    </BoxContainer>
  );
}

export default ApiConsoleDashboardContainer;
