import { yupResolver } from '@hookform/resolvers/yup';
import { DrmFile } from '@web-workspace/saforus/common/model';
import {
  CreateOrderStepsEnum,
  DrmOutputStream,
  DrmPackageOption,
  DrmStorage,
  DrmSubmitOrder,
  DrmSubmitOrderSchema,
  MultiDrmCreateOrderStore,
} from '@web-workspace/saforus/components/multi-drm/create-order/data';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { InputFileData, OutputFileData, ReqInputFile } from './interface';
import { apiPost } from '@web-workspace/shared/api/http-client';
import _ from 'lodash-es';

const POST_DRM_ORDER = '/api/v1/drm-common/common/packager';

export const useSubmitOrderData = () => {
  const { getStepData } = useSnapshot(MultiDrmCreateOrderStore);

  const [loading, setLoading] = React.useState(false);
  const [responseData, setResponseData] = React.useState({});

  const methods = useForm({
    defaultValues: {
      files: [] as DrmFile[],
      originalFiles: [] as DrmFile[],
      requestFiles: [] as ReqInputFile[],
    },
    resolver: yupResolver(DrmSubmitOrderSchema),
  });

  const onSubmit = async (data: DrmSubmitOrder) => {
    setLoading(true);
    try {
      const formData = new FormData();

      const step1Data = getStepData(
        CreateOrderStepsEnum.PACKAGING_OPTION
      ) as DrmPackageOption;

      const step2Data = getStepData(
        CreateOrderStepsEnum.CHOOSE_STORAGE
      ) as DrmStorage;

      const step3Data = getStepData(
        CreateOrderStepsEnum.OUTPUT_STREAMING
      ) as DrmOutputStream;

      const resolutions = step3Data.resolutions.map((item) => {
        return {
          id: item.id,
          definition: item.definition,
          resolution: item.resolution,
          bitrate: item.bitrate,
        };
      });

      const outputPath = step2Data.outputPath.replace(/^\/+|\/+$/gm, '');

      const outputStorage: OutputFileData = {
        storageType: step2Data.storageType ?? 'AWS_S3',
        bucketName: step2Data.outputBucketName,
        cloudRegion: step2Data.outputCloudRegion ?? 'us-east-1',
        pathInBucket: outputPath,
        accessKey: step2Data.outputAccessKey ?? '',
        secretKey: step2Data.outputSecretKey ?? '',
      };
      const files = data.requestFiles as ReqInputFile[];
      const reqFiles: InputFileData[] = [];

      files.forEach((file) => {
        reqFiles.push({
          streamingTypeList: step3Data.formats ?? ['DASH'],
          fileType: 'VIDEO',
          segmentDuration: step3Data.duration ?? 0,
          applyAverageBandWidthToMPD: step3Data.applyAverageBand ?? false,
          minBufferTime: step3Data.minBandTime ?? 0,
          videoCodecType: step3Data.videoCodecId ?? '',
          audioCodecType: step3Data.audioCodecId ?? '',
          frameRateType: step3Data.videoBitrate ?? '',
          resolutionType: resolutions,
          storageType: file.storageType ?? 'AWS_S3',
          fileName: file.fileName ?? '',
          bucketName: file.bucketName ?? '',
          cloudRegion: file.cloudRegion ?? '',
          pathInBucket: file.pathInBucket ?? '',
          accessKey: file.accessKey ?? '',
          secretKey: file.secretKey ?? '',
        });
      });
      const reqData = {
        transactionId: step1Data.orderNo ?? '',
        isWatermarkIncluded: step1Data.useMultiDrm ?? false,
        drmTypeList: ['PLAY_READY'],
        inputFileList: reqFiles,
        outputFile: outputStorage,
      };

      formData.append('transactionId', reqData.transactionId);
      formData.append(
        'isWatermarkIncluded',
        reqData.isWatermarkIncluded.toString()
      );
      formData.append('drmTypeList', reqData.drmTypeList as any);
      reqData.inputFileList.forEach((file, index) => {
        file.streamingTypeList.forEach((item, i) => {
          formData.append(
            `inputFileList[${index}].streamingTypeList[${i}]`,
            item
          );
        });
        formData.append(`inputFileList[${index}].fileType`, file.fileType);
        formData.append(
          `inputFileList[${index}].segmentDuration`,
          file.segmentDuration.toString()
        );
        formData.append(
          `inputFileList[${index}].applyAverageBandWidthToMPD`,
          file.applyAverageBandWidthToMPD.toString()
        );
        formData.append(
          `inputFileList[${index}].minBufferTime`,
          file.minBufferTime.toString()
        );
        formData.append(
          `inputFileList[${index}].videoCodecType`,
          file.videoCodecType
        );
        formData.append(
          `inputFileList[${index}].audioCodecType`,
          file.audioCodecType
        );
        formData.append(
          `inputFileList[${index}].frameRateType`,
          file.frameRateType
        );
        formData.append(
          `inputFileList[${index}].resolutionType.id`,
          file.resolutionType[0].id.toString()
        );
        formData.append(
          `inputFileList[${index}].resolutionType.definition`,
          file.resolutionType[0].definition
        );
        formData.append(
          `inputFileList[${index}].resolutionType.resolution`,
          file.resolutionType[0].resolution
        );
        formData.append(
          `inputFileList[${index}].resolutionType.bitrate`,
          file.resolutionType[0].bitrate.toString()
        );
        formData.append(
          `inputFileList[${index}].storageType`,
          file.storageType
        );
        formData.append(`inputFileList[${index}].fileName`, file.fileName);
        formData.append(`inputFileList[${index}].bucketName`, file.bucketName);
        formData.append(
          `inputFileList[${index}].cloudRegion`,
          file.cloudRegion
        );
        formData.append(
          `inputFileList[${index}].pathInBucket`,
          file.pathInBucket
        );
        formData.append(`inputFileList[${index}].accessKey`, file.accessKey);
        formData.append(`inputFileList[${index}].secretKey`, file.secretKey);
      });

      formData.append('outputFile.storageType', reqData.outputFile.storageType);
      formData.append('outputFile.bucketName', reqData.outputFile.bucketName);
      formData.append('outputFile.cloudRegion', reqData.outputFile.cloudRegion);
      formData.append(
        'outputFile.pathInBucket',
        reqData.outputFile.pathInBucket
      );
      formData.append('outputFile.accessKey', reqData.outputFile.accessKey);
      formData.append('outputFile.secretKey', reqData.outputFile.secretKey);

      const res = await apiPost({
        url: POST_DRM_ORDER,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        showToast: true,
        timeout: 60000,
      });

      setLoading(false);

      if (res.isSuccess) {
        const cloneData = _.cloneDeep(res.data);
        setResponseData({ isSuccess: true, data: cloneData });
      } else {
        setResponseData({ isSuccess: false, data: res.data });
      }
    } catch (error) {
      setResponseData({ isSuccess: false, data: error });
    } finally {
      setLoading(false);
    }
  };

  return {
    methods,
    handleSubmit: methods.handleSubmit,
    onSubmit: onSubmit,
    errors: methods.formState.errors,
    register: methods.register,
    setValue: methods.setValue,
    watch: methods.watch,
    control: methods.control,
    reset: methods.reset,
    loading,
    responseData,
  };
};
