import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import CommonStore, {
  formatType,
  getMetaData,
  QUERY_COMMON_KEY,
} from '@web-workspace/saforus/common/data';
import i18next, { t } from 'i18next';
import MyAccountStore, {
  getUserDetail,
  IUserDetailResponse,
} from '@web-workspace/saforus/components/user-info/my-account/data';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { MEDIA_TYPE } from '@web-workspace/saforus/common/model';

const useLayoutData = () => {
  const { setOptionData } = useSnapshot(CommonStore);
  const { setLoginInformation, loginInformation } = useSnapshot(MyAccountStore);
  const { userInfo } = useSnapshot(AuthStore);
  const { id: userId } = userInfo || {};

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
        const statusList = response.data.serviceTypeList
          .sort(
            (itemA: any, itemB: any) => itemA.displayOrder - itemB.displayOrder
          )
          .map((item: any) => ({
            value: item.enumName,
            label: item.displayName,
          }));
        setOptionData('serviceTypeList', statusList);
      } else {
        setOptionData('serviceTypeList', []);
      }

      if (response?.data?.userRoleList?.length > 0) {
        const userRoleList = response.data.userRoleList
          .sort(
            (itemA: any, itemB: any) => itemA.displayOrder - itemB.displayOrder
          )
          .map((item: any) => ({
            value: item.enumName,
            label: item.displayName,
          }));
        setOptionData('userRoleList', userRoleList);
      } else {
        setOptionData('userRoleList', []);
      }

      if (response?.data?.piracyDetectionModeList?.length > 0) {
        const piracyDetectionModeList = response.data.piracyDetectionModeList
          .sort(
            (itemA: any, itemB: any) => itemA.displayOrder - itemB.displayOrder
          )
          .map((item: any) => ({
            value: item.enumName,
            label: item.displayName,
          }));

        setOptionData('modeTypeList', [
          { value: 'ALL', label: 'All' },
          ...piracyDetectionModeList,
        ]);
      } else {
        setOptionData('modeTypeList', []);
      }

      if (response?.data?.userTeamStatusList?.length > 0) {
        const teamStatusList = response.data.userTeamStatusList
          .sort(
            (itemA: any, itemB: any) => itemA.displayOrder - itemB.displayOrder
          )
          .map((item: any) => ({
            value: item.enumName,
            label: item.displayName,
          }));
        setOptionData('userTeamStatusList', teamStatusList);
      } else {
        setOptionData('userTeamStatusList', []);
      }

      if (response?.data?.orderStatusTypeList?.length > 0) {
        const statusList = response.data.orderStatusTypeList
          .sort(
            (itemA: any, itemB: any) => itemA.displayOrder - itemB.displayOrder
          )
          .map((item: any) => ({
            value: item.enumName,
            label: item.displayName,
          }));
        setOptionData('orderStatusTypeList', statusList);
      } else {
        setOptionData('orderStatusTypeList', []);
      }

      if (response?.data?.contentTypeList?.length > 0) {
        const contentList = response.data.contentTypeList
          .sort(
            (itemA: any, itemB: any) => itemA.displayOrder - itemB.displayOrder
          )
          .map((item: any) => ({
            value: item.enumName,
            label: item.displayName,
          }));

        const document = response?.data?.contentTypeList?.find(
          (item: { enumName: string }) => item.enumName === MEDIA_TYPE.DOCUMENT
        );
        if (!document) {
          const newDocument = {
            enumName: MEDIA_TYPE.DOCUMENT,
            displayName: t('common.content-type.document'),
            displayOrder: 4,
          };

          // Add the new document to the contentList variable
          contentList.push({
            value: newDocument.enumName,
            label: newDocument.displayName,
          });
        }
        setOptionData('contentTypeList', contentList);
      } else {
        setOptionData('contentTypeList', []);
      }

      if (response?.data?.formatTypeList?.length > 0) {
        const formatList = response.data.formatTypeList
          .filter((item: any) => item.extension !== '.bmp')
          .sort(
            (itemA: any, itemB: any) => itemA.displayOrder - itemB.displayOrder
          )
          .map((item: any) => {
            let formattedValue = item?.extension.toUpperCase();
            if (item?.extension.startsWith('.')) {
              formattedValue = item?.extension.slice(1).toUpperCase();
            }
            if (item?.extension.slice(1).startsWith('.')) {
              formattedValue = item?.extension.replace('.', '_').toUpperCase();
            }
            if (item.type === formatType.ALL) {
              formattedValue = 'ALL';
            }

            return {
              label:
                formattedValue === 'ALL' ? item?.extension : formattedValue,
              value: formattedValue || '',
            };
          });
        setOptionData('formatTypeList', formatList);
      } else {
        setOptionData('formatTypeList', []);
      }

      if (response?.data?.inquiryStatusList?.length > 0) {
        const inquiryStatusList = response.data.inquiryStatusList
          .sort(
            (itemA: any, itemB: any) => itemA.displayOrder - itemB.displayOrder
          )
          .map((item: any) => ({
            value: item.enumName,
            label: item.displayName,
          }));
        setOptionData('inquiryStatusList', inquiryStatusList);
      } else {
        setOptionData('inquiryStatusList', []);
      }

      if (response?.data?.inquiryTypeList?.length > 0) {
        const inquiryTypeList = response.data.inquiryTypeList
          .sort(
            (itemA: any, itemB: any) => itemA.displayOrder - itemB.displayOrder
          )
          .map((item: any) => ({
            value: item.enumName,
            label: item.displayName,
          }));
        setOptionData('inquiryTypeList', inquiryTypeList);
      } else {
        setOptionData('inquiryTypeList', []);
      }
    },
  });

  const { isLoading: isMyAccountLoading } = useQuery<
    unknown,
    Error,
    IUserDetailResponse
  >({
    queryKey: ['MY_ACCOUNT'],
    queryFn: async () => {
      if (userId) {
        return getUserDetail(userId);
      }
      return null;
    },
    onSuccess: (response: IUserDetailResponse) => {
      setLoginInformation(response.data);
    },
  });

  return {
    refetch,
    isLoading: isLoading || isFetching,
  };
};

export default useLayoutData;
