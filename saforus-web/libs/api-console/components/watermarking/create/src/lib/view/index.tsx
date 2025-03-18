import { memo, useMemo } from 'react';
import { Box, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { WatermarkingRequestProps } from '../data/interface';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import { FormProvider } from 'react-hook-form';
import {
  FileUpload,
  SupportedInfo,
} from '@web-workspace/api-console/components/file-upload';
import FileInfo from './file-information';
import { FileType } from '@web-workspace/api-console/common/model';
import { StepTitle } from '@web-workspace/api-console/common/views';
import WatermarkingStore from '@web-workspace/api-console/components/watermarking/data';
import { useSnapshot } from 'valtio';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

const CreateRequestView = ({
  handleSubmit,
  onSubmit,
  errors,
  setValue,
  getValues,
  watch,
  methods,
}: WatermarkingRequestProps) => {
  const { t } = useTranslation();
  const { setFile } = useSnapshot(WatermarkingStore);

  const file = watch('file') as FileType;
  const wtrOrderFiles = watch('wtrOrderFiles');

  const isUploaded = Boolean(file?.file);
  const isValid = useMemo(() => {
    const desInputted = wtrOrderFiles?.every((file) => file.wtrDescription);
    return file?.file && desInputted;
  }, [file, wtrOrderFiles]);

  return (
    <BoxContainer>
      <FormProvider {...methods}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <StepTitle
            step={1}
            title={t('apiWatermarking.create.upload-file')}
            isActive={isUploaded}
          />
          <FileUpload
            file={file}
            setFile={(value: FileType | any) => {
              setValue('file', value);
              setFile(value?.file || null);
            }}
            dropFileText="apiWatermarking.create.drop-file-text"
            browseFileText="apiWatermarking.create.browse-file-text"
          />
          <SupportedInfo />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <StepTitle
            step={2}
            title={t('apiWatermarking.create.insert-watermark')}
            isActive={isUploaded}
          />
          <FileInfo setValue={setValue} getValues={getValues} watch={watch} />
        </Box>

        <LoadingButton
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
          fullWidth
          sx={{
            width: '400px',
            height: '46px',
            padding: '12px 18px',
            marginX: 'auto',
          }}
          type="submit"
        >
          {t('apiWatermarking.create.submit-order')}
        </LoadingButton>
      </FormProvider>
    </BoxContainer>
  );
};

export default CreateRequestView;
