import { TOption } from '@web-workspace/saforus-bo/common/model';
import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

type FieldKeys =
  | 'serviceTypeList'
  | 'userRoleList'
  | 'userTeamStatusList'
  | 'orderStatusTypeList'
  | 'contentTypeList'
  | 'formatTypeList'
  | 'inquiryStatusList'
  | 'adminList'
  | 'inquiryTypeList'
  | 'noticeStatusList'
  | 'noticeTypeList';

interface CommonDataState {
  isLoading: boolean;
  serviceTypeList: TOption[];
  userRoleList: TOption[];
  userTeamStatusList: TOption[];
  orderStatusTypeList: TOption[];
  contentTypeList: TOption[];
  formatTypeList: TOption[];
  inquiryStatusList: TOption[];
  adminList: TOption[];
  inquiryTypeList: TOption[];
  noticeTypeList: TOption[];
  noticeStatusList: TOption[];
  setOptionData: (field: FieldKeys, options: TOption[]) => void;
  setLoading: (isLoading: boolean) => void;
}

const CommonStore = proxy<CommonDataState>({
  isLoading: false,
  serviceTypeList: [],
  userRoleList: [],
  userTeamStatusList: [],
  orderStatusTypeList: [],
  contentTypeList: [],
  formatTypeList: [],
  inquiryStatusList: [],
  adminList: [],
  inquiryTypeList: [],
  noticeTypeList: [],
  noticeStatusList: [],
  setOptionData: (field: FieldKeys, options) => {
    CommonStore[field] = options;
  },
  setLoading: (isLoading) => {
    CommonStore.isLoading = isLoading;
  },
});

devtools(CommonStore, { name: 'CommonStore' });

export default CommonStore;
