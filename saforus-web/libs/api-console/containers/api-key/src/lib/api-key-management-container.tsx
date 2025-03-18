import { Box, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@web-workspace/api-console/common/views';
import {
  ApiKeyStore,
  useApiKeyData,
} from '@web-workspace/api-console/components/api-key/data';
import { useSnapshot } from 'valtio';
import ApiKeyListView from './views/api-key-list-view';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
}));

export function ApiKeyManagementContainer() {
  const { t } = useTranslation();

  const { isFetching, onPageChange } = useApiKeyData();
  const { apiKeys, totalApiKeys } = useSnapshot(ApiKeyStore);

  return (
    <BoxContainer>
      <PageTitle title={t('apiKeyManagement.title')}>
        <Typography whiteSpace="pre-line">
          {t('apiKeyManagement.description')}
        </Typography>
      </PageTitle>

      {/* Api key tabel */}
      <ApiKeyListView
        apiKeys={[...apiKeys]}
        total={totalApiKeys}
        onPageChange={onPageChange}
        loading={isFetching}
      />
    </BoxContainer>
  );
}

export default ApiKeyManagementContainer;
