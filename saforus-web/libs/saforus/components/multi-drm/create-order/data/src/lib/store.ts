import { proxy } from 'valtio';
import {
  CreateOrderStepsEnum,
  DrmStorage,
  DrmOutputStream,
  IDrmOption,
  DrmPackageOption,
  DrmSubmitOrder,
} from './interface';
import { devtools } from 'valtio/utils';
import { Site } from '@web-workspace/saforus/components/settings/sites/data';

export interface StepDetails {
  component: React.LazyExoticComponent<any>;
  icon: React.ReactElement;
  label: string;
  alt: string;
}

export interface DrmCommonData {
  sites: Site[];
  drmOptions: IDrmOption[];
}

interface StepDataTypes {
  [CreateOrderStepsEnum.PACKAGING_OPTION]: DrmPackageOption;
  [CreateOrderStepsEnum.CHOOSE_STORAGE]: DrmStorage;
  [CreateOrderStepsEnum.OUTPUT_STREAMING]: DrmOutputStream;
  [CreateOrderStepsEnum.SUBMIT_ORDER]: DrmOutputStream; // Use the appropriate form type if different
}

type StepDataType<K extends keyof StepDataTypes> = StepDataTypes[K];

export interface Store {
  completed: boolean;
  currentStep: CreateOrderStepsEnum;
  commonData: DrmCommonData;
  onSetStep: (step: CreateOrderStepsEnum) => void;
  getStepDetails: (
    config: Record<CreateOrderStepsEnum, StepDetails>
  ) => StepDetails;
  [CreateOrderStepsEnum.PACKAGING_OPTION]: DrmPackageOption;
  [CreateOrderStepsEnum.CHOOSE_STORAGE]: DrmStorage;
  [CreateOrderStepsEnum.OUTPUT_STREAMING]: DrmOutputStream;
  [CreateOrderStepsEnum.SUBMIT_ORDER]: DrmSubmitOrder;
  onSetStepData: <K extends CreateOrderStepsEnum>(
    step: K,
    data: StepDataType<K>
  ) => void;
  getStepData: <K extends CreateOrderStepsEnum>(step: K) => StepDataType<K>;
  onSetCommonData: (key: string, data: any) => void;
  onSetCompleted: (completed: boolean) => void;
}

export const MultiDrmCreateOrderStore = proxy<Store>({
  completed: false,
  currentStep: CreateOrderStepsEnum.PACKAGING_OPTION,
  commonData: {
    sites: [] as Site[],
    drmOptions: [] as IDrmOption[],
  },
  onSetStep: (step) => {
    MultiDrmCreateOrderStore.currentStep = step;
  },
  getStepDetails: (config: any) => config[MultiDrmCreateOrderStore.currentStep],
  [CreateOrderStepsEnum.PACKAGING_OPTION]: {
    useWatermark: true,
    useMultiDrm: true,
    useWideVine: false,
    usePlayReady: true,
    useFairPlay: false,
    orderNo: '',
  },
  [CreateOrderStepsEnum.CHOOSE_STORAGE]: {
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
  },
  [CreateOrderStepsEnum.OUTPUT_STREAMING]: {
    formats: ['DASH'],
    duration: 0,
    applyAverageBand: false,
    minBandTime: 0,
    useCodeConfig: true,
    videoCodecId: '',
    audioCodecId: '',
    videoBitrate: '',
    resolutions: [],
  },
  [CreateOrderStepsEnum.SUBMIT_ORDER]: {
    files: [],
    originalFiles: [],
  },
  onSetStepData: (step, data) => {
    MultiDrmCreateOrderStore[step] = data;
  },
  getStepData: (step) => {
    return MultiDrmCreateOrderStore[step];
  },
  onSetCommonData: (key, data) => {
    MultiDrmCreateOrderStore.commonData[key] = data;
  },
  onSetCompleted: (completed) => {
    MultiDrmCreateOrderStore.completed = completed;
  },
});

devtools(MultiDrmCreateOrderStore, { name: 'MULTI_DRM_CREATE_ORDER_STORE' });
