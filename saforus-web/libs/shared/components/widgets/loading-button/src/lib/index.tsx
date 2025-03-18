import { styled } from '@mui/material/styles';
import MuiLoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

const CustomLoadingButton = styled(MuiLoadingButton)(({ theme }) => ({
  borderRadius: 5,
  boxShadow: `var(--shadow-xsm)`,
  fontWeight: '600',
  fontSize: '15px',
  cursor: 'pointer',
  textTransform: 'none',
  color: 'var(--base-white)',
  '&.MuiButton-containedPrimary': {
    background: 'var(--main-brand-color3)',
    '&:hover': {
      background: 'var(--purple-400)',
    },
  },
  '&.MuiButton-containedSecondary': {
    background: 'var(--base-white)',
    border: '1px solid var(--neutral-700)', // Added border
    color: 'var(--gray-700)',
    '&:hover': {
      background: 'var(--neutral-600)',
    },
  },
  '&.MuiButton-textPrimary': {
    elevation: 0,
    marginLeft: 10,
    marginRight: 0,
    color: 'var(--purple-800)',
  },
  '&.Mui-disabled': {
    background: 'var(--neutral-800)',
    color: 'var(--base-white)',
  },
}));

interface CustomLoadingButtonProps extends LoadingButtonProps {
  color?: 'primary' | 'secondary' | 'error';
}

export default function LoadingButton({
  variant = 'contained',
  color = 'primary',
  loadingPosition = 'start',
  ...props
}: CustomLoadingButtonProps) {
  return <CustomLoadingButton variant={variant} color={color} {...props} />;
}
