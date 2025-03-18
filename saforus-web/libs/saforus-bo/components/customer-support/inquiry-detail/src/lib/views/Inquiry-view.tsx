import { Box, Typography } from '@mui/material';
import Download from '../assets/download.svg';
import Avatar from '../assets/avatar.svg';
import {
  Inquiry,
  onDownloadFile,
} from '@web-workspace/saforus-bo/components/customer-support/data';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import i18next from 'i18next';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';

export function InquiryView({ quesInquiry }: { quesInquiry: Inquiry }) {
  return (
    <Box
      sx={{
        background: 'var(--base-white)',
        border: '1px solid var(--neutral-700)',
        padding: '24px',
        mr: '24px',
        mt: '1rem',
        borderRadius: '8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          mb: '1rem',
        }}
      >
        <img src={quesInquiry?.avatar ?? Avatar} width={'40'} alt="avatar" />
        <Typography>
          {quesInquiry?.fullName} ({quesInquiry?.email})
        </Typography>
      </Box>
      <Typography sx={{ wordBreak: 'break-all' }}>
        {quesInquiry?.content}
      </Typography>
      {quesInquiry?.attachedFileList?.map((attachment) => (
        <Box
          sx={{
            mt: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            border: '1px solid var(--neutral-600)',
            padding: '1rem',
            borderRadius: '8px',
          }}
        >
          <img
            style={{
              borderRadius: '8px',
              border: '1px solid var(--neutral-700)',
              cursor: 'pointer',
            }}
            src={Download}
            alt="download"
            onClick={async () => {
              try {
                await onDownloadFile(attachment?.id, attachment?.fileName);
              } catch (error: any) {
                const errorMessage = await error?.response.data.text();
                showToast.error(JSON.parse(errorMessage).resultMsg);
              }
            }}
          />
          <Box>
            <Typography
              sx={{
                fontWeight: '500',
              }}
            >
              {attachment.fileName}
            </Typography>
            <Typography
              sx={{
                color: 'var(--gray-50)',
              }}
            >
              {(attachment.fileSize / 1024 / 1024).toFixed(2)} MB
            </Typography>
          </Box>
        </Box>
      ))}
      <Typography
        sx={{
          color: 'var(--gray-25)',
          mt: '1rem',
        }}
      >
        {formatDateWithLanguage({
          date: quesInquiry?.createdAt,
          language: i18next.language,
          withSlash: true,
          isDetail: true,
        })}
      </Typography>
    </Box>
  );
}
