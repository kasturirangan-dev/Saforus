import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
  styled,
} from '@mui/material';
import WideVine from '../assets/WIDEVINE.svg';
import PlayReady from '../assets/PlayReady.svg';
import Apple from '../assets/Apple.svg';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import {
  DrmPackageOption,
  DRM_TYPE,
  IDrmOption,
} from '@web-workspace/saforus/components/multi-drm/create-order/data';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { useEffect } from 'react';
import React from 'react';
const StyledTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '50%',
  height: '86px',
}));

const StyledTypographyTitle = styled(Typography)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '38px',
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '-0.01em',
  color: '#272D37',
}));

const MultiDrmView = ({ drmOptions }: { drmOptions: IDrmOption[] }) => {
  const { t } = useTranslation();
  const { control, watch, setValue } = useFormContext<DrmPackageOption>();
  const [wideVineOption, setWideVineOption] =
    React.useState<IDrmOption | null>();
  const [playReadyOption, setPlayReadyOption] =
    React.useState<IDrmOption | null>();
  const [fairPlayOption, setFairPlayOption] =
    React.useState<IDrmOption | null>();

  const useMultiDrm = watch('useMultiDrm');

  useEffect(() => {
    if (drmOptions && drmOptions.length > 0) {
      const wideVine = drmOptions.find((e) => e.drm === DRM_TYPE.WIDE_VINE);
      const playReady = drmOptions.find((e) => e.drm === DRM_TYPE.PLAY_READY);
      const fairPlay = drmOptions.find((e) => e.drm === DRM_TYPE.FAIR_PLAY);

      setWideVineOption(wideVine);
      setPlayReadyOption(playReady);
      setFairPlayOption(fairPlay);
    }
  }, [drmOptions]);

  useEffect(() => {
    if (useMultiDrm) {
      const wideVine = drmOptions.find((e) => e.drm === DRM_TYPE.WIDE_VINE);
      const playReady = drmOptions.find((e) => e.drm === DRM_TYPE.PLAY_READY);
      const fairPlay = drmOptions.find((e) => e.drm === DRM_TYPE.FAIR_PLAY);

      setValue('useWideVine', wideVine?.isActive === true);
      setValue('usePlayReady', playReady?.isActive === true);
      setValue('useFairPlay', fairPlay?.isActive === true);
    } else {
      setValue('useWideVine', false);
      setValue('usePlayReady', false);
      setValue('useFairPlay', false);
    }
  }, [useMultiDrm, drmOptions]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '1.5rem',
        background: 'var(--base-white)',
        borderRadius: '8px',
        flex: 'none',
        order: 1,
      }}
    >
      <FormControl fullWidth sx={{ gap: '24px', height: '716px' }}>
        <StyledTitle>
          <StyledTypographyTitle variant="h5">
            {t('multiDrm.create-order.packaging-option.multi-drm')}
          </StyledTypographyTitle>
          <Box>
            <Controller
              control={control}
              name={'useMultiDrm'}
              render={({ field }) => {
                return (
                  <FormControlLabel
                    {...field}
                    sx={{
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '24px',
                      letterSpacing: '-0.1px',
                      color: 'var(--gray-700)',
                    }}
                    label={
                      <Typography
                        sx={{
                          fontStyle: 'normal',
                          fontWeight: 400,
                          fontSize: '0.875rem',
                          lineHeight: '1.25rem',
                          letterSpacing: '-0.1px',
                          color: '#5F6D7E',
                        }}
                      >
                        {t(
                          'multiDrm.create-order.packaging-option.multi-drm-check'
                        )}
                      </Typography>
                    }
                    control={
                      <Checkbox
                        icon={<Icon name="square_uncheck" size={20} />}
                        checkedIcon={<Icon name="square_checked" size={20} />}
                        checked={field.value}
                      />
                    }
                  />
                );
              }}
            />
          </Box>
        </StyledTitle>
        <Box
          sx={{
            padding: '1rem',
            width: '50%',
            background: '#F9F8FB',
            border: '1.5px solid #648EF7',
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.04)',
            borderRadius: '5px',
            opacity: wideVineOption?.isActive ? '1' : '0.5',
          }}
        >
          <Controller
            control={control}
            name={'useWideVine'}
            render={({ field }) => {
              return (
                <FormControlLabel
                  {...field}
                  disabled={!wideVineOption?.isActive}
                  sx={{ margin: '0px' }}
                  label={
                    <Box sx={{ marginLeft: '1.5rem' }}>
                      <img src={WideVine} alt="WideVine" loading="lazy" />
                      <Typography
                        sx={{
                          fontStyle: 'normal',
                          fontWeight: 400,
                          fontSize: '0.875rem',
                          lineHeight: '1.25rem',
                          marginTop: '0.78rem',
                          color: 'var(--gray-50)',
                        }}
                      >
                        -{' '}
                        {t('multiDrm.create-order.packaging-option.streaming')}:
                        <b> {wideVineOption?.streamingTypeList?.join(', ')}</b>{' '}
                        <br />- Container:{' '}
                        <b>{wideVineOption?.containerTypeList?.join(', ')}</b>{' '}
                        <br />-{' '}
                        {t('multiDrm.create-order.packaging-option.video')}:{' '}
                        <b>{wideVineOption?.videoCodecTypeList?.join(', ')}</b>{' '}
                        <br />-{' '}
                        {t('multiDrm.create-order.packaging-option.audio')}:{' '}
                        {wideVineOption?.audioCodecTypeList?.join(', ')}
                      </Typography>
                    </Box>
                  }
                  control={
                    <Checkbox
                      icon={<Icon name="square_uncheck" size={20} />}
                      checkedIcon={<Icon name="square_checked" size={20} />}
                      checked={field.value}
                    />
                  }
                />
              );
            }}
          />
        </Box>
        <Box
          sx={{
            padding: '1rem',
            width: '50%',
            background: '#F9F8FB',
            border: '1.5px solid #648EF7',
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.04)',
            borderRadius: '5px',
            opacity: playReadyOption?.isActive ? '1' : '0.5',
          }}
        >
          <Controller
            control={control}
            name={'usePlayReady'}
            render={({ field }) => {
              return (
                <FormControlLabel
                  {...field}
                  disabled={!playReadyOption?.isActive}
                  sx={{ margin: '0px' }}
                  label={
                    <Box sx={{ marginLeft: '1.5rem' }}>
                      <img src={PlayReady} alt="PlayReady" loading="lazy" />
                      <Typography
                        sx={{
                          fontStyle: 'normal',
                          fontWeight: 400,
                          fontSize: '0.875rem',
                          lineHeight: '1.25rem',
                          marginTop: '0.78rem',
                          color: 'var(--gray-50)',
                        }}
                      >
                        -{' '}
                        {t('multiDrm.create-order.packaging-option.streaming')}:
                        <b> {playReadyOption?.streamingTypeList?.join(', ')}</b>
                        <br />- Container:{' '}
                        <b>
                          {playReadyOption?.containerTypeList?.join(', ')}
                        </b>{' '}
                        <br />-{' '}
                        {t('multiDrm.create-order.packaging-option.video')}:{' '}
                        <b>{playReadyOption?.videoCodecTypeList?.join(', ')}</b>{' '}
                        <br />-{' '}
                        {t('multiDrm.create-order.packaging-option.audio')}:{' '}
                        {playReadyOption?.audioCodecTypeList?.join(', ')}
                      </Typography>
                    </Box>
                  }
                  control={
                    <Checkbox
                      icon={<Icon name="square_uncheck" size={20} />}
                      checkedIcon={<Icon name="square_checked" size={20} />}
                      checked={field.value}
                    />
                  }
                />
              );
            }}
          />
        </Box>
        <Box
          sx={{
            padding: '1rem',
            width: '50%',
            background: '#F9F8FB',
            border: '1.5px solid #648EF7',
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.04)',
            borderRadius: '5px',
            opacity: fairPlayOption?.isActive ? '1' : '0.5',
          }}
        >
          <Controller
            control={control}
            name={'useFairPlay'}
            render={({ field }) => {
              return (
                <FormControlLabel
                  {...field}
                  sx={{ margin: '0px' }}
                  disabled={!fairPlayOption?.isActive}
                  label={
                    <Box sx={{ marginLeft: '1.5rem' }}>
                      <img src={Apple} alt="Apple" loading="lazy" />
                      <Typography
                        sx={{
                          fontStyle: 'normal',
                          fontWeight: 400,
                          fontSize: '0.875rem',
                          lineHeight: '1.25rem',
                          marginTop: '0.78rem',
                          color: 'var(--gray-50)',
                        }}
                      >
                        -{' '}
                        {t('multiDrm.create-order.packaging-option.streaming')}:
                        <b> {fairPlayOption?.streamingTypeList?.join(', ')}</b>{' '}
                        <br />- Container:
                        <b> {fairPlayOption?.containerTypeList?.join(', ')}</b>
                        <br />-{' '}
                        {t(
                          'multiDrm.create-order.packaging-option.video'
                        )}:{' '}
                        <b> {fairPlayOption?.videoCodecTypeList?.join(', ')}</b>{' '}
                        <br />-{' '}
                        {t('multiDrm.create-order.packaging-option.audio')}:{' '}
                        {fairPlayOption?.audioCodecTypeList?.join(', ')}
                      </Typography>
                    </Box>
                  }
                  control={
                    <Checkbox
                      icon={<Icon name="square_uncheck" size={20} />}
                      checkedIcon={<Icon name="square_checked" size={20} />}
                      checked={field.value}
                    />
                  }
                />
              );
            }}
          />
        </Box>
      </FormControl>
    </Box>
  );
};

export default MultiDrmView;
