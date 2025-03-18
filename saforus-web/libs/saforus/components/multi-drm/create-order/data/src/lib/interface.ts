import * as yup from 'yup';

export const enum CreateOrderStepsEnum {
  PACKAGING_OPTION = 'PACKAGING_OPTION',
  CHOOSE_STORAGE = 'CHOOSE_STORAGE',
  OUTPUT_STREAMING = 'OUTPUT_STREAMING',
  SUBMIT_ORDER = 'SUBMIT_ORDER',
}

export const enum DRM_TYPE {
  WIDE_VINE = 'WIDEVINE',
  PLAY_READY = 'PLAY_READY',
  FAIR_PLAY = 'FAIR_PLAY',
}

export const DrmPackageOptionSchema = yup
  .object({
    useWatermark: yup.boolean(),
    useMultiDrm: yup.boolean(),
    useWideVine: yup.boolean(),
    usePlayReady: yup.boolean(),
    useFairPlay: yup.boolean(),
    orderNo: yup.string(),
  })
  .required();

export type DrmPackageOption = yup.InferType<
  typeof DrmPackageOptionSchema
>;

export const DrmOutputStreamSchema = yup
  .object({
    formats: yup.array()
      .required('multiDrm.message.least-one-of-streaming')
      .min(1, 'multiDrm.message.least-one-of-streaming'),
    duration: yup.number()
      .typeError('error-message.required')
      .required('error-message.required')
      .integer('error-message.required')
      .min(1, 'error-message.required'),
    applyAverageBand: yup.boolean(),
    minBandTime: yup.number().nullable().typeError('error-message.required'),
    useCodeConfig: yup.boolean(),
    videoCodecId: yup.string(),
    audioCodecId: yup.string(),
    videoBitrate: yup.string(),
    resolutions: yup.array()
      .required('multiDrm.message.least-one-of-resolution')
      .min(1, 'multiDrm.message.least-one-of-resolution'),
  })
  .required();

export type DrmOutputStream = yup.InferType<
  typeof DrmOutputStreamSchema
>;

export const DrmStorageSchema = yup
  .object({
    originalFiles: yup.array(),
    files: yup
      .array()
      .min(1, 'page-watermarking.create.message.file-length')
      .max(10, 'page-watermarking.create.message.file-length')
      .required(),
    isCreatedFolder: yup.bool().oneOf([true], 'page-watermarking.create.message.please-create-folder'),
    siteId: yup.string().required(),
    siteName: yup.string(),
    inputStorageId: yup.string().required('error-message.required'),
    outputStorageId: yup.string().required('error-message.required'),
    inputBucketName: yup.string().required(),
    outputBucketName: yup.string().required(),
    inputPath: yup.string(),
    outputPath: yup.string().required('error-message.required'),
    storageType: yup.string(),
    fileKey: yup.string(),
    inputCloudRegion: yup.string(),
    inputAccessKey: yup.string(),
    inputSecretKey: yup.string(),
    outputCloudRegion: yup.string(),
    outputAccessKey: yup.string(),
    outputSecretKey: yup.string(),
  })
  .required();

export type DrmStorage = yup.InferType<
  typeof DrmStorageSchema
>;

export const DrmSubmitOrderSchema = yup
  .object({
    files: yup.array()
      .required('multiDrm.message.least-one-of-streaming')
      .min(1, 'multiDrm.message.least-one-of-streaming'),
    originalFiles: yup.array(),
    requestFiles: yup.array(),
  })
  .required();

export type DrmSubmitOrder = yup.InferType<
  typeof DrmSubmitOrderSchema
>;

export interface SupportedResolution {
  id: string;
  definition: string;
  resolution: string;
  bitrate: number;
};

export interface IDrmOption {
  drm: string;
  isActive: boolean;
  streamingTypeList: string[];
  containerTypeList: string[];
  videoCodecTypeList: string[];
  audioCodecTypeList: string[];
  frameRateTypeList: string[];
  resolutionTypeList: SupportedResolution[];
};

export interface IResponseDrmServiceInfo {
  resultCd: string;
  resultMsg: string;
  resourceId: string;
  resourceURL: string;
  transactionId: string;
  drmOptionList: IDrmOption[];
};