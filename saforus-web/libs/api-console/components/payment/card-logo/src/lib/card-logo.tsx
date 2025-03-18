import { Box } from '@mui/material';
import VisaLogo from './assets/visa.png';
import MastercardLogo from './assets/mastercard.png';
import AmexLogo from './assets/amex.png';
import DiscoverLogo from './assets/discover.png';
import DinersClubLogo from './assets/diners-club.png';
import JcbLogo from './assets/jcb.png';
import UnionPayLogo from './assets/unionpay.png';

function getCardType(number: string): string {
  number = number.replace(/\D/g, ''); // Remove non-numeric characters

  const patterns: Record<string, RegExp> = {
    Visa: /^4/,
    Mastercard: /^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/,
    'American Express': /^3[47]/,
    Discover:
      /^(6011|622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[0-1]\d|92[0-5])|64[4-9]|65)/,
    'Diners Club': /^36/,
    'Diners - Carte Blanche': /^30[0-5]/,
    JCB: /^35(2[89]|[3-8]\d)/,
    'Visa Electron': /^(4026|417500|4508|4844|491[37])/,
    UnionPay: /^62/,
  };

  return (
    Object.keys(patterns).find((type) => patterns[type].test(number)) ||
    'Unknown'
  );
}

const cardLogos: Record<string, string> = {
  Visa: VisaLogo,
  Mastercard: MastercardLogo,
  'American Express': AmexLogo,
  Discover: DiscoverLogo,
  'Diners Club': DinersClubLogo,
  'Diners - Carte Blanche': DinersClubLogo,
  JCB: JcbLogo,
  'Visa Electron': VisaLogo,
  UnionPay: UnionPayLogo,
};

const CardLogo = ({
  cardNumber,
  height = 46,
}: {
  cardNumber?: string;
  height?: string | number;
}) => {
  const cardType = getCardType(cardNumber || '');
  return (
    <Box
      sx={{
        backgroundColor: 'var(--base-white)',
        borderRadius: '4px',
        border: '1px solid var(--neutral-300)',
        height,
      }}
    >
      <img
        src={cardLogos[cardType]}
        alt={cardType}
        style={{ height: '100%', width: '100%' }}
      />
    </Box>
  );
};

export default CardLogo;
