export interface WatermarkInfo {
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
