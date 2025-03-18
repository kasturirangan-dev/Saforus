import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const StyleStreamingTypeContent = styled(Box)(({ theme }) => ({
  background: 'var(--base-white)',
  border: '1px solid var(--neutral-750)',
  padding: '1rem',
  width: '50%',
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column',
}));

const PackagingOptionStreamingTypeView = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ width: '50%' }}>
      <Typography
        sx={{
          fontWeight: '600',
          mb: '1rem',
          fontSize: '1rem',
          lineHeight: '1.5rem',
          marginBottom: '0.3rem',
        }}
      >
        {t('multiDrm.packaging-configuration.streaming-type')}
      </Typography>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box sx={{ display: 'flex', width: '50%' }}>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <StyleStreamingTypeContent>
              <Typography
                sx={{
                  color: 'var(--gray-50)',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                }}
              >
                Streaming Format
              </Typography>
              <Typography
                sx={{ color: '#272D37', fontSize: '1rem', fontWeight: '500' }}
              >
                HLS, DASH
              </Typography>
            </StyleStreamingTypeContent>

            <StyleStreamingTypeContent sx={{ borderLeft: 'none' }}>
              <Typography
                sx={{
                  color: 'var(--gray-50)',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                }}
              >
                Segment Duration
              </Typography>
              <Typography
                sx={{ color: '#272D37', fontSize: '1rem', fontWeight: '500' }}
              >
                --
              </Typography>
            </StyleStreamingTypeContent>
          </Box>
        </Box>
        <StyleStreamingTypeContent sx={{ borderLeft: 'none' }}>
          <Typography
            sx={{
              color: 'var(--gray-50)',
              fontSize: '0.875rem',
              fontWeight: '600',
            }}
          >
            Dash Option
          </Typography>
          <Typography
            sx={{ color: '#272D37', fontSize: '1rem', fontWeight: '500' }}
          >
            Apply average bandwidth to MPD : False
          </Typography>
          <Typography
            sx={{ color: '#272D37', fontSize: '1rem', fontWeight: '500' }}
          >
            Minimum Buffer Time: 2
          </Typography>
        </StyleStreamingTypeContent>
      </Box>
    </Box>
  );
};

export default PackagingOptionStreamingTypeView;
