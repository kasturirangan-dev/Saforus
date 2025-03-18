import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CardList from './views/card-list';
import { usePaymentCardsData } from './data/data';

const CardManagement = () => {
  const { t } = useTranslation();
  const { cards, loading, addCard, markDefaultCard, deleteCard } =
    usePaymentCardsData();

  return (
    <Box>
      <Typography variant="body2" fontWeight={600} mb={1}>
        {t('apiPaymentManagement.paymentMethod')}
      </Typography>

      <CardList
        cards={cards}
        loading={loading}
        onAddCard={addCard}
        markDefaultCard={markDefaultCard}
        deleteCard={deleteCard}
      />
    </Box>
  );
};

export default CardManagement;
