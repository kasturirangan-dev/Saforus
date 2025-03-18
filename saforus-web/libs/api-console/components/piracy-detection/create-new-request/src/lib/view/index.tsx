import { Box, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PiracyCreateRequestProps } from '../data/interface';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import { FormProvider } from 'react-hook-form';
import {
  FileUpload,
  SupportedInfo,
} from '@web-workspace/api-console/components/file-upload';
import { FileType, OrderType } from '@web-workspace/api-console/common/model';
import DetectionStore from '@web-workspace/api-console/components/piracy-detection/data';
import { useSnapshot } from 'valtio';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export const CreateRequestView = ({
  handleSubmit,
  onSubmit,
  errors,
  setValue,
  getValues,
  watch,
  methods,
}: PiracyCreateRequestProps) => {
  const { t } = useTranslation();
  const file = watch('file') as FileType;
  const { setFile } = useSnapshot(DetectionStore);

  return (
    <BoxContainer>
      <FormProvider {...methods}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FileUpload
            file={file}
            setFile={(value: FileType | any) => {
              setValue('file', value);
              setFile(value?.file || null);
            }}
            dropFileText="apiDetection.create.drop-file-text"
            browseFileText="apiDetection.create.browse-file-text"
            serviceType={OrderType.DETECTION}
          />
          <SupportedInfo serviceType={OrderType.DETECTION} />
        </Box>

        <LoadingButton
          disabled={!file?.file}
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
          {t('apiDetection.create.request-detection')}
        </LoadingButton>
      </FormProvider>
    </BoxContainer>
  );
};

export default CreateRequestView;
