import { Box, Typography, styled } from '@mui/material';

export const StepTitle = ({
  step,
  title,
  isActive,
}: {
  step: number;
  title: string;
  isActive: boolean;
}) => {
  return (
    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: isActive ? 'none' : '1px solid var(--neutral-700)',
          backgroundColor: isActive ? 'var(--green-600)' : 'var(--primary-500)',
          color: isActive ? 'var(--base-white)' : 'var(--gray-25)',
        }}
      >
        <Typography variant="body2" fontFamily="Inter">
          {step}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: '18px',
          fontWeight: 700,
          lineHeight: '24px',
          color: 'var(--gray-700)',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export const CardTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',

  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '24px',
  letterSpacing: '0.1px',
  color: 'var(--gray-100)',
}));
