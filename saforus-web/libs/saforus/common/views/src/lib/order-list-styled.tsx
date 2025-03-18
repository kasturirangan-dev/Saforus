import { Box, Typography, styled } from '@mui/material';
import Table from '@web-workspace/shared/components/widgets/table';
import ImagePreview, {
  isTiffFile,
} from '@web-workspace/shared/components/widgets/image-preview';
import ContentLabel from '@web-workspace/shared/components/widgets/content-label';
import { MEDIA_TYPE } from '@web-workspace/saforus/common/model';

export const StyledDataGrid = styled(Table)({
  backgroundColor: 'var(--base-white)',
  borderColor: 'var(--neutral-400)',
  borderRadius: '8px',
  overflow: 'hidden',

  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'var(--neutral-400)',
  },
  '& .MuiDataGrid-row': {
    '&:hover': {
      backgroundColor: 'var(--neutral-200)',
    },
    borderBottom: '1px solid var(--neutral-600)',
  },
  '& .MuiDataGrid-footerContainer': {
    display: 'flex',
    backgroundColor: 'var(--neutral-400)',
    border: 'none',
  },

  '& .MuiDataGrid-columnHeaderTitle': {
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: '22px',
    letterSpacing: '-0.1px',
    color: 'var(--gray-700)',
  },
  '& .MuiDataGrid-cell:focus-within': {
    outline: 'none',
  },
  '.MuiDataGrid-overlay': {
    justifyContent: 'center',
    color: 'var(--gray-25)',
  },
});

export const TableContent = styled(Typography)(({ theme }) => ({
  color: 'var(--gray-700)',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}));

export const TableOrderFile = ({ props }: any) => {
  const { thumbnailUrl, fileName, contentType, format } = props;
  const isTiff = isTiffFile(fileName);
  let formatValue = format?.toUpperCase();
  if (format?.startsWith('.')) {
    formatValue = format?.slice(1).toUpperCase();
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 0px',
        overflow: 'hidden',
      }}
    >
      <ImagePreview
        src={contentType === MEDIA_TYPE.AUDIO ? '' : thumbnailUrl} // Display default thumbnail for audio files
        alt={fileName}
        containerStyle={{
          height: '60px',
          width: '60px',
          flexShrink: 0,
          backgroundColor: 'var(--neutral-600)',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid var(--neutral-500)',
        }}
        style={{ objectFit: 'cover' }}
        mediaType={contentType}
        isTiff={isTiff}
        thumbnailStyle="icon"
        iconStyle={{
          width: '24px',
          height: '24px',
        }}
      />

      <Box
        display="flex"
        flexDirection="column"
        gap="4px"
        width="calc(100% - 68px)"
      >
        <TableContent>{fileName || '--'}</TableContent>
        {formatValue && (
          <ContentLabel
            neutral
            variant="caption"
            label={formatValue}
            style={{
              padding: '2px 8px',
              width: 'fit-content',
            }}
          />
        )}
      </Box>
    </Box>
  );
};
