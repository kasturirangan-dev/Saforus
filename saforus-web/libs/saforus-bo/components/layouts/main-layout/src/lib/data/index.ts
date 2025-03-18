import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import i18next from 'i18next';
import CommonStore, {
  QUERY_COMMON_KEY,
  getAdminList,
  getMetaData,
} from '@web-workspace/saforus-bo/common/data';

const useLayoutData = () => {
  const { setOptionData } = useSnapshot(CommonStore);

  const { isLoading, refetch, isFetching } = useQuery<unknown, Error, any>({
    queryKey: [QUERY_COMMON_KEY.META_DATA],
    cacheTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return getMetaData(i18next.language);
    },
    onSuccess: (response: any) => {
      if (response?.data?.serviceTypeList?.length > 0) {
        const statusList = response.data.serviceTypeList.map((item: any) => ({
          value: item.enumName,
          label: item.displayName,
        }));
        setOptionData('serviceTypeList', statusList);
      } else {
        setOptionData('serviceTypeList', []);
      }

      if (response?.data?.userRoleList?.length > 0) {
        const userRoleList = response.data.userRoleList.map((item: any) => ({
          value: item.enumName,
          label: item.displayName,
        }));
        setOptionData('userRoleList', userRoleList);
      } else {
        setOptionData('userRoleList', []);
      }

      if (response?.data?.userTeamStatusList?.length > 0) {
        const teamStatusList = response.data.userTeamStatusList.map(
          (item: any) => ({
            value: item.enumName,
            label: item.displayName,
          })
        );
        setOptionData('userTeamStatusList', teamStatusList);
      } else {
        setOptionData('userTeamStatusList', []);
      }

      if (response?.data?.orderStatusTypeList?.length > 0) {
        const statusList = response.data.orderStatusTypeList.map(
          (item: any) => ({
            value: item.enumName,
            label: item.displayName,
          })
        );
        setOptionData('orderStatusTypeList', statusList);
      } else {
        setOptionData('orderStatusTypeList', []);
      }

      if (response?.data?.contentTypeList?.length > 0) {
        const contentList = response.data.contentTypeList.map((item: any) => ({
          value: item.enumName,
          label: item.displayName,
        }));
        setOptionData('contentTypeList', contentList);
      } else {
        setOptionData('contentTypeList', []);
      }

      if (response?.data?.formatTypeList?.length > 0) {
        const formatList = response.data.formatTypeList.map((item: any) => {
          let formattedValue = item?.extension.toUpperCase();
          if (item?.extension.startsWith('.')) {
            formattedValue = item?.extension.slice(1).toUpperCase();
          }
          if (item?.extension.slice(1).startsWith('.')) {
            formattedValue = item?.extension.replace('.', '_').toUpperCase();
          }
          return {
            label: item?.extension || '',
            value: formattedValue || '',
          };
        });
        setOptionData('formatTypeList', formatList);
      } else {
        setOptionData('formatTypeList', []);
      }

      if (response?.data?.inquiryStatusList?.length > 0) {
        const inquiryStatusList = response.data.inquiryStatusList.map(
          (item: any) => ({
            value: item.enumName,
            label: item.displayName,
          })
        );
        setOptionData('inquiryStatusList', inquiryStatusList);
      } else {
        setOptionData('inquiryStatusList', []);
      }

      if (response?.data?.inquiryTypeList?.length > 0) {
        const inquiryTypeList = response.data.inquiryTypeList.map(
          (item: any) => ({
            value: item.enumName,
            label: item.displayName,
          })
        );
        setOptionData('inquiryTypeList', inquiryTypeList);
      } else {
        setOptionData('inquiryTypeList', []);
      }

      if (response?.data?.noticeTypeList?.length > 0) {
        const noticeTypeList = response.data.noticeTypeList.map(
          (item: any) => ({
            value: item.enumName,
            label: item.displayName,
          })
        );
        noticeTypeList.push({
          value: 'ALL',
          label: 'All',
        });
        setOptionData('noticeTypeList', noticeTypeList);
      } else {
        setOptionData('noticeTypeList', []);
      }

      if (response?.data?.noticeStatusList?.length > 0) {
        const noticeStatusList = response.data.noticeStatusList.map(
          (item: any) => ({
            value: item.enumName,
            label: item.displayName,
          })
        );
        noticeStatusList.push({
          value: 'ALL',
          label: 'All',
        });
        setOptionData('noticeStatusList', noticeStatusList);
      } else {
        setOptionData('noticeStatusList', []);
      }
    },
  });

  const { isLoading: isLoadingAdmin } = useQuery<unknown, Error, any>({
    queryKey: [QUERY_COMMON_KEY.ADMIN_LIST],
    cacheTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return getAdminList();
    },
    onSuccess: (response: any) => {
      if (response?.data?.length > 0) {
        const adminList = response?.data?.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));
        setOptionData('adminList', adminList);
      } else {
        setOptionData('adminList', []);
      }
    },
    onError: (error) => {
      console.error('Error while fetching admin list', error);
    },
  });

  return {
    refetch,
    isLoading: isLoading || isFetching,
  };
};

export default useLayoutData;
