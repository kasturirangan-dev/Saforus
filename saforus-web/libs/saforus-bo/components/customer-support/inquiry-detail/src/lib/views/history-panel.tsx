import { Box, Typography } from '@mui/material';
import ChevronRight from '../assets/chevron-right.svg';
import Avatar from '../assets/avatar.svg';
import { Inquiry } from '@web-workspace/saforus-bo/components/customer-support/data';
import { useEffect, useState } from 'react';
import { fetchInquiries } from '@web-workspace/saforus-bo/components/customer-support/data';
import ROUTES from '@web-workspace/saforus-bo/constants/routes';
import { useNavigate } from 'react-router-dom';
import { StatusChips } from './status-chips';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import i18next from 'i18next';

export function HistoryPanel({
  open,
  setOpen,
  quesInquiry,
  ansInquiry,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  quesInquiry: Inquiry;
  ansInquiry: Inquiry;
}) {
  const navigate = useNavigate();
  const [inquiryHistory, setInquiryHistory] = useState<Inquiry[]>([]);

  useEffect(() => {
    if (quesInquiry) {
      fetchInquiries({
        userIds: [quesInquiry?.userId],
      })
        .then((resp) => {
          setInquiryHistory(resp?.data?.elementList ?? []);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [quesInquiry]);

  return (
    <Box
      sx={{
        background: 'var(--base-white)',
        width: '400px',
        right: open ? '0px' : '-340px',
        top: '65px',
        transition: 'right 0.3s ease-in-out',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        bottom: '0px',
        height: '100vh',
        position: 'fixed',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '40px',
          height: '40px',
          background: 'var(--base-white)',
          borderRadius: '50%',
          border: '1px solid var(--neutral-600)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          top: '50px',
          left: open ? '-20px' : '10px',
          cursor: 'pointer',
        }}
        onClick={() => setOpen(!open)}
      >
        <img src={ChevronRight} alt="chevron-right" />
      </Box>
      {open && (
        <Box
          sx={{
            overflowY: 'auto',
            height: 'calc(100vh - 100px)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img src={quesInquiry?.avatar ?? Avatar} alt="avatar" />
            <Box>
              <Typography
                sx={{
                  color: 'var(--purple-400)',
                  textDecoration: 'underline',
                  fontWeight: 600,
                }}
              >
                {quesInquiry?.fullName} ({quesInquiry?.email})
              </Typography>
              <Typography color={'var(--gray-25)'}>Standard Plan</Typography>
            </Box>
          </Box>
          <Typography mt={'1rem'} fontWeight={600}>
            Inquiry History {inquiryHistory?.length ?? 0}
          </Typography>

          {inquiryHistory?.map((inquiry, index) => (
            <Box
              sx={{
                py: '24px',
                borderBottom: '1px solid var(--neutral-600)',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate(
                  `${ROUTES.CUSTOMER_SUPPORT.SEARCH_INQUIRIES.children.INQUIRY_DETAIL.path}/${inquiry.id}`,
                  {
                    replace: true,
                  }
                );
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  mb: '8px',
                }}
              >
                <Typography>
                  <StatusChips status={inquiry.status} />
                </Typography>
                <Typography color={'var(--gray-25)'}>
                  Date of Inquiry{' '}
                  {formatDateWithLanguage({
                    date: inquiry?.createdAt,
                    language: i18next.language,
                    withSlash: true,
                    isDetail: true,
                  })}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  {inquiry.id}
                </Typography>
                <Typography>{inquiry.title}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
