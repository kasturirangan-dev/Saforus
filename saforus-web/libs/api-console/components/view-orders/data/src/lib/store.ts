import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { ViewOrderQuery, OrderDetail } from './interface';
import { sub } from 'date-fns';
import { OrderType } from '@web-workspace/api-console/common/model';

interface ViewOrderStoreType {
  // this field below used for set data for table
  orders: OrderDetail[];
  total: number;
  setOrders: (orders: OrderDetail[]) => void;
  setTotal: (value: number) => void;

  // this field below used for set search param for calling api
  searchQuery: ViewOrderQuery;
  setSearchQuery: (query: Partial<ViewOrderQuery>) => void;

  resetViewOrderStore: () => void;
}

function viewOrderStore() {
  const currentDate = new Date();
  const store: ViewOrderStoreType = {
    orders: [],
    total: 0,
    setOrders: (order) => {
      ViewOrderStore.orders = order;
    },
    setTotal: (value) => {
      ViewOrderStore.total = value;
    },

    searchQuery: {
      orderType: 'ALL',
      startDate: sub(currentDate, { days: 364 }),
      endDate: currentDate,
      status: 'ALL',
      format: 'ALL',
      keyword: '',
      channel: 'ALL',
      page: 0,
      pageSize: 10,
    },
    setSearchQuery: (query: Partial<ViewOrderQuery>) => {
      ViewOrderStore.searchQuery = {
        ...ViewOrderStore.searchQuery,
        ...query,
        // Reset page when filter chage
        page: query.page || 0,
      };
    },

    resetViewOrderStore: () => {
      ViewOrderStore.searchQuery = {
        orderType: 'ALL',
        startDate: sub(currentDate, { days: 364 }),
        endDate: currentDate,
        status: 'ALL',
        format: 'ALL',
        keyword: '',
        channel: 'ALL',
        page: 0,
        pageSize: 10,
      };
    },
  };
  return store;
}

const ViewOrderStore = proxy<ViewOrderStoreType>(viewOrderStore());
devtools(ViewOrderStore, {
  name: 'VIEW_ORDER_STORE',
});

export default ViewOrderStore;
