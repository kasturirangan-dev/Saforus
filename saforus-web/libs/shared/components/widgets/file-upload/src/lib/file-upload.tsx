import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import AddIcon from './assets/add.svg';
import { Trans, useTranslation } from 'react-i18next';

interface FileUploadProps {
  onFilesAdded: (acceptedFiles: File[]) => void;
  accept?: Accept;
  multiple?: boolean;
  maxSize?: number;
  onHandleError?: (
    result: boolean,
    fileRejections?: FileRejection[]
  ) => void | null | undefined;
  dropFileText?: string;
  browseFileText?: string;
  browserFileStyle?: React.CSSProperties;
  recommendFileText?: string;
  smallView?: boolean;
  style?: React.CSSProperties;
  className?: string;
  uploadIcon?: JSX.Element;
  isGuest?: boolean;
  handleGuestRequest?: (e?: React.MouseEvent) => void;
}

const BoxContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid var(--purple-600);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover,
  &.highlight {
    background-color: var(--purple-100);
    border-color: var(--purple-400);
  }
`;

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesAdded,
  accept,
  multiple,
  maxSize,
  onHandleError,
  dropFileText = 'common.file-upload.drop-file',
  browseFileText = 'common.file-upload.browse-file',
  browserFileStyle,
  recommendFileText,
  smallView,
  style,
  className = '',
  uploadIcon,
  isGuest,
  handleGuestRequest,
}) => {
  const { t } = useTranslation();
  const [highlight, setHighlight] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
  }, [accept, multiple, onHandleError]);

  const handleClick = (event?: React.MouseEvent) => {
    if (isGuest && handleGuestRequest) {
      handleGuestRequest(event);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      if (isGuest && handleGuestRequest) {
        handleGuestRequest();
      } else {
        onFilesAdded(files);
      }
    },
    onDragEnter: () => setHighlight(true),
    onDragLeave: () => setHighlight(false),
    onDropAccepted: () => {
      setErrorMessage('');
      onHandleError && onHandleError(false);
      setHighlight(false);
    },
    onDropRejected: (fileRejections: FileRejection[]) => {
      if (onHandleError) {
        onHandleError(true, fileRejections);
      } else {
        setErrorMessage(`${t('common.file-upload.error')}`);
      }
    },
    accept: accept,
    multiple: multiple,
    maxSize: maxSize,
  });

  const activeClassName = isDragActive ? 'drag-active' : '';
  const highlightClassName = highlight ? 'highlight' : '';

  return (
    <BoxContainer
      {...getRootProps({ onClick: handleClick })}
      className={`${className} file-upload ${activeClassName} ${highlightClassName}`.trim()}
      style={{
        ...style,
      }}
    >
      <input {...getInputProps()} />
      {uploadIcon || (
        <img
          src={AddIcon}
          alt="Add Storage"
          title="Add Storage"
          width={40}
          height={40}
          loading="lazy"
        />
      )}
      {!smallView && (
        <Typography variant="subtitle2" gutterBottom sx={{ marginTop: '1rem' }}>
          {t(dropFileText)}
        </Typography>
      )}
      {!smallView && (
        <Box>
          <Typography
            gutterBottom={recommendFileText ? false : true}
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: 14,
              whiteSpace: 'pre-wrap',
            }}
            color={'var(--gray-50)'}
          >
            <Trans
              i18nKey={browseFileText}
              components={[
                <Box
                  sx={{ color: 'var(--purple-600)', ...browserFileStyle }}
                ></Box>,
              ]}
            ></Trans>
          </Typography>
          {recommendFileText && (
            <Typography
              component="div"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                fontSize: 14,
              }}
            >
              {recommendFileText}
            </Typography>
          )}
        </Box>
      )}
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
    </BoxContainer>
  );
};

export default React.memo(FileUpload);
