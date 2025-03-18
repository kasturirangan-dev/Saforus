import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import AddIcon from './assets/add.svg';
import { useTranslation } from 'react-i18next';

const ContainerBox = styled(Box)`
  border: 1px dashed var(--neutral-700);
  border-radius: 10px;
  width: 100%;
  padding: 1.5rem;
  cursor: pointer;
  margin-top: 1.5rem;
`;

const StoragesEmptyList: React.FC<{ siteId: number; onAdd: () => void }> = ({
  siteId,
  onAdd,
}) => {
  const { t } = useTranslation();

  return (
    <ContainerBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      onClick={onAdd}
    >
      <img
        src={AddIcon}
        alt="Add Storage"
        title="Add Storage"
        width={40}
        height={40}
        loading="lazy"
      />
      <Typography
        variant="h4"
        sx={{ marginBottom: '0.25rem', marginTop: '1rem' }}
      >
        {t('settings-pages.storage.add-storage')}
      </Typography>
      <Typography sx={{ marginBottom: 0, color: 'var(--gray-25)' }}>
        {t('settings-pages.storage.add-storage-description')}
      </Typography>
    </ContainerBox>
  );
};

export default StoragesEmptyList;
