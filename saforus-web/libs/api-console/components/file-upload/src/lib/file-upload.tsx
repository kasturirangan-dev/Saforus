import { Box, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { isNotEmpty, randomId } from '@web-workspace/shared/helpers/strings';
import { FileType, OrderType } from '@web-workspace/api-console/common/model';
import { PATTERN } from '@web-workspace/api-console/constants/validation';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useSnapshot } from 'valtio';
import MediaPreview from '@web-workspace/shared/components/widgets/media-preview';
import StyledFileUpload from './styled-elements';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { isGuestUser } from '@web-workspace/api-console/components/layouts/main-layout';
import { getConfig, contentTypeMap, getSupportedSize } from './utils';
import React, { useMemo } from 'react';

const FileUploadContainer = styled(Box)(({ theme }) => ({
  padding: '1.5rem',
  background: 'var(--base-white)',
  borderRadius: '16px',
}));

export interface FileLocationViewProps {
  file: FileType;
  setFile: (file: FileType | null) => void;
  dropFileText?: string;
  browseFileText?: string;
  serviceType?: OrderType;
}

const FileUpload = ({
  file,
  setFile,
  dropFileText,
  browseFileText,
  serviceType,
}: FileLocationViewProps) => {
  const { t } = useTranslation();
  const { userInfo } = useSnapshot(CsApiAuthStore);

  const config = useMemo(() => getConfig(['IMG', 'DOCUMENT']), []);
  const maxFileSize = useMemo(() => {
    return getSupportedSize(
      userInfo?.subscription?.plan?.planType,
      serviceType
    );
  }, [userInfo?.subscription?.plan?.planType, serviceType]);

  const { openDialog } = useSnapshot(DialogStore);

  const onFilesAdded = (acceptedFiles: File[]) => {
    // const maxFileNameLength = 250;
    const convertedFiles = acceptedFiles.map((file) => {
      const ext = file.name.match(/[^.]+$/)?.[0] || '';
      const fileType = file.type.split('/')[0];
      const fileFormat = file.type?.split('/').pop() || '';
      const fileName = file.name.replace(/\.[^.]+$/, '') || '';

      const supportedFileFormat = fileFormat
        ? config.supportedFormats.includes(fileFormat.toUpperCase())
        : config.supportedExts.includes(ext.toUpperCase());

      if (!supportedFileFormat) {
        showToast.error(t('api-file-supported.invalid-file'));
        return;
      }

      const supportedFileName = PATTERN.REQUEST_FILE_NAME.test(fileName);
      if (!supportedFileName) {
        showToast.error(t('api-file-supported.invalid-name'));
        return;
      }

      const id = randomId();
      const preview = URL.createObjectURL(file);
      const contentType = contentTypeMap[fileType] || 'IMG';
      const supported = supportedFileFormat && supportedFileName;

      return {
        id: id,
        fileName: file.name,
        contentType: contentType,
        format: fileFormat ?? ext,
        fileSize: file.size,
        supported: supported,
        file: file,
        preview: preview,
      } as FileType;
    });

    // Set file value to form
    if (convertedFiles.length > 0 && convertedFiles[0]) {
      setFile(convertedFiles[0]);
    }
  };

  const onFileRemove = () => {
    setFile(null);
  };

  const onHandleUploadFilesError = (
    result: boolean,
    fileRejections: Array<{
      file: any;
      errors: Array<{ code: string; message: string }>;
    }>
  ) => {
    if (result) {
      const { file, errors } = fileRejections[0];
      const tooManyFilesError = errors.find(
        (error) => error.code === 'too-many-files'
      );

      if (tooManyFilesError) {
        openDialog({
          name: DialogType.CommonError,
          props: {
            title: t('create-watermarking.attack-file.oneFileAllowed'),
            closeTitle: t('create-watermarking.attack-file.try-again'),
          },
        });
      } else {
        showToast.error(t('api-file-supported.invalid-file'));
      }
    }
  };

  const handleGuestRequest = (event?: React.MouseEvent) => {
    event?.preventDefault(); // Prevent default file input behavior
    event?.stopPropagation(); // Stop event from bubbling
    openDialog({
      name: DialogType.GuestRedirect,
    });
  };

  return (
    <FileUploadContainer>
      {file ? (
        <MediaPreview file={file} onRemoveFile={onFileRemove} />
      ) : (
        <StyledFileUpload
          onFilesAdded={onFilesAdded}
          accept={config.accept}
          multiple={false}
          onHandleError={onHandleUploadFilesError}
          dropFileText={dropFileText}
          browseFileText={browseFileText}
          isGuest={isGuestUser()}
          handleGuestRequest={handleGuestRequest}
          maxSize={maxFileSize}
        />
      )}
    </FileUploadContainer>
  );
};

export default FileUpload;
