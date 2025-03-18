import { Box, Typography, styled } from '@mui/material';
import DatePicker from '@web-workspace/shared/components/widgets/date-picker';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { useTranslation } from 'react-i18next';

const HeaderStyled = styled(Box)(() => ({
  fontSize: '1.375rem',
  fontWeight: 700,
  lineHeight: '30px',
}));

export function BillingDetailSearchView() {
  const { t } = useTranslation();
  return (
    <Box>
      <HeaderStyled> {t('billDetail.bill-history.title')} </HeaderStyled>
      <Box
        sx={{
          mt: '1.5em',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {t('billDetail.bill-history.date-issued')}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <DatePicker
              sx={{
                height: '100%',
              }}
            />
            <Typography
              sx={{
                pt: '0.5rem',
                px: '1rem',
              }}
            >
              ~
            </Typography>
            <DatePicker
              sx={{
                height: '100%',
              }}
            />
          </Box>
          <LoadingButton type="button">{t('button.search')}</LoadingButton>
        </Box>
      </Box>
    </Box>
  );
}

export default BillingDetailSearchView;
