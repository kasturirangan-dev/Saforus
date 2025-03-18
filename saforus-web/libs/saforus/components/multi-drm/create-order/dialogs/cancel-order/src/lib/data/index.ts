import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  CreateOrderStepsEnum,
  MultiDrmCreateOrderStore,
} from '@web-workspace/saforus/components/multi-drm/create-order/data';

const useCancelOrderData = ({ onClose }: { onClose: () => void }) => {
  const { onSetStep, onSetStepData } = useSnapshot(
    MultiDrmCreateOrderStore
  );
  const [checkboxValue, setCheckboxValue] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(event.target.checked);
  };

  const onCancelOrder = () => {
    onSetStepData(CreateOrderStepsEnum.PACKAGING_OPTION, {
      useWatermark: true,
      useMultiDrm: true,
      useWideVine: false,
      usePlayReady: true,
      useFairPlay: false,
      orderNo: '',
    });

    onSetStepData(CreateOrderStepsEnum.CHOOSE_STORAGE, {
      storageType: 'AWS_S3',
      fileKey: '',
      siteId: '',
      siteName: '',
      inputStorageId: '',
      inputBucketName: '',
      inputCloudRegion: '',
      inputAccessKey: '',
      inputSecretKey: '',
      outputBucketName: '',
      outputStorageId: '',
      outputCloudRegion: '',
      inputPath: '',
      outputPath: '',
      outputAccessKey: '',
      outputSecretKey: '',
      originalFiles: [],
      files: [],
      isCreatedFolder: false,
    });

    onSetStepData(CreateOrderStepsEnum.OUTPUT_STREAMING, {
      formats: ['DASH'],
      duration: 0,
      applyAverageBand: false,
      minBandTime: 0,
      useCodeConfig: true,
      videoCodecId: '',
      audioCodecId: '',
      videoBitrate: '',
      resolutions: [],
    })
    onSetStepData(CreateOrderStepsEnum.SUBMIT_ORDER, {
      files: [],
      originalFiles: [],
    })

    onSetStep(CreateOrderStepsEnum.PACKAGING_OPTION);
    onClose();
  };

  const onPrev = () => {
    onSetStep(CreateOrderStepsEnum.OUTPUT_STREAMING);
    onClose();
  };

  return {
    checkboxValue,
    handleCheckboxChange,
    onCancelOrder,
    onPrev,
  };
};

export default useCancelOrderData;
