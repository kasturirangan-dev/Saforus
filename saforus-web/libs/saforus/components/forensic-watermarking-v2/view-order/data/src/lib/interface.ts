import { BaseResponseData } from '@web-workspace/saforus/common/model';
import { IOrderFile } from '@web-workspace/saforus/components/forensic-watermarking-v2/data';

type formatList = {
  extension: string;
  id: number;
  type: string;
};
export interface WatermarkingOrder {
  id: number;
  orderNo: string;
  userFullName: string;
  title: string;
  psnStartNum: number;
  psnEndNum: number;
  orderStatus: string;
  contentType: string;
  formatList?: [formatList];
  requestDate: Date | string;
  details: IOrderFile[];
}
interface Data {
  pageNo: number;
  elementPerPage: number;
  totalElements: number;
  totalPages: number;
  elementList: WatermarkingOrder[];
}
export interface ResponseWatermarkingViewOrder extends BaseResponseData {
  data: Data;
}

export interface RequestWatermarkingViewOrder {
  orderNo?: string;
  serviceType: string;
  userId: string | number | null;
  orderRequestStatus: string;
  contentType: string;
  format: string;
  startDate: Date | string;
  endDate: Date | string;
  pageNo: number;
  elementPerPage: number;
  includeFile: boolean;
}

export interface ServiceFieldValues {
  orderNo?: string;
}
