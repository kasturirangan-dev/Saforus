type contentType = {
  value: string;
};

type formatList = {
  extension: string;
  id: number;
  type: string;
};
export interface WatermarkingOrder {
  id: number;
  serviceType: string;
  orderNo: string;
  userFullName: string;
  summary: string;
  title: string;
  psnStartNum: number;
  psnEndNum: number;
  watermark_code: string;
  orderStatus: string;
  contentType: contentType;
  format: number;
  requested: string;
  requestedBy?: string;
  updatedDate?: string;
  updatedBy?: string;
  createdDate?: string;
  createdBy?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  fromRow?: number;
  rowCount?: number;
  extension?: string;
  formatList?: [formatList];
}
interface Data {
  pageNo: number;
  elementPerPage: number;
  totalElements: number;
  totalPages: number;
  elementList: WatermarkingOrder[];
}
export interface ResponseWatermarkingOrders {
  data: Data;
  transactionId: string | null;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  resourceId: number | null;
  resourceURL: string | null;
}

export interface RequestWatermarkingOrders {
  // teamId: number | null;
  // userId: number | null;
  emailIdOrName: string;
  orderNo: string;
  serviceType: string;
  orderRequestStatus: string;
  contentType: string;
  format: string;
  startDate: Date | string;
  endDate: Date | string;
  pageNo: number;
  elementPerPage: number;
}


export interface RequestWaterExpiration {
  expiredDate: Date | string;
}

