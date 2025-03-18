import { Accept } from 'react-dropzone';

export interface IMyStorage {
  siteId: string;
  inputStorageId: string;
  outputStorageId: string;
  inputPath: string;
  outputPath: string;
}

export interface IConfigMedia {
  supportedExts: string[];
  supportedFormats: string[];
  accept: Accept;
  multiple: boolean;
  maxFile?: number | null;
}

export interface IContentType {
  id: string;
  description: string;
}

export type FieldWithSupport = {
  field: string | number;
  supported: boolean;
};

export interface IResponse {
  data: any;
  isSuccess: boolean | null;
}

export interface BaseResponseData {
  transactionId: string;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: number;
  resourceURL: string;
}

export type FileType = {
  id: string;
  psnInfoId: string;
  psnInfoFileNm: string;
  contentType: FieldWithSupport;
  psnFileMediaCd?: string;
  format: string;
  size: FieldWithSupport;
  supported: boolean;
  file: File;
  delYn?: boolean;
  percent?: number;
  preview?: string;
  progress?: string;
};

export type DrmFile = {
  id: string;
  siteName: string;
  originalFileName: string;
  fileName: string;
  resolution: string;
  bitRate: string;
  videoCodec: string;
  audioCodec: string;
  streamFormats: string[];
  watermark: boolean;
  drmType: string;
  storageType: string;
  fileKey: string;
  bucketName: string;
  cloudRegion: string;
  pathInBucket: string;
  accessKey: string;
  secretKey: string;
  supported: boolean;
};

export const MEDIA_TYPE = {
  IMG: 'IMG',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  DOCUMENT: 'DOCUMENT',
  STREAMING: 'STREAMING',
  STREAMING_MUSIC: 'STREAMING_MUSIC',
};

export const MediaConfigs = {
  IMG: {
    supportedExts: ['JPEG', 'JPG', 'PNG', 'TIFF', 'BMP'],
    supportedFormats: ['JPEG', 'PNG', 'TIFF', 'BMP'],
    accept: {
      'image/*': [],
    },
    multiple: true,
    maxFile: 50,
  },
  AUDIO: {
    supportedExts: ['MP3', 'MPEG', 'WAV', 'X-WAV'],
    supportedFormats: ['MP3', 'WAV'],
    accept: {
      'audio/*': [],
    },
    multiple: true,
    maxFile: 50,
  },
  VIDEO: {
    supportedExts: ['MP4'],
    supportedFormats: ['MP4'],
    accept: {
      'video/*': [],
    },
    multiple: false,
    maxFile: null,
  },
  DOCUMENT: {
    supportedExts: ['PDF'],
    supportedFormats: ['PDF'],
    accept: {
      'application/pdf': [],
    },
    multiple: true,
    maxFile: 50,
  },
  ANY_AVAILABLE: {
    supportedExts: [
      'JPEG',
      'JPG',
      'PNG',
      'TIFF',
      'BMP ',
      'MP3',
      'MPEG',
      'WAV',
      'X-WAV',
      'MP4',
      'PDF',
    ],
    supportedFormats: [],
    accept: {
      'image/*': [],
      'audio/*': [],
      'video/*': [],
      'application/pdf': [],
    },
    multiple: true,
    maxFile: 50,
  },
};

// export async function setMediaConfigs() {
//   if (
//     isFeatureEnabled(FeatureFlag.PNG) &&
//     !MediaConfigs.IMG.supportedExts.includes('PNG')
//   ) {
//     MediaConfigs.IMG.supportedExts.push('PNG');
//     MediaConfigs.IMG.supportedFormats.push('PNG');
//   }
//   if (
//     isFeatureEnabled(FeatureFlag.TIFF) &&
//     !MediaConfigs.IMG.supportedExts.includes('TIFF')
//   ) {
//     MediaConfigs.IMG.supportedExts.push('TIFF');
//     MediaConfigs.IMG.supportedFormats.push('TIFF');
//   }
//   if (
//     isFeatureEnabled(FeatureFlag.ALLOW_PDF) &&
//     !MediaConfigs.DOCUMENT.supportedExts.includes('PDF')
//   ) {
//     MediaConfigs.DOCUMENT.supportedExts.push('PDF');
//     MediaConfigs.DOCUMENT.supportedFormats.push('PDF');
//   }
// }

export interface TOption {
  label: string;
  value: string | number;
}

export interface MetaData {
  userRoleList: string[] | null;
  userTeamStatusList: string[] | null;
}

export const enum UserRole {
  TEAM_EDITOR = 'TEAM_EDITOR',
  TEAM_VIEWER = 'TEAM_VIEWER',
  TEAM_OWNER = 'TEAM_OWNER',
  PRIVATE_USER = 'PRIVATE_USER',
}

export const enum UserTeamStatus {
  INVITED = 'INVITED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
  JOINED = 'JOINED',
  ALL = 'ALL',
}

export const enum PaymentProvider {
  STRIPE = 'STRIPE',
  AMP = 'AMP',
}

export const ServiceType = {
  ALL: 'ALL',
  PIRACY_DETECTION: 'PIRACY_DETECTION',
  DIGITAL_WATERMARKING: 'DIGITAL_WATERMARKING',
};

export const enum SubscriptionPlan {
  FREE = 'Free Trial',
  STANDARD = 'Standard',
  ENTERPRISE = 'Enterprise',
}
