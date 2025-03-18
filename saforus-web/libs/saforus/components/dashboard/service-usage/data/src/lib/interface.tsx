export interface StatisticalData {
  total: number;
  inQueue: number;
  inProgress: number;
  completed: number;
  failed: number;
}

export interface ProgressData {
  totalNumber: number;
  specificNumber: number;
  unit: string;
  percent: number;
}

export interface DateData {
  startDate: Date;
  endDate: Date;
}

export interface ServiceUsage {
  forensicWatermarkingData: StatisticalData;
  piracyDetectionData: StatisticalData;
  contentPackagingData: StatisticalData;
  drmLicenseData: { total: number };
  numberOfProcessingFilesData: ProgressData;
  fileStorageCapacityData: ProgressData;
}

export const enum PeriodEnum {
  YEARLY = 'Yearly',
  MONTHLY = 'Monthly',
  WEEKLY = 'Weekly',
}

export interface ChartData {
  'Forensic Watermarking for Distribution'?: number;
  'Content Packaging'?: number;
  'Piracy Detection'?: number;
  [key: string]: number | string | undefined;
}

export interface ForensicWatermarkingUsageResponse {
  transactionId: string;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: string;
  resourceURL: string;
  data: ForensicWatermarkingUsageData;
}

export interface ForensicWatermarkingUsageData {
  watermarkingUses: WatermarkingUses;
  piracyUsesStat: PiracyData;
  cloudStorageSize: number;
  cloudUsedPercentage: number;
  cloudUsedStorageSize: number;
  wtrCapacitySize: number;
  wtrUsedCapacitySize: number;
  wtrUsedPercentage: number;
}

export interface WatermarkingUses {
  imageStat: MediaUsageData;
  videoStat: MediaUsageData;
  audioStat: MediaUsageData;
  documentStat: MediaUsageData;
}

export interface MediaUsageData {
  contentType: string;
  totalCount: number;
  inQueueCount: number;
  inProgressCount: number;
  completedCount: number;
  failedCount: number;
  totalSizeInMb: number;
  detectedCount: number;
  unDetectedCount: number;
}

export interface PiracyDetectionResponse {
  transactionId: string;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: string;
  resourceURL: string;
  data: PiracyData;
}

export interface PiracyData {
  totalCount: number;
  audioCount: number;
  imageCount: number;
  videoCount: number;
  failedCount: number;
  totalSizeInMB: number;
  imageStat: MediaUsageData;
  videoStat: MediaUsageData;
  audioStat: MediaUsageData;
  documentStat: MediaUsageData;
}

export interface GraphResponse {
  transactionId: any;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: any;
  resourceURL: any;
  data: GraphData[];
}

export interface GraphData {
  userUsesPeriod: string;
  periodName: string;
  wtrImageCount: number;
  wtrVideoCount: number;
  wtrAudioCount: number;
  pdCount: number;
}
