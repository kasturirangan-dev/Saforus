import { useMemo } from 'react';
import { Box, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { isNotEmpty, randomId } from '@web-workspace/shared/helpers/strings';
import { WatermarkingCreateOrder } from '../data/utils';
import {
  FieldWithSupport,
  FileType,
  IConfigMedia,
  MediaConfigs,
} from '@web-workspace/saforus/common/model';
import { PATTERN } from '@web-workspace/saforus/constants/validation';
import { StepTitle } from '@web-workspace/saforus/components/forensic-watermarking-v2/common';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useSnapshot } from 'valtio';
import WatermarkingStore from '@web-workspace/saforus/components/forensic-watermarking-v2/data';
import SupportedInfo from './supported';
import { StyledFileUpload } from '@web-workspace/saforus/common/views';
import MediaPreview from '@web-workspace/shared/components/widgets/media-preview';

const FileUploadContainer = styled(Box)(({ theme }) => ({
  padding: '1.5rem',
  background: 'var(--base-white)',
  borderRadius: '16px',
}));

const contentTypeMap = {
  image: 'IMG',
  audio: 'AUDIO',
  video: 'VIDEO',
  application: 'DOCUMENT',
};

function getConfig(mediaTypes: string[]): IConfigMedia {
  return mediaTypes.reduce(
    (acc, key) => {
      const config = MediaConfigs[key as keyof typeof MediaConfigs];

      // Combine supportedExts
      acc.supportedExts = [
        ...(acc.supportedExts || []),
        ...config.supportedExts,
      ];

      // Combine supportedFormats
      acc.supportedFormats = [
        ...(acc.supportedFormats || []),
        ...config.supportedFormats,
      ];

      // Combine accept objects
      acc.accept = { ...acc.accept, ...config.accept };

      return acc;
    },
    {
      multiple: false,
      maxFile: 50,
    } as IConfigMedia
  );
}

export interface FileLocationViewProps {
  setValue: UseFormSetValue<WatermarkingCreateOrder>;
  getValues: UseFormGetValues<WatermarkingCreateOrder>;
  watch: UseFormWatch<WatermarkingCreateOrder>;
  mediaTypes: string[];
}

const FileLocationView = ({
  setValue,
  getValues,
  watch,
  mediaTypes,
}: FileLocationViewProps) => {
  const { t } = useTranslation();
  const filesUploaded = watch('files');
  const isUploaded = filesUploaded && filesUploaded.length > 0;

  const { openDialog } = useSnapshot(DialogStore);
  const maxSize = 600 * 1024 * 1024;

  const { fileErrorMsg, setFileErrorMsg } = useSnapshot(WatermarkingStore);

  const config = getConfig(mediaTypes);

  const onFilesAdded = (acceptedFiles: File[]) => {
    // const maxFileNameLength = 250;
    const convertedFiles = acceptedFiles.map((file) => {
      const ext = file.name.split('.').pop() || '';
      const fileType = file.type.split('/')[0];
      const fileFormat = file.type?.split('/').pop() || '';
      const fileName = file.name.split('.').shift() || '';

      let supportedFileFormat = false;
      if (isNotEmpty(fileFormat)) {
        config.supportedExts.forEach((e) => {
          if (fileFormat.toUpperCase().includes(e)) {
            supportedFileFormat = true;
            return;
          }
        });
      } else {
        supportedFileFormat =
          config.supportedExts?.includes(ext.toUpperCase()) ?? false;
      }

      if (!supportedFileFormat) {
        openDialog({
          name: DialogType.CommonError,
          props: {
            title: t('create-watermarking.attack-file.unsupported'),
            closeTitle: t('create-watermarking.attack-file.try-again'),
          },
        });
        return;
      }

      const supportedFileName = PATTERN.REQUEST_FILE_NAME.test(fileName);
      if (!supportedFileName) {
        setFileErrorMsg('create-watermarking.attack-file.invalid-name');
      }

      const supportedFileSize = maxSize >= file.size;
      if (!supportedFileSize) {
        setFileErrorMsg(
          'page-watermarking.create.message.file-selected-capacity'
        );
      }

      const id = randomId();
      const preview = URL.createObjectURL(file);
      const contentType = contentTypeMap[fileType] || 'IMG';
      const supported =
        supportedFileFormat && supportedFileSize && supportedFileName;

      return {
        id: id,
        psnInfoId: id,
        psnInfoFileNm: file.name,
        contentType: {
          field: contentType,
          supported: supported,
        } as FieldWithSupport,
        format: ext,
        size: {
          field: file.size,
          supported: supported,
        } as FieldWithSupport,
        supported: supported,
        file: file,
        preview: preview,
      };
    });

    // Set file value to form
    for (let index = 0; index < convertedFiles.length; index++) {
      const currentFormatFile = convertedFiles[index];
      if (currentFormatFile && currentFormatFile.id) {
        setValue('files', [currentFormatFile]);
        setValue('contentType', currentFormatFile.contentType.field as string);
      }
    }
  };

  const onFileRemove = (item: FileType) => {
    const files = getValues('files').filter((el) => el.id !== item.id);
    setValue('files', files);
    setFileErrorMsg('');
  };

  const onHandleUploadFilesError = (
    result: boolean,
    fileRejections: Array<{
      file: any;
      errors: Array<{ code: string; message: string }>;
    }>
  ) => {
    if (result) {
      fileRejections.forEach((fileRejection) => {
        const { file, errors } = fileRejection;

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
              title: t('create-watermarking.attack-file.unsupported'),
              closeTitle: t('create-watermarking.attack-file.try-again'),
            },
          });
          return;
        }

        if (tooManyFilesError) {
          openDialog({
            name: DialogType.CommonError,
            props: {
              title: t('create-watermarking.attack-file.oneFileAllowed'),
              closeTitle: t('create-watermarking.attack-file.try-again'),
            },
          });
          return;
        }
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <StepTitle
        step={1}
        title={t('create-watermarking.attack-file.title')}
        isActive={isUploaded}
      />
      <FileUploadContainer>
        {isUploaded ? (
          <MediaPreview
            file={{
              contentType: filesUploaded[0].contentType.field as string,
              preview: filesUploaded[0].preview,
              fileName: filesUploaded[0].psnInfoFileNm,
              fileSize: filesUploaded[0].size.field,
            }}
            onRemoveFile={() => onFileRemove(filesUploaded[0])}
            errorMsg={fileErrorMsg}
          />
        ) : (
          <StyledFileUpload
            onFilesAdded={onFilesAdded}
            accept={config.accept}
            multiple={false}
            onHandleError={onHandleUploadFilesError}
            dropFileText={'create-watermarking.attack-file.drop-file-text'}
            browseFileText={'create-watermarking.attack-file.browse-file-text'}
          />
        )}
      </FileUploadContainer>
      <SupportedInfo />
    </Box>
  );
};

export default FileLocationView;
