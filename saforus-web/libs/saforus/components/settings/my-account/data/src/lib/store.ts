import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { CompanyInfo, UserInfo } from './interface';
import {
  mockUpdateUserInfo as updateUser,
} from './mock';

const UserInfoStore = proxy<{
  userInfo: UserInfo | null;
  editingCompanyId: string | null;
  updateUserOverview: (
    userId: string,
    updatedOverview: Partial<UserInfo>
  ) => Promise<UserInfo | null>;
  updateCompany: (
    userId: string,
    companyId: string,
    updatedCompany: Partial<CompanyInfo>
  ) => void;
}>({
  userInfo: null,
  editingCompanyId: null,
  updateUserOverview: async (userId, updatedOverview) => {
    const updatedData = await updateUser(userId, updatedOverview);
    UserInfoStore.userInfo = updatedData;
    return updatedData;
  },
  updateCompany: (userId, companyId, updateCompany) => {
    if (UserInfoStore.userInfo) {
      const companyInfo = UserInfoStore.userInfo.companyInfo;
      if (companyInfo) {
        UserInfoStore.userInfo.companyInfo = { ...companyInfo, ...updateCompany };
      }
    }
  },
});

devtools(UserInfoStore, { name: 'SETTINGS_SITES' });

export default UserInfoStore;
