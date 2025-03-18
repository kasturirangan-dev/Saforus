export interface RequestServiceViewOrder {
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
  pageNoPd: number;
}

export interface ServiceFieldValues {
  orderNo?: string;
}
