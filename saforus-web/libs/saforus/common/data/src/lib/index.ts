import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { TOption } from '@web-workspace/saforus/common/model';

type FieldKeys =
  | 'serviceTypeList'
  | 'userRoleList'
  | 'modeTypeList'
  | 'userTeamStatusList'
  | 'orderStatusTypeList'
  | 'contentTypeList'
  | 'formatTypeList'
  | 'inquiryStatusList'
  | 'inquiryTypeList';

interface CommonDataState {
  isLoading: boolean;
  serviceTypeList: TOption[];
  userRoleList: TOption[];
  modeTypeList: TOption[];
  userTeamStatusList: TOption[];
  orderStatusTypeList: TOption[];
  contentTypeList: TOption[];
  formatTypeList: TOption[];
  inquiryStatusList: TOption[];
  inquiryTypeList: TOption[];
  setOptionData: (field: FieldKeys, options: TOption[]) => void;
  setLoading: (isLoading: boolean) => void;
  onReset: () => void;
}

const CommonStore = proxy<CommonDataState>({
  isLoading: false,
  serviceTypeList: [],
  userRoleList: [],
  userTeamStatusList: [],
  modeTypeList: [],
  orderStatusTypeList: [],
  contentTypeList: [],
  formatTypeList: [],
  inquiryStatusList: [],
  inquiryTypeList: [],
  setOptionData: (field: FieldKeys, options) => {
    CommonStore[field] = options;
  },
  setLoading: (isLoading) => {
    CommonStore.isLoading = isLoading;
  },
  onReset: () => {
    CommonStore.serviceTypeList = [];
    CommonStore.userRoleList = [];
    CommonStore.userTeamStatusList = [];
    CommonStore.modeTypeList = [];
    CommonStore.orderStatusTypeList = [];
    CommonStore.contentTypeList = [];
    CommonStore.formatTypeList = [];
    CommonStore.inquiryStatusList = [];
    CommonStore.inquiryTypeList = [];
  },
});

devtools(CommonStore, { name: 'CommonStore' });

export default CommonStore;
