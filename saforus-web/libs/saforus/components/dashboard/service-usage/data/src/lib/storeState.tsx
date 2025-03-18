import { proxy, subscribe } from 'valtio';
import {
  StatisticalData,
  ProgressData,
  DateData,
  PeriodEnum,
  ServiceUsage,
  ForensicWatermarkingUsageData,
  GraphData,
  MediaUsageData,
} from './interface';
import { devtools } from 'valtio/utils';
import { sub, startOfYear, endOfYear } from 'date-fns';
import { convertNumber } from './utils';

export interface StoreState {
  forensicWatermarkingData: ForensicWatermarkingUsageData;
  contentPackagingData: StatisticalData;
  drmLicenseData: {
    total: number;
  };
  numberOfProcessingFilesData: ProgressData;
  fileStorageCapacityData: ProgressData;
  serviceUsageDate: DateData;
  usageByPeriodDate: DateData;
  billingOverviewDate: DateData;
  graphDate: DateData;
  period: PeriodEnum;
  chartData: GraphData[];
}

type StoreActions = {
  updateServiceUsageDate(newServiceUsageDate: DateData): void;
  updateUsageByPeriodDate(newServiceUsageDate: DateData): void;
  updatePeriod(period: PeriodEnum): void;
  updateServiceUsageData(data: ServiceUsage | null): void;
  updateChartData(newchartData: GraphData[]): void;
  setForensicWatermarkingData(data: ForensicWatermarkingUsageData): void;
};

const currentDate = new Date();

// Define a key to save the state in localStorage
const STORE_KEY = 'DashboardServiceUsageStoreState';

// Function to save state to localStorage
const saveStateToLocalStorage = (state: StoreState) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem(STORE_KEY, serializedState);
};

// Function to load state from localStorage
const loadStateFromLocalStorage = () => {
  const serializedState = localStorage.getItem(STORE_KEY);
  if (serializedState === null) return undefined;
  try {
    const state = JSON.parse(serializedState);

    // Assuming date fields are directly under the state and are not deeply nested
    // Adjust paths as necessary
    const dateFields = [
      'serviceUsageDate.startDate',
      'serviceUsageDate.endDate',
      'graphDate.startDate',
      'graphDate.endDate',
      'usageByPeriodDate.startDate',
      'usageByPeriodDate.endDate',
      'billingOverviewDate.startDate',
      'billingOverviewDate.endDate',
    ];
    dateFields.forEach((fieldPath) => {
      const [parent, child] = fieldPath.split('.');
      if (state[parent] && state[parent][child]) {
        state[parent][child] = new Date(state[parent][child]);
      }
    });

    return state;
  } catch (e) {
    console.error('Error loading state from localStorage', e);
    return undefined;
  }
};

// Load the persisted state, if available
const persistedState = loadStateFromLocalStorage();

const initialMediaStat = (contentType: string): MediaUsageData => ({
  contentType,
  totalCount: 0,
  inQueueCount: 0,
  inProgressCount: 0,
  completedCount: 0,
  failedCount: 0,
  totalSizeInMb: 0,
});

const storeInitialState: StoreState = {
  serviceUsageDate: {
    startDate: sub(currentDate, { days: 29 }),
    endDate: currentDate,
  },
  graphDate: {
    startDate: new Date(currentDate.getFullYear(), 0, 1),
    endDate: currentDate,
  },
  usageByPeriodDate: {
    startDate: new Date(currentDate.getFullYear(), 0, 1),
    endDate: currentDate,
  },
  billingOverviewDate: {
    startDate: currentDate,
    endDate: currentDate,
  },
  period: PeriodEnum.MONTHLY,
  numberOfProcessingFilesData: {
    totalNumber: 10,
    specificNumber: 0,
    unit: 'GB',
    percent: 0,
  },
  fileStorageCapacityData: {
    totalNumber: 20,
    specificNumber: 0,
    unit: 'GB',
    percent: 0,
  },
  forensicWatermarkingData: {
    watermarkingUses: {
      audioStat: initialMediaStat('AUDIO'),
      imageStat: initialMediaStat('IMAGE'),
      videoStat: initialMediaStat('VIDEO'),
      documentStat: initialMediaStat('DOCUMENT'),
    },

    piracyUsesStat: {
      audioCount: 0,
      failedCount: 0,
      imageCount: 0,
      totalCount: 0,
      totalSizeInMB: 0,
      videoCount: 0,
      audioStat: initialMediaStat('AUDIO'),
      imageStat: initialMediaStat('IMAGE'),
      videoStat: initialMediaStat('VIDEO'),
      documentStat: initialMediaStat('DOCUMENT'),
    },
    wtrCapacitySize: 0,
    wtrUsedCapacitySize: 0,
    wtrUsedPercentage: 0,
    cloudStorageSize: 0,
    cloudUsedPercentage: 0,
    cloudUsedStorageSize: 0,
  },
  contentPackagingData: {
    total: 0,
    inQueue: 0,
    inProgress: 0,
    completed: 0,
    failed: 0,
  },
  drmLicenseData: {
    total: 0,
  },
  chartData: [],
};

const storeActions = {
  setForensicWatermarkingData: (data: ForensicWatermarkingUsageData) => {
    DashboardServiceUsageStore.forensicWatermarkingData = data;
  },

  updateServiceUsageDate: (newServiceUsageDate: DateData) => {
    DashboardServiceUsageStore.serviceUsageDate = newServiceUsageDate;
  },
  updateUsageByPeriodDate: (newUsageByPeriodDate: DateData) => {
    DashboardServiceUsageStore.usageByPeriodDate = newUsageByPeriodDate;
  },
  updatePeriod: (period: PeriodEnum) => {
    switch (period) {
      case PeriodEnum.WEEKLY:
        DashboardServiceUsageStore.graphDate = {
          startDate: sub(currentDate, { days: 6 }),
          endDate: currentDate,
        };
        break;
      case PeriodEnum.YEARLY:
        DashboardServiceUsageStore.graphDate = {
          startDate: startOfYear(sub(currentDate, { years: 5 })),
          endDate: endOfYear(currentDate),
        };
        break;
      default:
        DashboardServiceUsageStore.graphDate = {
          startDate: new Date(currentDate.getFullYear(), 0, 1),
          endDate: currentDate,
        };
        break;
    }
    DashboardServiceUsageStore.period = period;
  },
  updateServiceUsageData(dataUpdate: ServiceUsage | null) {
    if (dataUpdate) {
      const {
        contentPackagingData,
        drmLicenseData,
        numberOfProcessingFilesData,
        fileStorageCapacityData,
      } = dataUpdate;
      DashboardServiceUsageStore.contentPackagingData = contentPackagingData;
      DashboardServiceUsageStore.drmLicenseData = drmLicenseData;
      DashboardServiceUsageStore.numberOfProcessingFilesData =
        numberOfProcessingFilesData;
      DashboardServiceUsageStore.fileStorageCapacityData =
        fileStorageCapacityData;
    }
  },
  updateChartData(newchartData: GraphData[]) {
    DashboardServiceUsageStore.chartData = newchartData;
  },
};

const createStore = (initialData: StoreState) => {
  return proxy<StoreState & StoreActions>({
    ...initialData,
    ...storeActions,
  });
};

export const DashboardServiceUsageStore = createStore(
  persistedState || storeInitialState
);

// Subscribe to store changes and save to localStorage
subscribe(DashboardServiceUsageStore, () => {
  saveStateToLocalStorage(DashboardServiceUsageStore);
});

devtools(DashboardServiceUsageStore, { name: 'SERVICE_USAGE_STORE' });
