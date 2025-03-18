import { Box, ButtonBase, Typography, styled } from '@mui/material';
import removeFile from '../assets/remove-file.svg';
import {
  formatBytes,
  getValidFormat,
} from '@web-workspace/shared/helpers/format';
import MediaContent from './media-content';
import ContentLabel from '@web-workspace/shared/components/widgets/content-label';
import { useTranslation } from 'react-i18next';
import { MediaPreviewProps } from './interface';

const MediaButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',

  minWidth: '100px',
  position: 'relative',
  height: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid var(--neutral-500)',
}));

const RemoveButton = styled(ButtonBase)(({ theme }) => ({
  position: 'absolute',
  right: 12,
  top: 12,
}));

const formatToContentType: { [key: string]: string } = {
  // Image formats
  jpeg: 'IMG',
  jpg: 'IMG',
  png: 'IMG',
  tiff: 'IMG',
  bmp: 'IMG',
  // Video format
  mp4: 'VIDEO',
  // Audio formats
  mp3: 'AUDIO',
  mpeg: 'AUDIO',
  wav: 'AUDIO',
  'x-wav': 'AUDIO',
  // Document format
  pdf: 'DOCUMENT',
};

const MediaPreview = ({
  file,
  onRemoveFile,
  errorMsg,
  height,
  fullWidth = false,
  control = true,
  maxPdfPage,
}: MediaPreviewProps) => {
  const { t } = useTranslation();

  const formatSize =
    typeof file.fileSize === 'number'
      ? formatBytes(file.fileSize)
      : file.fileSize;
  const fileFormat = getValidFormat(file.fileName?.split('.').pop());

  // Assign contentType based on the file extension if not already set
  if (!file.contentType) {
    file.contentType = formatToContentType[fileFormat?.toLowerCase() || ''];
  }

  return (
    <Box
      sx={{
        display: 'table',
        margin: 'auto',
        width: fullWidth ? '100%' : 'auto',
      }}
    >
      <MediaButton>
        <MediaContent
          file={file}
          control={control}
          height={height || '300px'}
          width={fullWidth ? '100%' : 'auto'}
          maxPdfPage={maxPdfPage}
        />

        {onRemoveFile && (
          <RemoveButton className="Button-icon">
            <img
              src={removeFile}
              onClick={onRemoveFile}
              alt="removeFile"
              width={28}
              height={28}
              loading="lazy"
            />
          </RemoveButton>
        )}
      </MediaButton>
      <Box
        sx={{
          display: 'table-caption',
          captionSide: 'bottom',
          marginTop: '4px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <Typography
            variant="body2"
            color="var(--gray-700)"
            sx={{ wordBreak: 'break-all' }}
          >
            {file.fileName}
          </Typography>
          <Box display="flex" gap="4px">
            <ContentLabel
              neutral
              variant="caption"
              label={fileFormat || ''}
              style={{
                padding: '2px 8px',
              }}
            />
            {formatSize && (
              <ContentLabel
                neutral
                variant="caption"
                label={`${formatSize}`}
                style={{
                  padding: '2px 8px',
                }}
              />
            )}
          </Box>
          {errorMsg && (
            <Typography variant="body2" color="var(--red-500)">
              {t(errorMsg)}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default MediaPreview;
