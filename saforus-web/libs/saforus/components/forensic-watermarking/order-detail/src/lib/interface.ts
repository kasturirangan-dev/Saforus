export interface RequestOrderDetail {
  orderId: string;
  rowCount: number;
  fromRow: number;
}

export interface OrderDetailFiles {
  psnOrderId: string;
  psnInfoId: string;
  psnInfoFileNm: string;
  psnInfoFullPath: string;
  psnInfoFileTpCd: string;
  delYn: string;
  regId: string;
  regDt: string;
  personOrderInfoSq: string;
  psnFileMediaCd: string;
  psnStartNum: string;
  psnEndNum: string;
  psnFwmTpCd: string;
  contentType: string;
  format: string;
  size: string;
  fileName: string;
  finalTime: string;
  watermarkCode: string;
  expirationDate: string;
  progress: string;
}

export interface ResponseOrderDetail {
  data: OrderDetailFiles[];
  total: number;
}
