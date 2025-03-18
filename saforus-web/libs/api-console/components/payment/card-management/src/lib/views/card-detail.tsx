import { Box, Typography, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardLogo from '@web-workspace/api-console/components/payment/card-logo';
import { CardContainer } from './styled-elements';
import { CardInfo } from '@web-workspace/api-console/common/model';

const CardDetail = ({
  card,
  onMenuClick,
}: {
  card: CardInfo;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, card: CardInfo) => void;
}) => {
  const { t } = useTranslation();

  return (
    <CardContainer>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: '12px', flexGrow: 1 }}
      >
        <CardLogo cardNumber={card.cardNumber} height="60px" />
        <Box display="flex" flexDirection="column" gap="4px">
          {card.isDefault && (
            <Typography
              variant="caption"
              fontWeight={500}
              sx={{
                padding: '2px 8px',
                color: 'var(--purple-600)',
                background: 'var(--purple-50)',
                borderRadius: '5px',
                width: 'fit-content',
              }}
            >
              {t('apiPaymentManagement.default')}
            </Typography>
          )}
          <Typography
            variant="subtitle2"
            color="var(--gray-700)"
            fontWeight="500"
          >
            {card.cardNumber}
          </Typography>
        </Box>
      </Box>
      <IconButton
        onClick={(event) => onMenuClick(event, card)}
        sx={{
          borderRadius: '5px',
          border: '1px solid var(--neutral-750)',
          padding: '6px',
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </CardContainer>
  );
};

export default CardDetail;
