import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { memo, useEffect } from 'react';
import SupportedInfo from './supported';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import {
  PiracyCreateRequest,
  SEARCH_TYPE,
} from '../data/create-new-request.const';
import { useSnapshot } from 'valtio';
import PiracyStore from '../data/store';
import { Accept } from 'react-dropzone';
import { FileType } from '@web-workspace/saforus/common/model';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { StyledFileUpload } from '@web-workspace/saforus/common/views';
import { StepTitle } from '@web-workspace/saforus/components/forensic-watermarking-v2/common';
import { SearchFile } from './search-file';
import MediaPreview from '@web-workspace/shared/components/widgets/media-preview';
import {
  WatermarkInfo,
  FindWtrOrderStore,
} from '@web-workspace/saforus/components/piracy-detection/find-order-number-data';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}));

const FileUploadContainer = styled(Box)(({ theme }) => ({
  padding: '1.5rem',
  background: 'var(--base-white)',
  borderRadius: '16px',
  height: '100%',
}));

type Props = {
  // handleChange: (event: SyntheticEvent<Element, Event>, value: any) => void;
  setValue: UseFormSetValue<PiracyCreateRequest>;
  watch: UseFormWatch<PiracyCreateRequest>;
  register: UseFormRegister<PiracyCreateRequest>;
  onFilesAdded: (acceptedFiles: File[]) => void;
  handleRemoveFile: (item: FileType) => void;
  errors: FieldErrors<PiracyCreateRequest>;
  trigger: UseFormTrigger<PiracyCreateRequest>;
  onSearch: () => void;
  isSearching: boolean;
};
export function TabContentView({
  setValue,
  watch,
  errors,
  onFilesAdded,
  handleRemoveFile,
  trigger,
  onSearch,
  isSearching,
}: Props) {
  const { t } = useTranslation();

  const {
    files,
    configFile,
    searchType,
    fileErrorMsg,
    watermarkInfo,
    setSearchType,
    setWatermarkInfo,
  } = useSnapshot(PiracyStore);
  const isUploaded = files && files.length > 0;
  const { openDialog } = useSnapshot(DialogStore);

  const maxSize = 600 * 1024 * 1024;

  const onHandleUploadFilesError = (
    result: boolean,
    fileRejections: Array<{
      file: any;
      errors: Array<{ code: string; message: string }>;
    }>
  ) => {
    if (result) {
      fileRejections.forEach((fileRejection) => {
        const { errors } = fileRejection;
        const fileTypeError = errors.find(
          (error) => error.code === 'file-invalid-type'
        );
        const tooManyFilesError = errors.find(
          (error) => error.code === 'too-many-files'
        );

        if (fileTypeError) {
          openDialog({
            name: DialogType.CommonError,
            props: {
              title: t('create-new-request.confirm.unsupported'),
              closeTitle: t('create-new-request.confirm.retry-btn'),
            },
          });
          return;
        }

        if (tooManyFilesError) {
          openDialog({
            name: DialogType.CommonError,
            props: {
              title: t('create-new-request.confirm.only-one-file-allowed'),
              closeTitle: t('create-new-request.confirm.retry-btn'),
            },
          });
          return;
        }
      });
    }
  };

  const handleFindOrderNumber = () => {
    openDialog({
      name: DialogType.FindOrderNumberDialog,
      props: {
        onApply: applySelectedOrder,
      },
    });
  };

  const { setSelectedWatermarkFile, resetWatermarkingOrderStore } =
    useSnapshot(FindWtrOrderStore);

  useEffect(() => {
    return () => {
      setSelectedWatermarkFile(null);
      resetWatermarkingOrderStore(); // Reset data on find order dialog
    };
  }, []);

  const applySelectedOrder = (selectedWatermarkFile: WatermarkInfo) => {
    const orderNumber = selectedWatermarkFile.orderNo || '';
    const infoSq = selectedWatermarkFile.personOrderInfoSq || '';

    setWatermarkInfo(selectedWatermarkFile);

    // this is use for validate when selected a watermarking Order
    setValue('watermarkingOrderNo', orderNumber);
    if (orderNumber) {
      trigger('watermarkingOrderNo');
    }
    setValue('watermarkingOrderInfoSq', infoSq);
    if (infoSq) {
      trigger('watermarkingOrderInfoSq');
    }
  };

  const clearSelectedOrder = () => {
    setSearchType(SEARCH_TYPE.MANUAL);
    setSelectedWatermarkFile(null);
    setWatermarkInfo(null);
    setValue('watermarkingOrderNo', '');
    setValue('watermarkingOrderInfoSq', '');
  };

  return (
    <BoxContainer>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <BoxContainer>
          <StepTitle
            step={1}
            title={t('create-new-request.attack-file.title')}
            isActive={isUploaded}
          />

          <FileUploadContainer>
            {isUploaded ? (
              <MediaPreview
                file={{
                  contentType: files[0].contentType.field as string,
                  preview: files[0].preview,
                  fileName: files[0].psnInfoFileNm,
                  fileSize: files[0].size.field,
                }}
                onRemoveFile={() => handleRemoveFile(files[0])}
                errorMsg={fileErrorMsg}
                fullWidth
              />
            ) : (
              <StyledFileUpload
                onFilesAdded={onFilesAdded}
                accept={configFile.accept as Accept}
                multiple={false}
                maxSize={maxSize}
                onHandleError={onHandleUploadFilesError}
                dropFileText={'create-new-request.attack-file.drop-file-text'}
                browseFileText={
                  'create-new-request.attack-file.browse-file-text'
                }
              />
            )}
          </FileUploadContainer>
        </BoxContainer>
        <BoxContainer>
          <StepTitle
            step={2}
            title={t('create-new-request.search-watermark.title')}
            isActive={Boolean(watermarkInfo)}
          />

          <FileUploadContainer
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {isUploaded && watermarkInfo ? (
              <MediaPreview
                file={{
                  contentType: watermarkInfo.contentType || '',
                  preview: watermarkInfo.watermarkFile || '',
                  fileName: watermarkInfo.psnInfoFileNm || '',
                }}
                onRemoveFile={clearSelectedOrder}
                // Play back or original file
                control={
                  Boolean(watermarkInfo?.playback) || !watermarkInfo?.thumbnail
                }
                fullWidth
              />
            ) : (
              <SearchFile
                searchType={searchType}
                autoSearch={onSearch}
                manualSelect={handleFindOrderNumber}
                isSearching={isSearching}
              />
            )}
          </FileUploadContainer>
        </BoxContainer>
      </Box>

      <SupportedInfo />
    </BoxContainer>
  );
}

export default memo(TabContentView);
