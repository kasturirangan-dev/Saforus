import { useState } from 'react';
import { Box, Divider, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  ApiDashboardStore,
  useApiDashboardData,
} from '@web-workspace/api-console/components/dashboard/data';
import DashboardFilter from '@web-workspace/api-console/components/dashboard/filter';
import {
  UsageChart,
  UsageSummary,
  UsageProgress,
} from '@web-workspace/api-console/components/dashboard/usage-overview';
import ServiceUsage from '@web-workspace/api-console/components/dashboard/service-usage';
import { PageTitle } from '@web-workspace/api-console/common/views';
import ApiKeyListView from './views/api-key-usage';
import Summary from './views/summary';
import ProcessingFile from './views/processing-file';
import { useSnapshot } from 'valtio';
import { ChanelType } from '@web-workspace/api-console/common/model';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

const BoxContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

export function ApiConsoleDashboardContainer() {
  const { t } = useTranslation();
  const {
    loadingCurrentCycle,
    loadingOverview,
    loadingServiceUsage,
    loadingKeyUsageSummary,
  } = useApiDashboardData();
  const { searchQuery } = useSnapshot(ApiDashboardStore);

  return (
    <BoxContainer>
      <PageTitle
        sx={{ border: 'none', padding: '0px' }}
        title={t('apiDashboard.title')}
      ></PageTitle>

      {/* Current Plan */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}
      >
        <Summary loading={loadingCurrentCycle} />
        <UsageProgress loading={loadingCurrentCycle} />
      </Box>

      {/* Usage Overview */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
        }}
      >
        <Typography
          fontSize="20px"
          fontWeight={600}
          lineHeight="26px"
          textTransform="uppercase"
          color="var(--neutral-950)"
          whiteSpace="nowrap"
        >
          {t('apiDashboard.usage-overview.title')}
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            height: '1px',
            backgroundColor: '#EAEBF0',
          }}
        />
        <Divider />
      </Box>

      <DashboardFilter />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}
      >
        <UsageChart isLoading={loadingOverview} />
        <UsageSummary isLoading={loadingOverview} />
      </Box>

      {/* Service Usage */}
      <BoxContent>
        <Typography
          sx={{
            fontWeight: '600',
            fontSize: '20px',
            lineHeight: '26px',
            color: 'var(--gray-700)',
          }}
        >
          {t('apiDashboard.usage-overview.filetype')}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
            width: '100%',
          }}
        >
          <Box
            sx={{
              background: 'var(--base-white)',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            <ProcessingFile loading={loadingServiceUsage} />
          </Box>

          <ServiceUsage type="watermarking" isLoading={loadingServiceUsage} />
          <ServiceUsage type="detection" isLoading={loadingServiceUsage} />
        </Box>
      </BoxContent>

      {/* API Usage */}
      {searchQuery.usageType === ChanelType.API && (
        <ApiKeyListView loading={loadingKeyUsageSummary} />
      )}
    </BoxContainer>
  );
}

export default ApiConsoleDashboardContainer;
