import CreateRequestView from './view';
import { usePiracyData } from './data';

export function CreateNewRequest() {
  const {
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    getValues,
    watch,
    methods,
  } = usePiracyData();

  return (
    <CreateRequestView
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      errors={errors}
      setValue={setValue}
      getValues={getValues}
      watch={watch}
      methods={methods}
    />
  );
}

export default CreateNewRequest;
