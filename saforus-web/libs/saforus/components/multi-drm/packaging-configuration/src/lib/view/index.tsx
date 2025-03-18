import { Box, Card, Typography } from '@mui/material';
import { memo, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import PackagingOptionInfoView from './packaging-option-info';
import PackagingOptionStreamingTypeView from './streaming-type';
import PackagingOptionVideoAudioView from './video-audio-configuration';
import PackagingOptionView from './packaging-option';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { useTranslation } from 'react-i18next';

const PackagingConfigurationView = () => {
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { t } = useTranslation();
  useEffect(() => {
    setMainLayoutCss({ height: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);
  return (
    <Card
      sx={{
        mt: '1.5rem',
        background: 'var(--base-white)',
        borderRadius: '0.5rem',
        padding: '1.5rem',
      }}
    >
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '1.75rem',
          lineHeight: '2.375rem',
          mb: '0.25rem',
        }}
      >
        {t('multiDrm.packaging-configuration.title')}
      </Typography>
      <Typography
        sx={{
          color: 'var(--gray-25)',
          fontWeight: '400',
          fontSize: '0.9375rem',
          lineHeight: '1.375rem',
          mb: '1.5rem',
        }}
      >
        Requested by Dave Jones on 2023-04-01 10:32:22
      </Typography>
      <Box
        sx={{
          background: '#F9F9F9',
          borderRadius: '5px',
          padding: '1.5rem',
          gap: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <PackagingOptionInfoView />
        <PackagingOptionView />
        <PackagingOptionStreamingTypeView />
        <PackagingOptionVideoAudioView />
      </Box>
    </Card>
  );
};
export default memo(PackagingConfigurationView);
