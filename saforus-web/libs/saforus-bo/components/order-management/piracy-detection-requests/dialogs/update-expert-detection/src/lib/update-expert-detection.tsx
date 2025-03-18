import React, { useEffect, useState } from 'react';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import SecurityIcon from './assets/security.svg';
import { useTranslation } from 'react-i18next';
import Input from '@web-workspace/shared/components/widgets/input';
import Button from '@web-workspace/shared/components/widgets/button';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  styled,
} from '@mui/material';
import useUpdateExpertDetection from './data';
import { Controller } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import {
  PiracyDetailData,
  PiracyDetectionRequestsStore,
} from '@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/data';
import CommonStore from '@web-workspace/saforus-bo/common/data';

const CustomLabel = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === 'light' ? 'var(--gray-700)' : 'var(--neutral-200)',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '-0.1px',
  marginBottom: '6px',
  transition: theme.transitions.create(['color']),
  '&.Mui-disabled': {
    borderColor: 'var(--neutral-700)',
  },
  '&.Mui-focused': {
    borderColor: 'var(--purple-600)',
  },
}));

type UpdateExpertDetectionDialogViewProps = {
  onClose: () => void;
  piracyOrder: PiracyDetailData;
};

const ExpertDetectionDialogView: React.FC<
  UpdateExpertDetectionDialogViewProps
> = ({ onClose, piracyOrder }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    control,
    getValues,
    setValue,
  } = useUpdateExpertDetection({ onClose, piracyOrder });
  const { expertTypes } = useSnapshot(PiracyDetectionRequestsStore);
  const { orderStatusTypeList: status } = useSnapshot(CommonStore);

  const [startInput, setStartInput] = React.useState('');

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '450px',
        },
      }}
      icon={
        <img
          src={SecurityIcon}
          alt="expert icon"
          width="32"
          height="32"
          loading="lazy"
        />
      }
      onClose={onClose}
      footer={
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {t('button.cancel')}
          </Button>
          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            fullWidth
            color="primary"
            sx={{ height: 46 }}
            type="submit"
          >
            {t('button.update')}
          </LoadingButton>
        </>
      }
      dialogContent={
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <Typography variant="body2" fontSize={'20px'} fontWeight={500}>
                {t(
                  'orderManagement.piracy-detection-requests.update-expert-detection'
                )}
              </Typography>
              <Typography
                sx={{
                  color: 'var(--gray-25)',
                  fontWeight: '400',
                  fontSize: '0.9375rem',
                  lineHeight: '1.375rem',
                }}
              >
                {t(
                  'orderManagement.piracy-detection-requests.update-expert-detection-desc'
                )}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <Input
                  style={{ width: '100%' }}
                  label={`${t('page-watermarking.table.watermark-code')}*`}
                  placeholder={`${t(
                    'orderManagement.piracy-detection-requests.place-holder-watermarking-code'
                  )}`}
                  {...register('code', {
                    onChange: (e: any) => {
                      if (isNaN(e.target.value)) {
                        e.target.value = startInput.trim();
                      }
                      if (e.target.value <= 0) {
                        e.target.value = '';
                      }
                    },
                  })}
                  onKeyDown={(e: any) => {
                    if (
                      isNaN(e.target.value) ||
                      e.code === 'Space' ||
                      e.code === 'KeyE'
                    ) {
                      e.preventDefault();
                    } else {
                      setStartInput(e.target.value);
                    }
                  }}
                  errorMessage={
                    errors?.code?.message
                      ? `${t(`${errors?.code?.message}`)}`
                      : ''
                  }
                />
                <Controller
                  name={'type'}
                  control={control}
                  render={({ field }) => (
                    <FormControl error={!!errors.type}>
                      <CustomLabel>
                        {`${t(
                          'orderManagement.piracy-detection-requests.detection-type'
                        )}*`}
                      </CustomLabel>
                      <Select
                        {...field}
                        value={getValues('type')}
                        sx={{ width: '100%', height: 40 }}
                        onChange={(event: SelectChangeEvent) => {
                          setValue('type', event.target.value);
                        }}
                      >
                        {expertTypes?.map((el, index) => {
                          return (
                            <MenuItem key={index} value={el.value}>
                              {el.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText
                        sx={{
                          width: '100%',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '400',
                          lineHeight: '20px',
                          letterSpacing: '-0.1px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          color: 'var(--red-600)',
                          ml: '0',
                        }}
                      >
                        {errors.type?.message
                          ? t(`${errors.type?.message}`)
                          : ' '}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name={'status'}
                  control={control}
                  render={({ field }) => (
                    <FormControl error={!!errors.type}>
                      <CustomLabel>
                        {`${t(
                          'orderManagement.piracy-detection-requests.detection-status'
                        )}*`}
                      </CustomLabel>
                      <Select
                        {...field}
                        value={getValues('status')}
                        sx={{ width: '100%', height: 40 }}
                        onChange={(event: SelectChangeEvent) => {
                          setValue('status', event.target.value);
                        }}
                      >
                        {status?.map((el, index) => {
                          if (el.value === 'ALL') {
                            return null;
                          }
                          return (
                            <MenuItem key={index} value={el.value}>
                              {el.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText
                        sx={{
                          width: '100%',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '400',
                          lineHeight: '20px',
                          letterSpacing: '-0.1px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          color: 'var(--red-600)',
                          ml: '0',
                        }}
                      >
                        {errors.status?.message
                          ? t(`${errors.status?.message}`)
                          : ' '}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Box>
            </Box>
          </form>
        </Box>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
};

export default ExpertDetectionDialogView;
