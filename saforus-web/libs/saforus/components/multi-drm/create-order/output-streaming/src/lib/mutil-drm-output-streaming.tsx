import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import Button from '@web-workspace/shared/components/widgets/button';
import { Controller, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import {
  CreateOrderStepsEnum,
  DrmOutputStream,
  SupportedResolution,
  MultiDrmCreateOrderStore,
  IDrmOption,
  DRM_TYPE,
} from '@web-workspace/saforus/components/multi-drm/create-order/data';
import DrmOutputStreamForm from './view/drm-output-stream-form';
import { useOutputStreamData } from './data';
import Icon from '@web-workspace/shared/components/widgets/icon';
import SelectionCodec from './view/selection-codec';
import ResolutionList from './view/resolution-list';
import React, { useEffect } from 'react';
import { isNotEmpty } from '@web-workspace/shared/helpers/strings';

export function MultiDrmOutputStreaming() {
  const { t } = useTranslation();
  const [supportedResolutions, setSupportedResolutions] = React.useState<
    SupportedResolution[]
  >([]);
  const { onSetStep, onSetStepData, commonData, getStepData } = useSnapshot(
    MultiDrmCreateOrderStore
  );
  const drmOptions = commonData.drmOptions as IDrmOption[];
  const drmOption = drmOptions.find((e) => e.drm === DRM_TYPE.PLAY_READY);

  const { methods, handleSubmit, control, setValue, watch, errors, reset } =
    useOutputStreamData();

  useEffect(() => {
    let data = getStepData(
      CreateOrderStepsEnum.OUTPUT_STREAMING
    ) as DrmOutputStream;
    if (!isNotEmpty(data?.videoCodecId)) {
      data = {
        ...data,
        videoCodecId: drmOption?.videoCodecTypeList?.at(0) ?? '',
      };
    }
    if (!isNotEmpty(data?.audioCodecId)) {
      data = {
        ...data,
        audioCodecId: drmOption?.audioCodecTypeList?.at(0) ?? '',
      };
    }

    if (!isNotEmpty(data?.videoBitrate)) {
      data = {
        ...data,
        videoBitrate: drmOption?.frameRateTypeList?.at(0) ?? '',
      };
    }
    reset(data);
  }, []);

  useEffect(() => {
    if (drmOption && drmOption?.resolutionTypeList?.length > 0) {
      const newRes = drmOption?.resolutionTypeList?.map((e) => ({ ...e }));
      newRes.sort((a, b) => {
        if (a.bitrate - b.bitrate < 0) return -1;
        else if (a.bitrate - b.bitrate > 0) return 1;
        else return 0;
      });

      setSupportedResolutions(newRes);
    }
  }, [drmOption]);

  const resolutions = watch('resolutions') as SupportedResolution[];
  const useCodeConfig = watch('useCodeConfig') as boolean;

  const setSelectedResolution = (values: SupportedResolution[]) => {
    setValue('resolutions', values);
  };

  const onSubmit = (value: DrmOutputStream) => {
    const stepperElement = document.getElementById('stepper');
    if (stepperElement) {
      stepperElement.scrollIntoView({ behavior: 'smooth' });
    }
    onSetStepData(CreateOrderStepsEnum.OUTPUT_STREAMING, value);
    onSetStep(CreateOrderStepsEnum.SUBMIT_ORDER);
  };

  const handlePrev = () => {
    const stepperElement = document.getElementById('stepper');
    if (stepperElement) {
      stepperElement.scrollIntoView({ behavior: 'smooth' });
    }
    onSetStep(CreateOrderStepsEnum.CHOOSE_STORAGE);
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <Box
          sx={{
            width: '100%',
            padding: '1.5rem',
            backgroundColor: 'var(--base-white)',
            borderRadius: '0.5rem',
            border: '1px solid #DAE0E6',
            boxShadow: 'var(--shadow-xsm)',
            gap: '1.5rem',
          }}
        >
          <Typography
            color={'var(--gray-700)'}
            variant="h5"
            fontWeight={600}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {t('multiDrm.create-order.output-streaming.stream-type')}
          </Typography>
          <Typography
            color={'var(--gray-50)'}
            variant="body2"
            fontWeight={400}
            sx={{
              marginTop: '0.5rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {t(
              'multiDrm.create-order.output-streaming.stream-type-description'
            )}
          </Typography>
          <DrmOutputStreamForm
            streamFormats={drmOption?.streamingTypeList ?? []}
          />
        </Box>
        <Box
          sx={{
            marginTop: '1.5rem',
            backgroundColor: 'var(--base-white)',
            border: '1px solid #DAE0E6',
            borderRadius: '0.5rem',
            padding: '1.5rem',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Typography
              color={'var(--gray-700)'}
              variant="h5"
              fontWeight={600}
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {t('multiDrm.create-order.output-streaming.codec-and-rate')}
            </Typography>
            <Controller
              control={control}
              name={'useCodeConfig'}
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
                    label={`${t(
                      'multiDrm.create-order.output-streaming.use-code-config'
                    )}`}
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
            <Box sx={{ width: '70%', marginTop: '1.5rem' }}>
              <SelectionCodec
                name={'videoCodecId'}
                control={control}
                title={`${t(
                  'multiDrm.create-order.output-streaming.video-codec'
                )}}`}
                items={drmOption?.videoCodecTypeList ?? []}
                disabled={useCodeConfig}
              />
              <SelectionCodec
                name={'audioCodecId'}
                control={control}
                title={`${t(
                  'multiDrm.create-order.output-streaming.audio-codec'
                )}}`}
                items={drmOption?.audioCodecTypeList ?? []}
                disabled={useCodeConfig}
              />
              <SelectionCodec
                name={'videoBitrate'}
                control={control}
                title={`${t(
                  'multiDrm.create-order.output-streaming.frame-rate'
                )}}`}
                items={drmOption?.frameRateTypeList ?? []}
                disabled={useCodeConfig}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: '1.5rem',
            backgroundColor: 'var(--base-white)',
            border: '1px solid #DAE0E6',
            borderRadius: '0.5rem',
            padding: '1.5rem',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Typography
              color={'var(--gray-700)'}
              variant="h5"
              fontWeight={600}
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {t(
                'multiDrm.create-order.output-streaming.resolution-and-bitrate'
              )}
            </Typography>
            <Typography
              color={'var(--gray-50)'}
              variant="body2"
              fontWeight={400}
              sx={{
                marginTop: '0.5rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {t(
                'multiDrm.create-order.output-streaming.resolution-and-bitrate-description'
              )}
            </Typography>
            <Box sx={{ width: '60%', marginTop: '1.5rem' }}>
              <ResolutionList
                items={supportedResolutions}
                selectedItems={resolutions}
                setSelectedItems={setSelectedResolution}
                isError={Boolean(errors.resolutions)}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1.5rem',
            marginTop: '1.5rem',
            marginBottom: '1.5rem',
            width: '100%',
          }}
        >
          <Button
            fullWidth
            color="secondary"
            sx={{ height: 46 }}
            onClick={handlePrev}
          >
            {t('button.prev')}
          </Button>
          <Button
            fullWidth
            sx={{ height: 46 }}
            color="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {t('button.next')}
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
}

export default MultiDrmOutputStreaming;
