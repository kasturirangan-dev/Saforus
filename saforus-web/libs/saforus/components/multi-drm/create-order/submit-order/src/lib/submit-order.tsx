import { Box, Card, Typography } from '@mui/material';
import { useSubmitOrderData } from './data';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '@web-workspace/shared/components/widgets/button';
import { useSnapshot } from 'valtio';
import {
  CreateOrderStepsEnum,
  DrmOutputStream,
  DrmPackageOption,
  DrmStorage,
  MultiDrmCreateOrderStore,
  SupportedResolution,
} from '@web-workspace/saforus/components/multi-drm/create-order/data';
import DrmTableFile from './view/drm-table-file';
import { useEffect, useState } from 'react';
import { DrmFile } from '@web-workspace/saforus/common/model';
import { randomId } from '@web-workspace/shared/helpers/strings';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { InputFileData, ReqInputFile } from './data/interface';

export function DrmCreateOrderSubmitOrder() {
  const { openDialog, closeDialog } = useSnapshot(DialogStore);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [orderNo, setOrderNo] = useState('');
  const { completed, getStepData, onSetCompleted } = useSnapshot(
    MultiDrmCreateOrderStore
  );
  const {
    methods,
    handleSubmit,
    setValue,
    watch,
    onSubmit,
    responseData,
    loading,
  } = useSubmitOrderData();

  useEffect(() => {
    if (responseData?.isSuccess === true) {
      setValue('originalFiles', watch('files'));
      onSetCompleted(true);
      showToast.success(
        `${t('page-watermarking.submitting-order.message.successful')}`,
        {
          delay: 0,
        }
      );
    }
  }, [responseData]);

  if (loading) {
    openDialog({
      name: DialogType.Loading,
      props: {
        title: t('page-watermarking.loading'),
      },
    });
  } else {
    closeDialog();
  }

  const onNavigateToOrderList = () => {
    navigate(ROUTES.MULTI_DRM_PACKAGING.VIEW_ORDER.path);
  };

  useEffect(() => {
    const step1Data = getStepData(
      CreateOrderStepsEnum.PACKAGING_OPTION
    ) as DrmPackageOption;

    setOrderNo(step1Data.orderNo ?? '');

    const step2Data = getStepData(
      CreateOrderStepsEnum.CHOOSE_STORAGE
    ) as DrmStorage;
    const step3Data = getStepData(
      CreateOrderStepsEnum.OUTPUT_STREAMING
    ) as DrmOutputStream;

    const filesOriginal = [] as DrmFile[];
    const inputFiles = [] as ReqInputFile[];
    step2Data.files.forEach((s3File) => {
      const input: ReqInputFile = {
        fileName: s3File.psnInfoFileNm,
        storageType: 'AWS_S3',
        bucketName: step2Data.inputBucketName,
        cloudRegion: step2Data.inputCloudRegion ?? '',
        pathInBucket: step2Data.inputPath ?? '',
        accessKey: step2Data.inputAccessKey ?? '',
        secretKey: step2Data.inputSecretKey ?? '',
      };
      inputFiles.push(input);

      step3Data.resolutions.forEach((resolution) => {
        const resolu = resolution as SupportedResolution;
        const drmFileTemp = {
          id: randomId(),
          siteName: step2Data.siteName ?? '',
          originalFileName: s3File.psnInfoFileNm,
          fileName: `[${resolu.definition}]${s3File.psnInfoFileNm}`,
          resolution: resolu.resolution,
          bitRate: resolu.bitrate,
          videoCodec: step3Data.videoCodecId,
          audioCodec: step3Data.audioCodecId,
          streamFormats: step3Data.formats,
          watermark: step1Data.useMultiDrm,
          drmType: step1Data.usePlayReady ? 'PLAY_READY' : '',
          storageType: 'AWS_S3',
          fileKey: step2Data.fileKey,
          bucketName: step2Data.inputBucketName,
          cloudRegion: step2Data.inputCloudRegion,
          pathInBucket: step2Data.inputPath,
          accessKey: step2Data.inputAccessKey,
          secretKey: step2Data.inputSecretKey,
          supported: true,
        };
        filesOriginal.push(drmFileTemp as DrmFile);
      });
    });
    setValue('requestFiles', inputFiles);
    setValue('files', filesOriginal);
    setValue('originalFiles', filesOriginal);
  }, []);

  const handlePrev = () => {
    openDialog({
      name: DialogType.CancelOrder,
    });
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <Card
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
            {t('multiDrm.create-order.submit-order.order-no', {
              orderNo: orderNo,
            })}
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
            {t('multiDrm.create-order.submit-order.select-order')}
          </Typography>
          <Box sx={{ maxWidth: 'calc(100vw - 30rem)', marginTop: '1rem' }}>
            <DrmTableFile
              files={watch('originalFiles')}
              selectedFiles={watch('files')}
              setSelectedFiles={(e) => {
                setValue('files', e);
              }}
              selectable={!completed}
            />
          </Box>
        </Card>
        {completed === false && (
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
              {t('button.cancel')}
            </Button>
            <Button
              fullWidth
              sx={{ height: 46 }}
              color="primary"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              {t('multiDrm.create-order.steps.submit-order')}
            </Button>
          </Box>
        )}
        {completed && (
          <Box
            sx={{
              marginTop: '1.5rem',
              marginBottom: '2rem',
              width: '100%',
            }}
          >
            <Button
              color="secondary"
              sx={{ height: 46 }}
              onClick={onNavigateToOrderList}
            >
              {t('page-watermarking.submitted-order.view-order-list')}
            </Button>
          </Box>
        )}
      </FormProvider>
    </Box>
  );
}

export default DrmCreateOrderSubmitOrder;
