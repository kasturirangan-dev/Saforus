import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
  styled,
} from '@mui/material';
import { MediaConfigs } from '@web-workspace/saforus/common/model';
import inforBigSvg from '../assets/inforBig.svg';
import FileFormatView from './file-format-view';
import { Controller, useFormContext } from 'react-hook-form';
import { DrmPackageOption } from '@web-workspace/saforus/components/multi-drm/create-order/data';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { Trans, useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';

const StyledTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  width: '50%',
}));

const StyledTypographyTitle = styled(Typography)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '2.37rem',
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '-0.01em',
  color: '#272D37',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '0.875px',
  lineHeight: '0.8rem',
  textAlign: 'center',
  letterSpacing: '-0.1px',
  color: '#272D37',
}));

const StyledAlert = styled(Alert)`
  background: #f9f8fb;
  border: 1.5px solid #648ef7;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.04);
  border-radius: 5px;
  padding: 0.45rem 1.54rem;
  & .MuiAlert-message {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 0;
    overflow: hidden;
  }

  & .MuiAlert-icon {
    padding: 0;
    margin-right: 1rem;
  }
`;

const ForensicWatermarkingView = () => {
  const { control, watch } = useFormContext<DrmPackageOption>();
  const useWatermark = watch('useWatermark');
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        background: '#FFFFFF',
        borderRadius: '8px',
        flex: 'none',
        order: 0,
        padding: '1.5rem',
      }}
    >
      <FormControl fullWidth sx={{ gap: '1.5rem' }}>
        <StyledTitle>
          <StyledTypographyTitle variant="h5">
            {t('multiDrm.create-order.packaging-option.forensic-watermarking')}
          </StyledTypographyTitle>
          <Box>
            <Controller
              control={control}
              name={'useWatermark'}
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
                          fontSize: '14px',
                          lineHeight: '20px',
                          letterSpacing: '-0.1px',
                          color: '#5F6D7E',
                        }}
                      >
                        <Trans
                          i18nKey={
                            field.value
                              ? 'multiDrm.create-order.packaging-option.forensic-watermarking-check'
                              : 'multiDrm.create-order.packaging-option.forensic-watermarking-uncheck'
                          }
                          components={[
                            <Box
                              component="span"
                              sx={{ fontWeight: '700' }}
                            ></Box>,
                            <br />,
                          ]}
                        ></Trans>
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
            display: 'flex',
            flexDirection: 'row',
            width: '50%',
          }}
        >
          <FileFormatView
            title={t('multiDrm.create-order.packaging-option.supported-format')}
            tooltipTitle={t('page-watermarking.tooltip.video-title')}
            tooltipContent={t('page-watermarking.tooltip.video-description')}
            fileFormats={MediaConfigs.VIDEO.supportedFormats}
          />
        </Box>
        <StyledAlert
          sx={{ width: '50%' }}
          severity="info"
          icon={<img src={inforBigSvg} alt="info" />}
        >
          <Trans
            i18nKey={
              useWatermark
                ? 'multiDrm.create-order.packaging-option.forensic-watermarking-alert-check'
                : 'multiDrm.create-order.packaging-option.forensic-watermarking-alert-uncheck'
            }
            components={[
              <Box component="span" sx={{ fontWeight: '700' }}></Box>,
              <br />,
            ]}
          ></Trans>
        </StyledAlert>
      </FormControl>
    </Box>
  );
};

export default ForensicWatermarkingView;
