import { memo, useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TabContentView } from './tab-content-view';
import { PiracyCreateRequestProps } from '../data/interface';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import PiracyStore from '../data/store';
import { useSnapshot } from 'valtio';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

const CreateRequestView = ({
  handleSubmit,
  onSubmit,
  register,
  setValue,
  watch,
  onFilesAdded,
  handleRemoveFile,
  errors,
  trigger,
  onSearch,
  isSearching,
}: PiracyCreateRequestProps) => {
  const { t } = useTranslation();

  const [isValid, setIsValid] = useState(false);
  const { fileErrorMsg } = useSnapshot(PiracyStore);

  const formData = watch();
  useEffect(() => {
    const isUploaded = formData.fileIds && formData.fileIds.length > 0;
    if (
      isUploaded &&
      formData.watermarkingOrderInfoSq &&
      !fileErrorMsg
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  return (
    <BoxContainer>
      <TabContentView
        setValue={setValue}
        register={register}
        errors={errors}
        onFilesAdded={onFilesAdded}
        handleRemoveFile={handleRemoveFile}
        watch={watch}
        trigger={trigger}
        onSearch={onSearch}
        isSearching={isSearching}
      />

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
        {t('create-new-request.submit-request')}
      </LoadingButton>
    </BoxContainer>
  );
};

export default memo(CreateRequestView);
