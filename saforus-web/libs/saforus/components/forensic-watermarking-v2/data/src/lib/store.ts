import { FileType } from '@web-workspace/saforus/common/model';
import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { WatermarkingOrderInfo } from './interface';

interface WatermarkingStoreType {
  createStep: number;
  createOrderNo?: string | null;
  currentOrder?: WatermarkingOrderInfo | null;
  fileErrorMsg: string;

  setCreateStep: (activeStep: number) => void;
  saveCreateOrderNo: (orderNo: string) => void;
  saveOrder: (order: WatermarkingOrderInfo) => void;
  setFileErrorMsg: (errorMsg: string) => void;
  onReset: () => void;
}

const WatermarkingStore = proxy<WatermarkingStoreType>(createStore());

function createStore() {
  const store: WatermarkingStoreType = {
    createStep: 1,
    fileErrorMsg: '',

    setCreateStep: (activeStep) => {
      WatermarkingStore.createStep = activeStep;
    },
    saveCreateOrderNo: (orderNo) => {
      WatermarkingStore.createOrderNo = orderNo;
    },
    saveOrder: (order) => {
      WatermarkingStore.currentOrder = order;
    },
    setFileErrorMsg: (errorMsg) => {
      WatermarkingStore.fileErrorMsg = errorMsg;
    },

    onReset: () => {
      WatermarkingStore.createStep = 1;
      WatermarkingStore.fileErrorMsg = '';
    },
  };
  return store;
}

devtools(WatermarkingStore, { name: 'WATERMARKING' });

export default WatermarkingStore;
