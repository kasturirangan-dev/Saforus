import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { sub } from 'date-fns';
import { WatermarkInfo } from './interface';
import {
  WatermarkingOrder,
  RequestWatermarkingViewOrder,
} from '@web-workspace/saforus/components/forensic-watermarking-v2/view-order/data';
import { ServiceType } from '@web-workspace/saforus/common/model';

interface ViewOrderStoreType {
  // this field below used for set data for table
  orders: WatermarkingOrder[];
  total: number;
  setOrders: (orders: WatermarkingOrder[]) => void;
  addOrders: (additionOrder: WatermarkingOrder[]) => void;
  setTotal: (value: number) => void;
  getNextPage: () => number | null;
  // this field below used for set search param for calling api
  searchQuery: Partial<RequestWatermarkingViewOrder>;
  setSearchQuery: (query: Partial<RequestWatermarkingViewOrder>) => void;

  resetWatermarkingOrderStore: () => void;

  // this field below used for select watermaking order
  selectedWatermarkFile: WatermarkInfo | null;
  setSelectedWatermarkFile: (date: WatermarkInfo | null) => void;
  mediaType: string;
  setMediaType: (mediaType: string) => void;
  isPreview: boolean;
  setIsPreview: (value: boolean) => void;
}

function viewOrderStore() {
  const currentDate = new Date();
  const store: ViewOrderStoreType = {
    orders: [],
    total: 0,
    setOrders: (orders) => {
      FindWtrOrderStore.orders = orders;
    },
    // Add new order to existing order list without duplicate
    addOrders: (additionOrder) => {
      FindWtrOrderStore.orders = FindWtrOrderStore.orders.concat(additionOrder);
    },
    setTotal: (value) => {
      FindWtrOrderStore.total = value;
    },
    getNextPage: () => {
      if (FindWtrOrderStore.total === FindWtrOrderStore.orders.length) {
        return null;
      }
      return (FindWtrOrderStore?.searchQuery?.pageNo || 0) + 1;
    },

    searchQuery: {
      orderNo: '',
      userId: null,
      serviceType: ServiceType.DIGITAL_WATERMARKING,
      orderRequestStatus: 'ALL',
      contentType: 'ALL',
      format: 'ALL',
      startDate: sub(currentDate, { days: 364 }),
      endDate: currentDate,
      pageNo: 0,
      elementPerPage: 10,
      includeFile: true,
    },
    setSearchQuery: (query: Partial<RequestWatermarkingViewOrder>) => {
      FindWtrOrderStore.searchQuery = {
        ...FindWtrOrderStore.searchQuery,
        ...query,
        // Reset page when filter chage
        pageNo: query.pageNo || 0,
      };
    },

    // this field below used for select watermaking order
    selectedWatermarkFile: null,
    setSelectedWatermarkFile: (data) => {
      FindWtrOrderStore.selectedWatermarkFile = data;
    },
    mediaType: 'IMG',
    setMediaType: (mediaType) => {
      FindWtrOrderStore.mediaType = mediaType;
    },
    isPreview: false,
    setIsPreview: (value) => {
      FindWtrOrderStore.isPreview = value;
    },

    resetWatermarkingOrderStore: () => {
      FindWtrOrderStore.selectedWatermarkFile = null;
      FindWtrOrderStore.mediaType = 'IMG';
      FindWtrOrderStore.isPreview = false;

      FindWtrOrderStore.searchQuery = {
        orderNo: '',
        userId: null,
        serviceType: ServiceType.DIGITAL_WATERMARKING,
        orderRequestStatus: 'ALL',
        contentType: 'ALL',
        format: 'ALL',
        startDate: sub(currentDate, { days: 364 }),
        endDate: currentDate,
        pageNo: 0,
        elementPerPage: 10,
        includeFile: true,
      };
    },
  };
  return store;
}

const FindWtrOrderStore = proxy<ViewOrderStoreType>(viewOrderStore());
devtools(FindWtrOrderStore, {
  name: 'FIND_WTR_ORDER_STORE',
});

export default FindWtrOrderStore;
