import CreateRequestView from './view';
import { useWatermarkingData } from './data';
import { useTranslation } from 'react-i18next';

export function CreateNewRequest() {
  const {
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    getValues,
    watch,
    methods,
  } = useWatermarkingData();

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
