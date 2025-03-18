import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { RequestWatermarkingViewOrder, WatermarkingOrder } from './interface';
import { sub } from 'date-fns';
import { ServiceType, TOption } from '@web-workspace/saforus/common/model';

interface ViewOrderStoreType {
  // this field below used for set data for table
  orders: WatermarkingOrder[];
  total: number;
  ordersLoading: boolean;
  numberOfSearchedItem: number;
  setOrders: (data: WatermarkingOrder[]) => void;
  setTotal: (value: number) => void;
  setOrdersLoading: (value: boolean) => void;
  setNumberOfSearchedItem: (value: number) => void;
  ///////////////////////////////////////////////

  // this field below used for set search param for calling api
  searchQuery: Partial<RequestWatermarkingViewOrder>;
  setSearchQuery: (query: Partial<RequestWatermarkingViewOrder>) => void;
  //////////////////////////////////////////////////

  // this field below used for order detail page
  currentOrderId: string | null;
  setCurrentOrderId: (orderId: string | null) => void;
  currentOrder: WatermarkingOrder | null;
  setCurrentOrder: (order: WatermarkingOrder | null) => void;
  ////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////
  resetWatermarkingOrderStore: () => void;
}

function viewOrderStore() {
  const currentDate = new Date();
  const store: ViewOrderStoreType = {
    orders: [],
    total: 0,
    ordersLoading: true,
    numberOfSearchedItem: 0,
    setOrders: (response) => {
      ViewOrderStore.orders = response;
    },
    setTotal: (value) => {
      ViewOrderStore.total = value;
    },
    setOrdersLoading(value) {
      ViewOrderStore.ordersLoading = value;
    },
    setNumberOfSearchedItem: (value) => {
      ViewOrderStore.numberOfSearchedItem = value;
    },

    searchQuery: {
      teamId: null,
      emailIdOrName: '',
      userId: null,
      orderNo: '',
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
    resetWatermarkingOrderStore: () => {
      ViewOrderStore.searchQuery = {
        teamId: null,
        emailIdOrName: '',
        userId: null,
        orderNo: '',
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
