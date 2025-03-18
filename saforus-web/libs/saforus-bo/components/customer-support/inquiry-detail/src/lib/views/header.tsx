import { Box, Typography } from '@mui/material';
import ArrowLeft from '../assets/arrow-left.svg';
import { Inquiry } from '@web-workspace/saforus-bo/components/customer-support/data';
import { useTranslation } from 'react-i18next';
import { StatusChips } from './status-chips';

interface Props {
  quesInquiry: Inquiry;
  ansInquiry: Inquiry;
  isBackArrow: boolean;
}

export function Header({ quesInquiry, ansInquiry, isBackArrow }: Props) {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        {isBackArrow && (
          <img
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              window.history.back();
            }}
            src={ArrowLeft}
            alt="arrow-left"
          />
        )}
        <Typography
          sx={{
            fontSize: '24px',
            fontWeight: '700',
            lineHeight: '32px',
            color: 'var(--gray-700)',
          }}
        >
          {quesInquiry.title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          mt: '1rem',
        }}
      >
        <Typography
          sx={{
            padding: '2px 8px',
            borderRadius: '5px',
            background: 'var(--neutral-300)',
          }}
        >
          {t(
            `boInquiry.detail.category-list.${quesInquiry?.qaCategory?.toLocaleLowerCase()}`
          )}
        </Typography>
        <StatusChips
          status={ansInquiry?.isPublished ? quesInquiry?.status : 'in_queue'}
        />
      </Box>
    </>
  );
}
