import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  styled,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { DrmOutputStream } from '@web-workspace/saforus/components/multi-drm/create-order/data';
import Icon from '@web-workspace/shared/components/widgets/icon';
import Input from '@web-workspace/shared/components/widgets/input';
import Tooltip from '@web-workspace/shared/components/widgets/tooltip';
import FileFormatView from './file-format-view';
import WarningIcon from '../assets/warning.svg';

const StyledAlert = styled(Alert)`
  background: #f9f8fb;
  border: 1.5px solid #648ef7;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.04);
  border-radius: 5px;
  padding: 13px 24px;

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

const DrmOutputStreamForm = ({
  streamFormats,
}: {
  streamFormats: string[];
}) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<DrmOutputStream>();

  const formats = watch('formats') as string[];

  return (
    <Box
      sx={{
        width: { xs: '100%', md: '70%' },
        marginTop: '1.5rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FileFormatView
        name={'formats'}
        control={control}
        title={`${t('multiDrm.create-order.output-streaming.stream-format')}*`}
        tooltipTitle={t('multiDrm.tooltip.stream-format')}
        tooltipContent={t('multiDrm.tooltip.stream-format-description')}
        streamFormats={streamFormats}
      />
      <Grid container columns={5}>
        <Grid
          item
          xs={1.5}
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            backgroundColor: 'var(--neutral-600)',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            flexDirection: 'column',
            border: '1px solid #DAE0E6',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '1rem',
              width: '100%',
              height: '100%',
            }}
          >
            <Typography
              color={'var(--gray-700)'}
              variant="body2"
              fontWeight={500}
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {t('multiDrm.create-order.output-streaming.segment-duration')}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={3.5}
          alignItems="center"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'var(--base-white)',
            border: '1px solid #DAE0E6',
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '16px 16px 16px 10px',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: '70%',
              }}
            >
              <Controller
                control={control}
                name={'duration'}
                render={({ field }) => {
                  return (
                    <Input
                      fullWidth
                      {...field}
                      placeholder={'5 - 60 sec'}
                      errorMessage={
                        errors?.duration?.message && t(errors.duration.message)
                      }
                    />
                  );
                }}
              />
            </Box>
            <Tooltip
              title={`${t('multiDrm.tooltip.duration')}`}
              titleHeader={`${t('multiDrm.tooltip.duration')}`}
              description={`${t('multiDrm.tooltip.duration-description')}`}
            >
              <Icon size={20} name="information" color={'var(--gray-25)'} />
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
      <Grid container columns={5}>
        <Grid
          item
          xs={1.5}
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            backgroundColor: 'var(--neutral-600)',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            flexDirection: 'column',
            border: '1px solid #DAE0E6',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '1rem',
              width: '100%',
              height: '100%',
            }}
          >
            <Typography
              color={'var(--gray-700)'}
              variant="body2"
              fontWeight={500}
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {t('multiDrm.create-order.output-streaming.dash-option')}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={3.5}
          alignItems="center"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'var(--base-white)',
            border: '1px solid #DAE0E6',
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '16px 16px 16px 10px',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ width: '70%' }}>
              <Box sx={{ width: '100%' }}>
                <Controller
                  control={control}
                  name={'applyAverageBand'}
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
                        label={'Apply average bandwidth to MPD'}
                        control={
                          <Checkbox
                            icon={<Icon name="square_uncheck" size={20} />}
                            checkedIcon={
                              <Icon name="square_checked" size={20} />
                            }
                            checked={field.value}
                          />
                        }
                      />
                    );
                  }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Controller
                  control={control}
                  name={'minBandTime'}
                  render={({ field }) => {
                    return (
                      <Input
                        style={{ marginTop: '1.5rem' }}
                        fullWidth
                        label={`${t(
                          'multiDrm.create-order.output-streaming.min-buffer-time'
                        )}`}
                        {...field}
                        placeholder={'2'}
                        errorMessage={
                          errors?.minBandTime?.message &&
                          t(errors?.minBandTime?.message)
                        }
                      />
                    );
                  }}
                />
              </Box>
            </Box>
            <Tooltip
              title={`${t('multiDrm.tooltip.mpd')}`}
              titleHeader={`${t('multiDrm.tooltip.mpd')}`}
              description={`${t('multiDrm.tooltip.mpd-description')}`}
            >
              <Icon size={20} name="information" color={'var(--gray-25)'} />
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
      <Box>
        {formats.length < 1 && (
          <StyledAlert
            sx={{
              marginTop: '1rem',
              border: '1.5px solid #FEB8AE',
              backgroundColor: 'var(--red-50)',
            }}
            severity="error"
            icon={
              <img
                src={WarningIcon}
                alt="Warning"
                title="Warning"
                width={20}
                height={22}
                loading="lazy"
              />
            }
          >
            {t('multiDrm.message.least-one-of-streaming')}
          </StyledAlert>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(DrmOutputStreamForm);
