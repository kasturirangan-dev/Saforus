export interface ResolutionType {
  id: number;
  definition: string;
  resolution: string;
  bitrate: number;
}

export interface InputFileData {
  streamingTypeList: string[];
  fileType: string;
  segmentDuration: number;
  applyAverageBandWidthToMPD: boolean;
  minBufferTime: number;
  videoCodecType: string;
  audioCodecType: string;
  frameRateType: string;
  resolutionType: ResolutionType[];
  storageType: string;
  fileName: string;
  bucketName: string;
  cloudRegion: string;
  pathInBucket: string;
  accessKey: string;
  secretKey: string;
};

export interface OutputFileData {
  storageType: string;
  bucketName: string;
  cloudRegion: string;
  pathInBucket: string;
  accessKey: string;
  secretKey: string;
};

export interface ReqInputFile extends OutputFileData {
  fileName: string;
};