export interface TOption {
  label: string;
  value: string | number;
}

export enum MediaType {
  IMG = 'IMG',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
}

export interface ApiResponseData {
  code: string;
  data: any;
  msg?: string;
}

export const enum ApiResponseStatus {
  SUCCESS = '0000',
}
