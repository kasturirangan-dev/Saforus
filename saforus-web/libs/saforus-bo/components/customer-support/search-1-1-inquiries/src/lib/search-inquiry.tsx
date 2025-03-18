import { Box, Typography } from '@mui/material';
import InquirySearch from './views/inquiry-search';
import { useTranslation } from 'react-i18next';
import InquiryListView from './views/inquiry-list-view';

export function SearchInquiry({ isLoading }: { isLoading: boolean }) {
  const { t } = useTranslation();
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" sx={{ mb: '1.5rem' }} color={'var(--gray-900)'}>
        {t('boInquiry.search.pageTitle')}
      </Typography>

      {!isLoading && <InquirySearch />}
      <InquiryListView />
    </Box>
  );
}

export default SearchInquiry;
