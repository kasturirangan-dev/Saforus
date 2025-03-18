import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { useTranslation } from 'react-i18next';

export function NotificationSearchBar() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        width: '25vw',
        height: '56px',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '100px',
        border: '1px solid var(--neutral-700, #DAE0E6)',
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.04)',
        padding: '0.5rem 0.5rem 0.5rem 1rem',
      }}
    >
      <SearchIcon sx={{ width: '35px', color: 'var(--gray-25)' }} />
      <InputBase
        sx={{
          ml: 1, flex: 1, fontSize: '14px', '& input:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 1000px white inset', // Fix for Chrome autofill background blue color
          }, }}
        placeholder={`${t(
          'serviceManagement.notification-list.search-placeholder'
        )}`}
        inputProps={{ 'aria-label': 'Order No' }}
        // {...field}
      />
      <LoadingButton
        // loading={loading}
        type="button"
        // onClick={() => {
        //   onSubmit();
        // }}
        sx={{
          my: '2.3rem',
          py: '0.5rem',
          ml: '-1rem',
          borderRadius: '100px',
        }}
      >
        {t('button.search')}
      </LoadingButton>
    </Box>
  );
}

export default NotificationSearchBar;
