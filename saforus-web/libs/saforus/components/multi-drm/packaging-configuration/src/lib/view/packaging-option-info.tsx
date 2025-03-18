import { Box, styled } from '@mui/material';
import React from 'react';

import LinearProgressWithLabel from './linear-progress-with-label';
import { useTranslation } from 'react-i18next';

const StyledTitle = styled(Box)(({ theme }) => ({
  background: '#EAEBF0',
  border: '1px solid var(--neutral-750)',
  padding: '1rem',
  width: '12.5rem',
  borderRight: 'none',
  borderBottom: 'none',
}));

const StyledContentTitle = styled(Box)(({ theme }) => ({
  background: 'var(--base-white)',
  border: '1px solid var(--neutral-750)',
  padding: '1rem',
  flexGrow: '1',
  borderBottom: 'none',
}));

const PackagingOptionInfoView = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ width: '50%' }}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <StyledTitle>
          {' '}
          {t('multiDrm.packaging-configuration.file-name')}
        </StyledTitle>
        <StyledContentTitle> [I_live_alone]Mang kiyong can </StyledContentTitle>
      </Box>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <StyledTitle>
          {t('multiDrm.packaging-configuration.input-file-path')}
        </StyledTitle>
        <StyledContentTitle> wm-contents/ </StyledContentTitle>
      </Box>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <StyledTitle>
          {t('multiDrm.packaging-configuration.output-file-path')}
        </StyledTitle>
        <StyledContentTitle> wm-contents/output</StyledContentTitle>
      </Box>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <StyledTitle>
          {t('multiDrm.packaging-configuration.region')}
        </StyledTitle>
        <StyledContentTitle> Oregin (us-west-2) </StyledContentTitle>
      </Box>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <StyledTitle>
          {t('multiDrm.packaging-configuration.site-name')}
        </StyledTitle>
        <StyledContentTitle> FitCrew </StyledContentTitle>
      </Box>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <StyledTitle sx={{ borderBottom: '1px solid #DAE0E6' }}>
          {t('multiDrm.packaging-configuration.status')}
        </StyledTitle>
        <Box
          sx={{
            background: 'var(--base-white)',
            border: '1px solid var(--neutral-750)',
            padding: '1rem',
            flexGrow: '1',
          }}
        >
          <LinearProgressWithLabel value={75} />
        </Box>
      </Box>
    </Box>
  );
};

export default PackagingOptionInfoView;
