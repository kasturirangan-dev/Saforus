import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import {
  OrderDetail,
  OrderStatus,
  ViewOrderQuery,
  WatermarkInfo,
} from './interface';
import { sub } from 'date-fns';
import { OrderType } from '@web-workspace/api-console/common/model';

interface ViewOrderStoreType {
  // this field below used for set data for table
  orders: OrderDetail[];
  total: number;
  setOrders: (orders: OrderDetail[]) => void;
  addOrders: (additionOrder: OrderDetail[]) => void;
  setTotal: (value: number) => void;
  getNextPage: () => number | null;
  // this field below used for set search param for calling api
  searchQuery: Partial<ViewOrderQuery>;
  setSearchQuery: (query: Partial<ViewOrderQuery>) => void;

  resetFindWtrOrderStore: () => void;

  // this field below used for select watermaking order
  selectedWatermarkFile: WatermarkInfo | null;
  setSelectedWatermarkFile: (data: WatermarkInfo | null) => void;
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
      return (FindWtrOrderStore?.searchQuery?.page || 0) + 1;
    },

    searchQuery: {
      orderType: OrderType.WATERMARKING,
      startDate: sub(currentDate, { days: 364 }),
      endDate: currentDate,
      status: OrderStatus.PROCESSED,
      format: 'ALL',
      page: 0,
      pageSize: 30,
    },
    setSearchQuery: (query: Partial<ViewOrderQuery>) => {
      FindWtrOrderStore.searchQuery = {
        ...FindWtrOrderStore.searchQuery,
        ...query,
        // Reset page when filter chage
        page: query.page || 0,
      };
    },

    // this field below used for select watermaking order
    selectedWatermarkFile: null,
    setSelectedWatermarkFile: (data) => {
      FindWtrOrderStore.selectedWatermarkFile = data;
    },
    isPreview: false,
    setIsPreview: (value) => {
      FindWtrOrderStore.isPreview = value;
    },

    resetFindWtrOrderStore: () => {
      FindWtrOrderStore.selectedWatermarkFile = null;
      FindWtrOrderStore.isPreview = false;

      FindWtrOrderStore.searchQuery = {
        orderType: OrderType.WATERMARKING,
        startDate: sub(currentDate, { days: 364 }),
        endDate: currentDate,
        status: OrderStatus.PROCESSED,
        format: 'ALL',
        page: 0,
        pageSize: 30,
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
