import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { sub } from 'date-fns';
import { Inquiry, RequestMyInquiries, ResponseInquiries } from './interface';

interface MyInquiriesStoreType {
  inquiries: Inquiry[];
  total: number;
  totalPages: number;
  inquiriesLoading: boolean;
  searchQuery: Partial<RequestMyInquiries>;
  setSearchQuery: (query: Partial<RequestMyInquiries>) => void;
  setInquiries: (data: ResponseInquiries | null) => Promise<void>;
  currentInquiry: Inquiry[] | null;
  currentInquiryId: number;
  setTotalPages: (value: number) => void;
  setCurrentInquiry: (data: ResponseInquiries | null) => void;
  setCurrentInquiryId: (id: number) => void;
}

function myInquiriesStore() {
  const currentDate = new Date();
  const store: MyInquiriesStoreType = {
    currentInquiryId: -1,
    inquiries: [],
    total: 0,
    totalPages: 1,
    inquiriesLoading: false,
    setInquiries: async (response: ResponseInquiries | null) => {
      if (response && response.elementList) {
        MyInquiriesStore.inquiries = response.elementList;
      } else {
        MyInquiriesStore.inquiries = [];
        MyInquiriesStore.total = 0;
        MyInquiriesStore.totalPages = 0;
      }
      if (response?.totalElements !== MyInquiriesStore.total) {
        MyInquiriesStore.total = response?.totalElements ?? 0;
      }
      const totalElements = response?.totalElements ?? 0;
      MyInquiriesStore.totalPages = Math.ceil(totalElements / 10);
    },
    searchQuery: {
      qaStatus: 'ALL',
      qaCategory: 'ALL',
      startDate: sub(currentDate, { days: 30 }),
      endDate: currentDate,
      pageNo: 0,
      elementPerPage: 10,
    },
    setTotalPages: (value: number) => {
      MyInquiriesStore.totalPages = value;
    },
    setSearchQuery: (query: Partial<RequestMyInquiries>) => {
      MyInquiriesStore.searchQuery = {
        ...MyInquiriesStore.searchQuery,
        ...query,
      };
    },
    currentInquiry: [],
    setCurrentInquiry: (data: ResponseInquiries | null) => {
      MyInquiriesStore.currentInquiry = data?.elementList ?? [];
    },
    setCurrentInquiryId: (id: number) => {
      MyInquiriesStore.currentInquiryId = id;
    },
  };
  return store;
}

const MyInquiriesStore = proxy<MyInquiriesStoreType>(myInquiriesStore());
devtools(MyInquiriesStore, {
  name: 'MY_INQUIRIES_STORE',
});

export default MyInquiriesStore;
