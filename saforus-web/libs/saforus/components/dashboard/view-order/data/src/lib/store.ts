import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { RequestServiceViewOrder } from './interface';
import { sub } from 'date-fns';
import { ServiceType } from '@web-workspace/saforus/common/model';
import { PiracyOrder } from '@web-workspace/saforus/components/piracy-detection/view-order/data';
import { WatermarkingOrder } from '@web-workspace/saforus/components/forensic-watermarking-v2/view-order/data';

interface ServiceViewOrderStoreType {
  // this field below used for set data for table
  orders: WatermarkingOrder[];
  total: number;
  setOrders: (orders: WatermarkingOrder[]) => void;
  setTotal: (value: number) => void;
  pdOrders: PiracyOrder[];
  pdTotal: number;
  setPdOrders: (orders: PiracyOrder[]) => void;
  setPdTotal: (value: number) => void;
  // this field below used for set search param for calling api
  searchQuery: Partial<RequestServiceViewOrder>;
  setSearchQuery: (query: Partial<RequestServiceViewOrder>) => void;

  resetSearchQuery: () => void;
}

function serviceViewOrderStore() {
  const currentDate = new Date();
  const store: ServiceViewOrderStoreType = {
    orders: [],
    total: 0,
    setOrders: (orders) => {
      ServiceViewOrderStore.orders = orders;
    },
    setTotal: (value) => {
      ServiceViewOrderStore.total = value;
    },

    pdOrders: [],
    pdTotal: 0,
    setPdOrders: (orders) => {
      ServiceViewOrderStore.pdOrders = orders;
    },
    setPdTotal: (value) => {
      ServiceViewOrderStore.pdTotal = value;
    },

    searchQuery: {
      orderNo: '',
      serviceType: ServiceType.ALL,
      userId: null,
      orderRequestStatus: 'ALL',
      contentType: 'ALL',
      format: 'ALL',
      startDate: sub(currentDate, { days: 29 }),
      endDate: currentDate,
      pageNo: 0,
      pageNoPd: 0,
      elementPerPage: 10,
    },
    setSearchQuery: (query: Partial<RequestServiceViewOrder>) => {
      ServiceViewOrderStore.searchQuery = {
        ...ServiceViewOrderStore.searchQuery,
        ...query,
        // Reset page when filter chage
        pageNo: query.pageNo || 0,
        pageNoPd: query.pageNoPd || 0,
      };
    },

    resetSearchQuery: () => {
      ServiceViewOrderStore.searchQuery = {
        orderNo: '',
        serviceType: ServiceType.ALL,
        userId: null,
        orderRequestStatus: 'ALL',
        contentType: 'ALL',
        format: 'ALL',
        startDate: sub(currentDate, { days: 29 }),
        endDate: currentDate,
        pageNo: 0,
        pageNoPd: 0,
        elementPerPage: 10,
      };
    },
  };
  return store;
}

const ServiceViewOrderStore = proxy<ServiceViewOrderStoreType>(
  serviceViewOrderStore()
);
devtools(ServiceViewOrderStore, {
  name: 'SERVICE_VIEW_ORDER_STORE',
});

export default ServiceViewOrderStore;
