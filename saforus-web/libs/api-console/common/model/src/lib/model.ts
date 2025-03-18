import { Accept } from 'react-dropzone';

export interface TOption {
  label: string;
  value: string | number;
}

export enum MEDIA_TYPE {
  IMG = 'IMG',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
}

export interface IConfigMedia {
  supportedExts: string[];
  supportedFormats: string[];
  accept: Accept;
  multiple: boolean;
  maxFile?: number | null;
}

export const MediaConfigs = {
  IMG: {
    supportedExts: ['JPEG', 'JPG', 'PNG', 'TIFF', 'TIF', 'BMP'],
    supportedFormats: ['JPEG', 'PNG', 'TIFF', 'BMP'],
    supportedResolutions: {
      min: '512px × 512px',
      max: '5,000px × 5,000px',
    },
    accept: {
      'image/*': [],
    },
    multiple: true,
    maxFile: 50,
  },
  AUDIO: {
    supportedExts: ['MP3', 'WAV'],
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
    supportedResolutions: {
      min: '50mm × 50mm',
      max: [
        { Watermarking: '440mm × 440mm' },
        { Detection: '1240mm × 1240mm' },
      ],
    },
    accept: {
      'application/pdf': [],
    },
    multiple: true,
    maxFile: 50,
  },
};

export type FileType = {
  id: string;
  fileName: string;
  contentType: string;
  format: string;
  fileSize: number;
  supported: boolean;
  file: File;
  preview?: string;
};

export interface ApiResponseData {
  code: string;
  data: any;
  msg?: string;
}

export const enum ApiResponseStatus {
  SUCCESS = '0000',
}
export const enum OrderType {
  DETECTION = 'PD',
  WATERMARKING = 'WTR',
}

export const enum ChanelType {
  API = 'API',
  WEB = 'WEB',
}
