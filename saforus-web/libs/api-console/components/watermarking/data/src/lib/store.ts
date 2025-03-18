import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

interface WatermarkingStoreType {
  file: File | null | undefined;
  createOrderId?: string | null;

  setFile: (file: File | null) => void;
  setCreateOrderId: (orderNo: string) => void;
  onReset: () => void;
}

const WatermarkingStore = proxy<WatermarkingStoreType>(createStore());

function createStore() {
  const store: WatermarkingStoreType = {
    file: null,
    createOrderId: null,

    setFile: (file: File | null) => {
      WatermarkingStore.file = file;
    },
    setCreateOrderId: (orderId) => {
      WatermarkingStore.createOrderId = orderId;
    },
    onReset: () => {
      WatermarkingStore.file = null;
      WatermarkingStore.createOrderId = null;
    },
  };
  return store;
}

devtools(WatermarkingStore, { name: 'DETECTION' });

export default WatermarkingStore;
