import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import {
  RequestWatermarkingOrders,
  WatermarkingOrder,
} from './interface';
import { sub } from 'date-fns';
import { TOption, ServiceType } from '@web-workspace/saforus-bo/common/model';

type FieldKeys =
  | 'requesters';

interface WatermarkingOrdersStoreType {
  // this field below used for set data for table
  orders: WatermarkingOrder[];
  total: number;
  ordersLoading: boolean;
  totalPages: number;
  setOrders: (data: WatermarkingOrder[]) => void;
  setTotal: (value: number) => void;
  setOrdersLoading: (value: boolean) => void;
  setTotalPages: (value: number) => void;
  ///////////////////////////////////////////////

  // this field below used for set search param for calling api
  searchQuery: Partial<RequestWatermarkingOrders>;
  setSearchQuery: (query: Partial<RequestWatermarkingOrders>) => void;
  //////////////////////////////////////////////////

  // this field below used for order detail page
  currentOrderId: string | null;
  setCurrentOrderId: (orderId: string | null) => void;
  currentOrder: WatermarkingOrder | null;
  setCurrentOrder: (order: WatermarkingOrder | null) => void;
  ////////////////////////////////////////////////////////

  // this field below used for set options for select box
  requesters: TOption[];
  setOptionData: (field: FieldKeys, options: TOption[]) => void;
  ///////////////////////////////////////////////////
  resetWatermarkingOrderStore: () => void;
}

function WatermarkingOrdersStore() {
  const currentDate = new Date();
  const store: WatermarkingOrdersStoreType = {
    orders: [],
    total: 0,
    ordersLoading: true,
    totalPages: 1,
    setOrders: (response) => {
      ViewOrderStore.orders = response;
    },
    setTotal: (value) => {
      ViewOrderStore.total = value;
    },
    setOrdersLoading(value) {
      ViewOrderStore.ordersLoading = value;
    },
    setTotalPages: (value) => {
      ViewOrderStore.totalPages = value;
    },
    searchQuery: {
      // teamId: 0,
      // userId: 0,
      emailIdOrName: '',
      orderNo: '',
      serviceType: ServiceType.DIGITAL_WATERMARKING,
      orderRequestStatus: 'ALL',
      contentType: 'ALL',
      format: 'ALL',
      startDate: sub(currentDate, { days: 30 }),
      endDate: currentDate,
      pageNo: 0,
      elementPerPage: 10,
    },
    setSearchQuery: (query: Partial<RequestWatermarkingOrders>) => {
      ViewOrderStore.searchQuery = {
        ...ViewOrderStore.searchQuery,
        ...query,
      };
    },

    currentOrderId: null,
    setCurrentOrderId: (orderId: string | null) => {
      ViewOrderStore.currentOrderId = orderId;
    },
    currentOrder: null,
    setCurrentOrder: (order: WatermarkingOrder | null) => {
      ViewOrderStore.currentOrder = order;
    },
    requesters: [],
    setOptionData: (field, options) => {
      ViewOrderStore[field] = options;
    },

    resetWatermarkingOrderStore: () => {
      ViewOrderStore.orders = [];
      ViewOrderStore.total = 0;
      ViewOrderStore.searchQuery = {
        // teamId: null,
        // userId: null,
        emailIdOrName: '',
        orderNo: '',
        serviceType: ServiceType.DIGITAL_WATERMARKING,
        orderRequestStatus: 'ALL',
        contentType: 'ALL',
        format: 'ALL',
        startDate: sub(currentDate, { days: 30 }),
        endDate: currentDate,
        pageNo: 0,
        elementPerPage: 10,
      };
    },
  };
  return store;
}

const ViewOrderStore = proxy<WatermarkingOrdersStoreType>(WatermarkingOrdersStore());
devtools(ViewOrderStore, {
  name: 'WATER_MARKING_VIEW_ORDER_STORE',
});

export default ViewOrderStore;
