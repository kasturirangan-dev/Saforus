import { useSearchInquiriesData } from '../data';
import InquirySearchFilterView from './inquiry-search-filter-view';

function InquirySearch() {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loading,
    setValue,
    values,
    control,
  } = useSearchInquiriesData();

  return (
    <InquirySearchFilterView
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
      values={values}
      loading={loading}
      setValue={setValue}
      control={control}
    />
  );
}

export default InquirySearch;
