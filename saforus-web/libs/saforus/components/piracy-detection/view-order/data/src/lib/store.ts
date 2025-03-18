import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { RequestPiracyOrder, PiracyOrder } from './interface';
import { sub } from 'date-fns';
import { ServiceType } from '@web-workspace/saforus/common/model';

interface PiracyOrderStoreType {
  // this field below used for select watermaking order
  selectedWatermarkFile: watermarkInfo | null;
  setSelectedWatermarkFile: (date: watermarkInfo | null) => void;
  mediaType: string;
  setMediaType: (mediaType: string) => void;
  isPreview: boolean;
  setIsPreview: (value: boolean) => void;

  // this field below used for set data for table
  orders: PiracyOrder[];
  total: number;
  setOrders: (orders: PiracyOrder[]) => void;
  setTotal: (value: number) => void;

  // this field below used for set search param for calling api
  searchQuery: Partial<RequestPiracyOrder>;
  setSearchQuery: (query: Partial<RequestPiracyOrder>) => void;

  resetPiracyOrderStore: () => void;
}

function piracyOrderStore() {
  const currentDate = new Date();
  const store: PiracyOrderStoreType = {
    selectedWatermarkFile: null,
    setSelectedWatermarkFile: (data) => {
      PiracyOrderStore.selectedWatermarkFile = data;
    },

    mediaType: 'IMG',
    setMediaType: (mediaType) => {
      PiracyOrderStore.mediaType = mediaType;
    },
    isPreview: false,
    setIsPreview: (value) => {
      PiracyOrderStore.isPreview = value;
    },

    orders: [],
    total: 0,
    setOrders: (order) => {
      PiracyOrderStore.orders = order;
    },
    setTotal: (value) => {
      PiracyOrderStore.total = value;
    },

    searchQuery: {
      teamId: null,
      orderNo: '',
      serviceType: ServiceType.PIRACY_DETECTION,
      userId: null,
      orderRequestStatus: 'ALL',
      contentType: 'ALL',
      format: 'ALL',
      startDate: sub(currentDate, { days: 29 }),
      endDate: currentDate,
      pageNo: 0,
      elementPerPage: 10,
    },
    setSearchQuery: (query: Partial<RequestPiracyOrder>) => {
      PiracyOrderStore.searchQuery = {
        ...PiracyOrderStore.searchQuery,
        ...query,
      };
    },

    resetPiracyOrderStore: () => {
      PiracyOrderStore.selectedWatermarkFile = null;
      PiracyOrderStore.mediaType = 'IMG';
      PiracyOrderStore.isPreview = false;
      PiracyOrderStore.searchQuery = {
        teamId: 0,
        orderNo: '',
        userId: null,
        serviceType: ServiceType.PIRACY_DETECTION,
        orderRequestStatus: 'ALL',
        contentType: 'ALL',
        format: 'ALL',
        startDate: sub(currentDate, { days: 29 }),
        endDate: currentDate,
        pageNo: 0,
        elementPerPage: 10,
      };
    },
  };
  return store;
}

const PiracyOrderStore = proxy<PiracyOrderStoreType>(piracyOrderStore());
devtools(PiracyOrderStore, {
  name: 'PIRACY_ORDER_STORE',
});

export default PiracyOrderStore;
