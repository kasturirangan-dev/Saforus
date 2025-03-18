import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ContentLabel from '@web-workspace/shared/components/widgets/content-label';
import { MEDIA_TYPE } from '@web-workspace/saforus/common/model';
import { Link } from 'react-router-dom';
import { FileList } from '@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/data';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';

const StyledTitle = styled(Box)(({ theme }) => ({
  background: '#EAEBF0',
  border: '1px solid var(--neutral-750)',
  padding: '1rem',
  width: '12.5rem',
  borderRight: 'none',
  borderBottom: 'none',
}));

const StyledContentTitle = styled(Box)(({ theme }) => ({
  background: 'var(--base-white)',
  border: '1px solid var(--neutral-750)',
  padding: '1rem',
  flexGrow: '1',
  borderBottom: 'none',
}));

interface DetailInformationProps {
  status?: string;
  contentType?: string;
  fileType?: string;
  watermarkCode?: FileList[];
  orderNo?: string;
}

const DetailInformation: React.FC<DetailInformationProps> = ({
  status,
  contentType,
  fileType,
  watermarkCode,
  orderNo,
}) => {
  const { t } = useTranslation();
  const formattedContentType = (contentType: string) => {
    switch (contentType) {
      case MEDIA_TYPE.IMG:
        return 'Image';
      case MEDIA_TYPE.AUDIO:
        return 'Audio';
      case MEDIA_TYPE.VIDEO:
        return 'Video';
      case MEDIA_TYPE.DOCUMENT:
        return 'Document';
      default:
        return '--';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', width: '100%' }}>
        <StyledTitle>
          {t('piracy-order-view.order-detail.content-type')}
        </StyledTitle>
        <StyledContentTitle>
          <ContentLabel
            label={formattedContentType(contentType || '')}
            style={{
              color: 'var(--gray-700)',
              backgroundColor: 'var(--neutral-300)',
              display: 'inline-block',
            }}
          />
        </StyledContentTitle>
      </Box>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <StyledTitle>
          {t('piracy-order-view.order-detail.file-format')}
        </StyledTitle>
        <StyledContentTitle>
          <ContentLabel
            label={fileType || ''}
            style={{
              color: 'var(--gray-700)',
              backgroundColor: 'var(--neutral-300)',
              display: 'inline-block',
            }}
          />
        </StyledContentTitle>
      </Box>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <StyledTitle>
          {t('piracy-order-view.order-detail.reference-order-no')}
        </StyledTitle>
        <StyledContentTitle>
          <Link
            style={{ textDecoration: 'none', color: 'var(--purple-400)' }}
            to={`${BO_ROUTES.ORDER_MANAGEMENT.WATERMARKING_ORDERS.children.WATERMARKING_DETAIL.path}/${orderNo}`}
          >
            {orderNo || ''}
          </Link>
        </StyledContentTitle>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid var(--neutral-750)',
        }}
      >
        <StyledTitle>
          {t('piracy-order-view.order-detail.watermark-code')}
        </StyledTitle>
        <StyledContentTitle
          sx={{
            display: 'flex',
          }}
        >
          {watermarkCode?.map((file, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                color: 'var(--purple-400)',
                fontWeight: 700,
              }}
            >
              {file.detectedCode || '--'}
              {index < watermarkCode.length - 1 && ', '}
            </Typography>
          ))}
        </StyledContentTitle>
      </Box>
    </Box>
  );
};

export default DetailInformation;
