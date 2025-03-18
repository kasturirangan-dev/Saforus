import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { randomId } from '@web-workspace/shared/helpers/strings';
import {OrderDetailFiles, RequestOrderDetail, ResponseOrderDetail} from "./interface";

interface ViewOrderDetailStoreType {
  files: OrderDetailFiles[] | null;
  total: number;
  orderDetailLoading: boolean;
  requestQuery: RequestOrderDetail;
  setRequestQuery: (query: Partial<RequestOrderDetail>) => void;
  setFiles: (data: ResponseOrderDetail) => Promise<void>;
}

function viewOrderDetailStore() {
  const store: ViewOrderDetailStoreType = {
    files: [],
    total: 0,
    orderDetailLoading: false,
    setFiles: async (response: ResponseOrderDetail) => {
      ViewOrderDetailStore.files =
        response &&
        response.data &&
        response.data.length > 0 ?
        response.data.map((el) => {
          return { ...el, id: randomId() };
        }) : [];
      if (response.total !== ViewOrderDetailStore.total) {
        ViewOrderDetailStore.total = response.total;
      }
    },
    requestQuery: {
      orderId: '',
      fromRow: 0,
      rowCount: 10,
    },
    setRequestQuery: (query: Partial<RequestOrderDetail>) => {
      ViewOrderDetailStore.requestQuery = {
        ...ViewOrderDetailStore.requestQuery,
        ...query,
      };
    },
  };
  return store;
}

const ViewOrderDetailStore = proxy<ViewOrderDetailStoreType>(viewOrderDetailStore());
devtools(ViewOrderDetailStore, {
  name: 'VIEW_ORDER_DETAIL_STORE',
});

export default ViewOrderDetailStore;
