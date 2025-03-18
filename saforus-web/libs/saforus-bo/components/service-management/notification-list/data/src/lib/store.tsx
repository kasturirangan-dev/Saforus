import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import {
  Notification,
  NotificationStatus,
  NotificationType,
  RequestNotificationList,
} from './interface';
import { TOption } from '@web-workspace/saforus-bo/common/model';
import { sub } from 'date-fns';

type FieldKeys = 'typeOption' | 'editorOption' | 'statusOption';

type State = {
  notifications: Notification[];
  total: number;
  typeOption: TOption[];
  editorOption: TOption[];
  statusOption: TOption[];
  searchParams: Partial<RequestNotificationList>;
  [key: string]: any;
};

type Actions = {
  setNotifications: (notifications: Notification[]) => void;
  setTotal: (value: number) => void;
  setOptionData: (field: FieldKeys, options: TOption[]) => void;
  setSearchParam: (query: Partial<RequestNotificationList>) => void;
  resetState: () => void;
};

const currentDate = new Date();

const initialState: State = {
  notifications: [],
  total: 0,
  typeOption: [],
  editorOption: [],
  statusOption: [],
  searchParams: {
    type: NotificationType.All,
    // updatedBy: 0,
    status: NotificationStatus.All,
    startTime: sub(currentDate, { days: 30 }),
    endTime: currentDate,
    pageNo: 0
  },
};

const NotificationListStore = proxy<State & Actions>(createStore());

function createStore() {
  const store: State & Actions = {
    ...initialState,
    setNotifications(notifications) {
      NotificationListStore.notifications = notifications;
    },
    setTotal(value) {
      NotificationListStore.total = value;
    },
    setOptionData: (field: FieldKeys, options) => {
      NotificationListStore[field] = options;
    },
    setSearchParam: (query: Partial<RequestNotificationList>) => {
      NotificationListStore.searchParams = {
        ...NotificationListStore.searchParams,
        ...query,
      };
    },
    resetState() {
      Object.keys(initialState).forEach((key) => {
        NotificationListStore[key] = initialState[key];
      });
    },
  };
  return store;
}

devtools(NotificationListStore, { name: 'NOTIFICATION_LIST' });

export default NotificationListStore;
