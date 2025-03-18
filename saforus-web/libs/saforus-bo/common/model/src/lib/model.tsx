// add this field in reponse api later eg TEAM_OWNER -- > ADMIN
export const enum BoUserRole {
  SUPER_ADMIN = 'TEAM_EDITOR',
  ADMIN_CS = 'TEAM_VIEWER',
  ADMIN = 'TEAM_OWNER',
}

export interface TOption {
  label: string;
  value: string | number;
}

export const MEDIA_TYPE = {
  IMG: 'IMG',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  STREAMING: 'STREAMING',
  STREAMING_MUSIC: 'STREAMING_MUSIC',
};

export const enum Status {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_QUEUE = 'IN_QUEUE',
  FAILED = 'FAILED',
}

export const ServiceType = {
  ALL: 'ALL',
  PIRACY_DETECTION: 'PIRACY_DETECTION',
  DIGITAL_WATERMARKING: 'DIGITAL_WATERMARKING',
};

export interface BaseResponseData {
  transactionId: string;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: number;
  resourceURL: string;
}
