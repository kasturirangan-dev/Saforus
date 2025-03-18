import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { RequestWatermarkingViewOrder, WatermarkingOrder } from './interface';
import { sub } from 'date-fns';
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
}

function viewOrderStore() {
  const currentDate = new Date();
  const store: ViewOrderStoreType = {
    orders: [],
    total: 0,
    setOrders: (orders) => {
      ViewOrderStore.orders = orders;
    },
    // Add new order to existing order list without duplicate
    addOrders: (additionOrder) => {
      ViewOrderStore.orders = ViewOrderStore.orders.concat(additionOrder);
    },
    setTotal: (value) => {
      ViewOrderStore.total = value;
    },
    getNextPage: () => {
      if (ViewOrderStore.total === ViewOrderStore.orders.length) {
        return null;
      }
      return (ViewOrderStore?.searchQuery?.pageNo || 0) + 1;
    },

    searchQuery: {
      orderNo: '',
      userId: null,
      serviceType: ServiceType.DIGITAL_WATERMARKING,
      orderRequestStatus: 'ALL',
      contentType: 'ALL',
      format: 'ALL',
      startDate: sub(currentDate, { days: 29 }),
      endDate: currentDate,
      pageNo: 0,
      elementPerPage: 10,
      includeFile: true,
    },
    setSearchQuery: (query: Partial<RequestWatermarkingViewOrder>) => {
      ViewOrderStore.searchQuery = {
        ...ViewOrderStore.searchQuery,
        ...query,
        // Reset page when filter chage
        pageNo: query.pageNo || 0,
      };
    },

    resetWatermarkingOrderStore: () => {
      ViewOrderStore.searchQuery = {
        orderNo: '',
        userId: null,
        serviceType: ServiceType.DIGITAL_WATERMARKING,
        orderRequestStatus: 'ALL',
        contentType: 'ALL',
        format: 'ALL',
        startDate: sub(currentDate, { days: 29 }),
        endDate: currentDate,
        pageNo: 0,
        elementPerPage: 10,
        includeFile: true,
      };
    },
  };
  return store;
}

const ViewOrderStore = proxy<ViewOrderStoreType>(viewOrderStore());
devtools(ViewOrderStore, {
  name: 'WATER_MARKING_VIEW_ORDER_STORE',
});

export default ViewOrderStore;
