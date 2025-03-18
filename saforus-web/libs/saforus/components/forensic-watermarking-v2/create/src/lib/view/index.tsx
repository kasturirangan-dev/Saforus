import { Box, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CreateOrderWatermarkingProps } from '../data/interface';
import { FormProvider } from 'react-hook-form';
import FileLocationView from './file-location-view';
import FileInfo from './file-information';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import { useSnapshot } from 'valtio';
import WatermarkingStore from '@web-workspace/saforus/components/forensic-watermarking-v2/data';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

const CreateForensicWatermarkingView = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setValue,
  getValues,
  watch,
  methods,
  loading,
}: CreateOrderWatermarkingProps) => {
  const { t } = useTranslation();

  const filesUploaded = watch('files');
  const mediaTypes = ['IMG', 'AUDIO', 'VIDEO', 'DOCUMENT'];

  const { fileErrorMsg } = useSnapshot(WatermarkingStore);

  return (
    <BoxContainer>
      <FormProvider {...methods}>
        <FileLocationView
          setValue={setValue}
          getValues={getValues}
          watch={watch}
          mediaTypes={mediaTypes}
        />

        <FileInfo setValue={setValue} getValues={getValues} watch={watch} />
      </FormProvider>
      <LoadingButton
        onClick={handleSubmit(onSubmit)}
        disabled={
          !filesUploaded || !filesUploaded.length || Boolean(fileErrorMsg)
        }
        sx={{
          width: '400px',
          height: '46px',
          padding: '12px 18px',
          marginX: 'auto',
        }}
        type="submit"
        loading={loading}
      >
        {t('create-watermarking.insert-watermark')}
      </LoadingButton>
    </BoxContainer>
  );
};

export default CreateForensicWatermarkingView;
