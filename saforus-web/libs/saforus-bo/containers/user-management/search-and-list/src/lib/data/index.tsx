// Noted
/* at this time when fetch data is using mock there will be nothing 
  change when you try to cick the search button. when api available 
  this code will update soon
*/
import { yupResolver } from '@hookform/resolvers/yup';
import SearchUserStore, {
  RequestSearchAndList,
  ResponseSearchAndList,
  USER_MANAGEMENT_QUERY_KEY,
  getUserList,
  mockFetchSubscriptionOptions,
  mockFetchTeamNameOptions,
  validationSchema,
} from '@web-workspace/saforus-bo/components/user-management/search-user/data';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import { cloneDeep } from 'lodash-es';
import { formatTzDate } from '@web-workspace/shared/helpers/dates';
import { randomId } from '@web-workspace/shared/helpers/strings';

const useSearchAndListData = () => {
  const { i18n } = useTranslation();
  // hooks declaration area
  const {
    searchQuery,
    setSearchQuery,
    setOptionData,
    setUsers,
    total,
    setTotal,
    setTotalPage,
  } = useSnapshot(SearchUserStore);

  // fetch data for select and list
  const { isSuccess: isTeamNameSuccess } = useQuery(
    'teamNameOptions', // query key
    () => {
      setOptionData('teamName', mockFetchTeamNameOptions()); // query function
    }
    // { enabled: teamName.length === 0 } // query options (only fetch if teamName is empty)
  );

  // Use useQuery to fetch the subscription options
  const { isSuccess: isSubscriptionSuccess } = useQuery(
    'subscriptionOptions', // query key
    () => {
      setOptionData('subscription', mockFetchSubscriptionOptions()); // query function
    }
    // { enabled: subscription.length === 0 } // query options (only fetch if subscription is empty)
  );

  // Use useQuery to fetch the user list based on the search query
  const { isSuccess: isUsersSuccess } = useQuery(
    [USER_MANAGEMENT_QUERY_KEY.USER_LIST, ...Object.values(searchQuery)],
    () => {
      const queryData = cloneDeep(searchQuery) as Partial<RequestSearchAndList>;
      // Fetch data with date filter
      // Form 00:00 of start date to 23:59 of end date
      // Convert from local time to UTC time before sending to the server
      queryData.joinedDateStart = formatTzDate(searchQuery.joinedDateStart, 0);
      queryData.joinedDateEnd = formatTzDate(
        searchQuery.joinedDateEnd,
        0,
        false
      );

      const reqData = {
        userType: queryData.userType,
        status: queryData.status,
        joinedDateStart: queryData.joinedDateStart,
        joinedDateEnd: queryData.joinedDateEnd,
        pageNo: queryData.pageNo,
        sortBy: queryData.sortBy,
        sortOrder: queryData.sortOrder,
        elementPerPage: queryData.elementPerPage,
      };
      return getUserList(reqData);
    },
    {
      onSuccess: (data: ResponseSearchAndList) => {
        const resData = data.data;
        if (resData) {
          // at this time some data return by api is duplicate
          // this uniqueList is used to avoid strange behavior of list component(datagrid)
          const mapUsers = resData.elementList.map((item) => ({
            ...item,
            userId: item.id,
            id: randomId(),
          }));
          setUsers(mapUsers);
          setTotal(resData.totalElements);
          setTotalPage(resData.totalPages ?? 0);
        } else {
          setUsers([]);
          setTotal(0);
          setTotalPage(0);
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useForm<Partial<RequestSearchAndList>>({
    resolver: yupResolver(validationSchema),
    defaultValues: searchQuery,
  });
  ////////////////////////////////////////////////////////////////////

  // variable declaration area
  ////////////////////////////////////////////////////////////////////

  // useEffect declaration area
  ////////////////////////////////////////////////////////////////////

  // react function or function component declaration area
  const onSubmit = () => {
    setValue('pageNo', 0);
    setSearchQuery(getValues());
  };
  ////////////////////////////////////////////////////////////////////

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    values: getValues(),
    onSubmit,
    isSuccess: isUsersSuccess,
    isLoadingOptions: isTeamNameSuccess && isSubscriptionSuccess,
    control,
  };
};

export default useSearchAndListData;
