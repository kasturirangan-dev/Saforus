import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import { date, number, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import React from 'react';
import { formatTzDate } from '@web-workspace/shared/helpers/dates';
import { cloneDeep } from 'lodash-es';
import {
  BaseResponseInquiries,
  INQUIRY_QUERY_KEY,
  MyInquiriesStore,
  RequestMyInquiries,
  SearchValidation,
  ValidationSchema,
  fetchInquiries,
} from '@web-workspace/saforus-bo/components/customer-support/data';

export function useSearchInquiriesData() {
  const { searchQuery, setInquiries, setSearchQuery } =
    useSnapshot(MyInquiriesStore);

  const { isLoading } = useQuery<unknown, Error, BaseResponseInquiries>({
    queryKey: [INQUIRY_QUERY_KEY.INQUIRY_LIST, ...Object.values(searchQuery)],
    queryFn: async () => {
      const queryData = cloneDeep(searchQuery) as Partial<RequestMyInquiries>;

      // Fetch data with date filter
      // Form 00:00 of start date to 23:59 of end date
      // Convert from local time to UTC time before sending to the server
      queryData.startDate = formatTzDate(searchQuery.startDate, 0);
      queryData.endDate = formatTzDate(searchQuery.endDate, 0, false);

      return fetchInquiries(queryData);
    },
    onError: () => {
      setInquiries(null);
    },
    onSuccess: (data) => {
      setInquiries(data.data);
    },
  });

  // Yup schema for validation
  const searchValidationSchema: ValidationSchema<SearchValidation> = {
    qaCategory: string().optional(),
    qaStatus: string().optional(),
    adminId: number().optional(),
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
