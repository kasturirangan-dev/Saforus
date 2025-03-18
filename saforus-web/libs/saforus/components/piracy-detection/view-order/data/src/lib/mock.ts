import { PiracyOrder } from './interface';

const mockoOrders: Partial<PiracyOrder>[] = [
  {
    id: 1,
    service_type: 'Watermarking for Distribution',
    order_no: 'FI-8445887544270',
    userFullName: 'Dave Jones',
    summary: '사진 2외 200장 ',
    watermark_code: '1 - 100',
    orderStatus: 'Completed',
    type: 'Image',
    format: 'JPEG',
    requested: '2023-04-01 10:32:22',
  },
  {
    id: 2,
    service_type: 'Forensic Watermarking',
    order_no: 'FI-8445887544270',
    userFullName: 'Dave Jones',
    summary: '사진 2외 200장 ',
    watermark_code: '1 - 100',
    orderStatus: 'In Progress',
    type: 'Image',
    format: 'JPEG',
    requested: '2023-04-01 10:32:22',
  },
  {
    id: 3,
    service_type: 'Forensic Watermarking',
    order_no: 'FI-8445887544270',
    userFullName: 'Dave Jones',
    summary: '사진 2외 200장 ',
    watermark_code: '1 - 100',
    orderStatus: 'Failed',
    type: 'Image',
    format: 'JPEG',
    requested: '2023-04-01 10:32:22',
  },
  {
    id: 4,
    service_type: 'Service Type 1',
    order_no: 'Order 1',
    userFullName: 'Requester 1',
    summary: 'Summary 1',
    watermark_code: 'Watermark 1',
    orderStatus: 'Status 1',
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
    userFullName: 'Requester 2',
    summary: 'Summary 2',
    watermark_code: 'Watermark 2',
    orderStatus: 'Status 2',
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
  query?: Partial<PiracyOrder>
): Promise<Partial<PiracyOrder>[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (query && Object.keys(query).length > 0) {
        return resolve(
          mockoOrders.filter((order) => {
            return Object.keys(query).every((key) => {
              return (
                order[key as keyof PiracyOrder] ===
                query[key as keyof PiracyOrder]
              );
            });
          })
        );
      }
      return resolve(mockoOrders);
    }, 1000);
  });
}

interface ServiceTypeOption {
  desc: string;
  id: number;
}

export function mockFetchOrderServiceType(): Promise<ServiceTypeOption[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let counter = 1;
      const data = ['All', 'Piracy Detection '].map((item) => ({
        desc: item,
        id: counter++,
      }));
      resolve(data);
    }, 0);
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
