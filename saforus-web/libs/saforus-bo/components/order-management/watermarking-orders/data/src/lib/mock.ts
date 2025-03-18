import { ResponseWatermarkingViewOrder, WatermarkingOrder } from './interface';

const mockoOrders: Partial<WatermarkingOrder>[] = [
  {
    id: 1,
    service_type: 'Watermarking for Distribution',
    order_no: 'FI-8445887544270',
    requester: 'Dave Jones',
    summary: '사진 2외 200장 ',
    watermark_code: '1 - 100',
    status: 'Completed',
    type: 'Image',
    format: 'JPEG',
    requested: '2023-04-01 10:32:22',
  },
  {
    id: 2,
    service_type: 'Forensic Watermarking',
    order_no: 'FI-8445887544270',
    requester: 'Dave Jones',
    summary: '사진 2외 200장 ',
    watermark_code: '1 - 100',
    status: 'In Progress',
    type: 'Image',
    format: 'JPEG',
    requested: '2023-04-01 10:32:22',
  },
  {
    id: 3,
    service_type: 'Forensic Watermarking',
    order_no: 'FI-8445887544270',
    requester: 'Dave Jones',
    summary: '사진 2외 200장 ',
    watermark_code: '1 - 100',
    status: 'Failed',
    type: 'Image',
    format: 'JPEG',
    requested: '2023-04-01 10:32:22',
  },
  {
    id: 4,
    service_type: 'Service Type 1',
    order_no: 'Order 1',
    requester: 'Requester 1',
    summary: 'Summary 1',
    watermark_code: 'Watermark 1',
    status: 'Status 1',
    type: 'Type 1',
    format: 'Format 1',
    requested: 'Requested 1',
    requestedBy: 'RequestedBy 1',
    updatedDate: 'UpdatedDate 1',
    updatedBy: 'UpdatedBy 1',
    createdDate: 'CreatedDate 1',
    createdBy: 'CreatedBy 1',
    fromRequestedDate: new Date('2023-01-01'),
    toRequestedDate: new Date('2023-12-31'),
  },
  {
    id: 5,
    service_type: 'Service Type 2',
    order_no: 'Order 2',
    requester: 'Requester 2',
    summary: 'Summary 2',
    watermark_code: 'Watermark 2',
    status: 'Status 2',
    type: 'Type 2',
    format: 'Format 2',
    requested: 'Requested 2',
    requestedBy: 'RequestedBy 2',
    updatedDate: 'UpdatedDate 2',
    updatedBy: 'UpdatedBy 2',
    createdDate: 'CreatedDate 2',
    createdBy: 'CreatedBy 2',
    fromRequestedDate: new Date('2023-01-02'),
    toRequestedDate: new Date('2023-12-30'),
  },
];

export function mockFetchOrderList(
  query?: Partial<WatermarkingViewOrder>
): Promise<Partial<WatermarkingViewOrder>[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (query && Object.keys(query).length > 0) {
        return resolve(
          mockoOrders.filter((order) => {
            return Object.keys(query).every((key) => {
              return (
                order[key as keyof WatermarkingViewOrder] ===
                query[key as keyof WatermarkingViewOrder]
              );
            });
          })
        );
      }
      return resolve(mockoOrders);
    }, 1000);
  });
}

function createMockData() {
  const orders: WatermarkingOrder[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    serviceType: `Type ${i + 1}`,
    orderNo: `Order00${i + 1}`,
    requester: `Requester ${i + 1}`,
    summary: `Summary ${i + 1}`,
    watermark_code: `Code00${i + 1}`,
    status: `Status ${i + 1}`,
    type: `Type ${i + 1}`,
    format: i + 1,
    requested: `Requested ${i + 1}`,
    requestedBy: `Requested By ${i + 1}`,
    updatedDate: "2023-10-26T14:47:07Z",
    updatedBy: `Updated By ${i + 1}`,
    createdDate: "2023-10-26T14:47:07Z",
    createdBy: `Created By ${i + 1}`,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    fromRow: i * 10,
    rowCount: 10,
    extension: ".jpg",
    extensions: [".jpg", ".png"],
  }));

  const dataPerPage = (pageNo: number, pageSize = 10) => ({
    pageNo,
    elementPerPage: pageSize,
    totalElements: orders.length,
    totalPages: Math.ceil(orders.length / pageSize),
    elementList: orders.slice((pageNo - 1) * pageSize, pageNo * pageSize),
  });

  const mockDataPage1: ResponseWatermarkingViewOrder = {
    data: dataPerPage(1),
    transactionId: null,
    httpStatus: "200 OK",
    resultCode: 0,
    resultMsg: "Success",
    resourceId: null,
    resourceURL: null,
  };

  const mockDataPage2: ResponseWatermarkingViewOrder = {
    data: dataPerPage(2),
    transactionId: null,
    httpStatus: "200 OK",
    resultCode: 0,
    resultMsg: "Success",
    resourceId: null,
    resourceURL: null,
  };

  return { mockDataPage1, mockDataPage2 };
}

export function mockFetchOrderTest(data: any): Promise<any> {
  const { mockDataPage1, mockDataPage2 } = createMockData();
  
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(data.pageNo === 0 ? mockDataPage1 : mockDataPage2);
      }, 50);
   });
}

export function mockFetchOrderServiceType(): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Forensic Watermarking', 'Watermarking for Distribution']);
    }, 1000);
  });
}

export function mockFetchOrderRequester(): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Dave Jones', 'John Smith']);
    }, 1000);
  });
}

export function mockFetchOrderStatus(): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Completed', 'In Progress', 'Failed']);
    }, 1000);
  });
}

export function mockFetchOrderContentType(): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Image', 'Video']);
    }, 1000);
  });
}

export function mockFetchOrderFormat(): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['JPEG', 'PNG']);
    }, 1000);
  });
}
