import { Box, Menu, Typography, styled } from '@mui/material';

export const CardContainer = styled(Box)(({ theme }) => ({
  padding: '16px',
  backgroundColor: 'var(--base-white)',
  borderRadius: '8px',
  border: '1px solid var(--neutral-300)',

  display: 'flex',
  alignItems: 'center',
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: '4px',
    border: '1px solid var(--neutral-750)',
    boxShadow: 'var(--shadow-lg)',
    borderRadius: '5px',
  },
  '& .MuiList-root': {
    padding: '4px 0px',
  },
  '& .MuiMenuItem-root': {
    justifyContent: 'space-between',
    gap: '8px',

    height: '40px',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '-0.1px',
  },
}));
