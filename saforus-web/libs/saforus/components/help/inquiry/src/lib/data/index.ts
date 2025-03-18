import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import { date, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import React, { useEffect } from 'react';
import { formatTzDate } from '@web-workspace/shared/helpers/dates';
import { cloneDeep } from 'lodash-es';
import {
  getMinuteOffset,
  getTeamId,
} from '@web-workspace/saforus/common/utils';
import {
  BaseResponseInquiries,
  INQUIRY_QUERY_KEY,
  MyInquiriesStore,
  RequestMyInquiries,
  SearchValidation,
  ValidationSchema,
  fetchInquiries,
} from '@web-workspace/saforus/components/help/data';

export function useSearchInquiriesData() {
  const { searchQuery, setInquiries, setSearchQuery } =
    useSnapshot(MyInquiriesStore);
  const tzOffset = getMinuteOffset();
  const { isLoading, isError, data } = useQuery<
    unknown,
    Error,
    BaseResponseInquiries
  >({
    queryKey: [INQUIRY_QUERY_KEY.INQUIRY_LIST, ...Object.values(searchQuery)],
    queryFn: async () => {
      const queryData = cloneDeep(searchQuery) as Partial<RequestMyInquiries>;
      queryData.startDate = formatTzDate(searchQuery.startDate, tzOffset);
      queryData.endDate = formatTzDate(searchQuery.endDate, tzOffset, false);
      const teamId = getTeamId();
      if (teamId) {
        queryData.teamId = teamId;
      }

      return fetchInquiries(queryData);
    },
  });

  useEffect(() => {
    if (!isLoading && data && !isError) {
      setInquiries(data.data);
    }
    if (isError) {
      setInquiries(null);
    }
    MyInquiriesStore.inquiriesLoading = isLoading;
  }, [isLoading, data, isError]);

  // Yup schema for validation
  const searchValidationSchema: ValidationSchema<SearchValidation> = {
    qaCategory: string().optional(),
    qaStatus: string().optional(),
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
  } = useForm<Partial<RequestMyInquiries>>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...searchQuery,
    },
  });

  const onSubmit = async (data: Partial<RequestMyInquiries>) => {
    setValue('pageNo', 0);
    setSearchQuery(data);
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
