import { useAdminUserSearchViewData } from './data';
import AdminUserSearchView from './view';

function PiracyOrderSearchComponent() {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loading,
    setValue,
    values,
    control,
  } = useAdminUserSearchViewData();

  return (
    <AdminUserSearchView
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

export default PiracyOrderSearchComponent;
