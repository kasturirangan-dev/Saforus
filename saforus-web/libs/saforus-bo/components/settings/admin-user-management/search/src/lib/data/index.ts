import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import { date, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import React, { useEffect } from 'react';
import { DateFormat, formatDate } from '@web-workspace/shared/helpers/dates';
import { cloneDeep } from 'lodash-es';
import { AdminUserManagementStore, BaseResponseAdminUser, QUERY_ADMIN_KEY, RequestAdminUser, SearchValidation, ValidationSchema, mockFetchAdminUsers } from '@web-workspace/saforus-bo/components/settings/admin-user-management/data';

/*
const useQueryWithEffect = ({
  key,
  queryFn,
  setSearchTypes,
  orderSearchType,
}: {
  key: string;
  queryFn: any;
  setSearchTypes: (values: any[], type: OrderSearchType) => void;
  orderSearchType: OrderSearchType;
}) => {
  // Initialize `enabled` to `true` if it hasn't been set for this key.
  if (!enabledState.has(key)) {
    enabledState.set(key, true);
  }

  const { isLoading, isError, data, error } = useQuery<
    unknown,
    Error,
    any[]
  >({
    queryKey: [key],
    queryFn: queryFn,
    enabled: enabledState.get(key),
    onSuccess: () => {
      // Set `enabled` to `false` after the first successful fetch.
      enabledState.set(key, false);
    },
  });

  useEffect(() => {
    if (!isLoading && data && !isError) {
      setSearchTypes(data, orderSearchType);
    } else {
      setSearchTypes([], orderSearchType);
    }
  }, [isLoading, data, isError]);

  return { isLoading, isError, data, error };
};
*/

export function useAdminUserSearchViewData() {
  const { searchQuery, setAdminUsers, setSearchQuery } =
    useSnapshot(AdminUserManagementStore);

  const { isLoading, isError, data } = useQuery<
    unknown,
    Error,
    BaseResponseAdminUser
  >({
    queryKey: [QUERY_ADMIN_KEY.VIEW_ADMIN_USER_LIST, ...Object.values(searchQuery)],
    queryFn: async () => {
      const queryData = cloneDeep(searchQuery) as Partial<RequestAdminUser>;
      queryData.startDate = formatDate(searchQuery.startDate, DateFormat.ISO);
      queryData.endDate = formatDate(searchQuery.endDate, DateFormat.ISO);
      // return fetchOrders(queryData);
      return mockFetchAdminUsers();
    },
  });

  useEffect(() => {
    if (!isLoading && data && !isError) {
      setAdminUsers(data.data);
    }
    if (isError) {
      setAdminUsers(null);
    }
    AdminUserManagementStore.listLoading = isLoading;
  }, [isLoading, data, isError]);

  /*useQueryWithEffect({
    key: QUERY_KEY.SERVICE_TYPES,
    queryFn: fetchServiceTypes,
    setSearchTypes,
    orderSearchType: OrderSearchType.SERVICE_TYPE,
  });

  useQueryWithEffect({
    key: QUERY_KEY.REQUESTERS,
    queryFn: fetchRequesters,
    setSearchTypes,
    orderSearchType: OrderSearchType.REQUESTER,
  });

  useQueryWithEffect({
    key: QUERY_KEY.STATUS,
    queryFn: fetchStatus,
    setSearchTypes,
    orderSearchType: OrderSearchType.STATUS,
  });

  useQueryWithEffect({
    key: QUERY_KEY.FORMAT,
    queryFn: fetchFormat,
    setSearchTypes,
    orderSearchType: OrderSearchType.FORMAT,
  });

  useQueryWithEffect({
    key: QUERY_KEY.CONTENT_TYPE,
    queryFn: fetchContentType,
    setSearchTypes,
    orderSearchType: OrderSearchType.CONTENT_TYPE,
  });
  */

  // Yup schema for validation
  const searchValidationSchema: ValidationSchema<SearchValidation> = {
    nameOrEmail: string().optional(),
    status: string().optional(),
    role: string().optional(),
    startDate: date()
      .nullable()
      .optional()
      .transform((v) =>
        v instanceof Date && !isNaN(v.getMilliseconds()) ? v : null
      ),
    endDate: date()
      .nullable()
      .optional()
      .transform((v) =>
        v instanceof Date && !isNaN(v?.getMilliseconds()) ? v : null
      )
      .when('startDate', (startDate, yup) =>
        startDate instanceof Date && !isNaN(startDate?.getMilliseconds())
          ? yup.min(startDate, 'To date should be later than from date')
          : yup
      ),
  };
  const validationSchema = object().shape(searchValidationSchema);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useForm<Partial<RequestAdminUser>>({
    resolver: yupResolver(validationSchema),
    defaultValues: searchQuery,
  });

  const onSubmit = () => {
    setValue('pageNo', 0);
    const values = getValues();
    setSearchQuery(values);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    values: getValues(),
    onSubmit,
    handleKeyPress,
    loading: isLoading,
    control,
  };
}
