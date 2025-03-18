import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { ProfileInfomation } from './interface';
import { getAttachmentByUrl } from '@web-workspace/shared/helpers/files/download-file';

interface MyAccountStoreType {
  profile: ProfileInfomation;
  setProfile: (data: ProfileInfomation) => void;

  incorrectPasswordCount: number;
  setIncorrectPasswordCount: (count: number) => void;
}

function createStore() {
  const store: MyAccountStoreType = {
    profile: {
      id: '',
      email: '',
      accountName: '',
      phone: '',
      status: '',
      lastLoginAt: '',
      lastLoginIp: '',
      companyName: '',
      zoneId: '',
      avatarUrl: '',
      avatarPreview: '',
      moreInfo: {},
      createdAt: '',
      updatedAt: '',
      createdBy: '',
      updatedBy: '',
    },
    incorrectPasswordCount: 0,

    setProfile: async (data) => {
      data.avatarPreview = MyAccountStore.profile.avatarPreview;
      if (
        data.avatarUrl &&
        data.avatarUrl !== MyAccountStore.profile.avatarUrl
      ) {
        try {
          const preview = (await getAttachmentByUrl({
            url: data.avatarUrl,
          })) as string;
          data.avatarPreview = preview;
        } catch (error) {
          console.error('Failed to fetch attachment:', error);
        }
      }
      MyAccountStore.profile = data;
    },
    setIncorrectPasswordCount(count) {
      MyAccountStore.incorrectPasswordCount = count;
    },
  };

  return store;
}

const MyAccountStore = proxy<MyAccountStoreType>(createStore());

devtools(MyAccountStore, { name: 'CS_API_MY_ACCOUNT' });

export default MyAccountStore;
