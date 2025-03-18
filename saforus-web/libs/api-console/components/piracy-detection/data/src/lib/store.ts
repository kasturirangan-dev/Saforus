import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

interface DetectionStoreType {
  file: File | null | undefined;
  createOrderId?: string | null;

  setFile: (file: File | null) => void;
  setCreateOrderId: (orderNo: string) => void;
  onReset: () => void;
}

const DetectionStore = proxy<DetectionStoreType>(createStore());

function createStore() {
  const store: DetectionStoreType = {
    file: null,
    createOrderId: null,

    setFile: (file: File | null) => {
      DetectionStore.file = file;
    },
    setCreateOrderId: (orderId) => {
      DetectionStore.createOrderId = orderId;
    },
    onReset: () => {
      DetectionStore.file = null;
      DetectionStore.createOrderId = null;
    },
  };
  return store;
}

devtools(DetectionStore, { name: 'DETECTION' });

export default DetectionStore;
