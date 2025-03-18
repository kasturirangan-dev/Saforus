import { PiracyCreateRequest, SEARCH_TYPE } from './create-new-request.const';
import { FileType } from '@web-workspace/saforus/common/model';

export interface MediaConfig {
  supportedExts: string[];
  supportedFormats: string[];
  accept: Record<string, unknown>;
  multiple: boolean;
}

export interface PiracyCreateRequestProps {
  handleSubmit: UseFormHandleSubmit<PiracyCreateRequest>;
  onSubmit: (data: PiracyCreateForm) => void;
  register: UseFormRegister<PiracyCreateRequest>;
  setValue: UseFormSetValue<PiracyCreateRequest>;
  watch: UseFormWatch<PiracyCreateRequest>;
  methods: UseFormReturn<PiracyCreateRequest>;
  onFilesAdded: (acceptedFiles: File[]) => void;
  handleRemoveFile: (item: FileType) => void;
  errors: FieldErrors<PiracyCreateRequest>;
  trigger: UseFormTrigger<PiracyCreateRequest>;
  isSearching: boolean;
  onSearch: () => void;
}

export interface PiracyStoreType {
  files: FileType[];
  title: string;
  mediaType: string;
  configFile: MediaConfig;
  contentType: string;
  searchType: SEARCH_TYPE;
  createInfo: CreateInfo | null;
  fileErrorMsg: string;
  watermarkInfo: watermarkInfo | null;
  setFiles: (files: FileType[]) => void;
  setTitle: (title: string) => void;
  removeFiles: (id: string) => void;
  setMediaType: (mediaType: string) => void;
  setConfigFile: (value: string) => void;
  setContentType: (value: string) => void;
  setSearchType: (value: SEARCH_TYPE) => void;
  onReset: () => void;
  setCreateInfo: (data: CreateInfo | null) => value;
  setFileErrorMsg: (errorMsg: string) => void;
  setWatermarkInfo: (data: watermarkInfo | null) => void;
  updateWatermarkFile: (data: Partial<watermarkInfo>) => void;
}

export interface watermarkInfo {
  id: string;
  orderNo: string;
  personalOrderSq: number;
  psnInfoFileNm: string;
  personOrderInfoSq?: string;
  psnInfoId?: string;
  contentType?: string;
  watermarkFile?: string;
  watermarkFileSize?: number;
  thumbnail?: string;
  playback?: string;
  // "orderNo": "FI-1731352021958",
  // "personalOrderSq": 3064,
  // "personOrderInfoSq": 4747,
  // "psnInfoFileNm": "Pink Flowers.jpg",
  // "psnInfoId": "FI-1731352021958_ZCX_00001",
}

export interface CreateInfo extends PiracyCreateForm {
  createTime: any;
  id: string;
  requestor: string;
  orderSrcId: string;
  status: string;
}

export interface PiracyCreateForm {
  title: string;
  defaultFormatsOnly: boolean;
  fileIds: number[];
  orderId: string;
  contentType: string;
  watermarkingOrderNo: string;
  watermarkingOrderInfoSq: string;
  teamId: string;
  autoDetection: boolean;
}
