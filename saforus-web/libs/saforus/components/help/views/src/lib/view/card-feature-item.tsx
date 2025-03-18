import { Box, Card, Typography } from '@mui/material';
import Button from '@web-workspace/shared/components/widgets/button';
import React from 'react';

interface CardFeatureItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClickButton?: () => void;
  buttonTitle?: string;
}

const CardFeatureItem = ({
  title,
  description,
  icon,
  onClickButton,
  buttonTitle,
}: CardFeatureItemProps) => {
  return (
    <Card
      sx={{
        minWidth: '386px',
        width: '25vw',
        background: 'var(--base-white)',
        padding: '1.5rem 2rem',
        borderRadius: '5px',
        boxShadow:
          '0px 4px 6px -1px rgba(16, 24, 40, 0.03), 0px 2px 4px -2px rgba(16, 24, 40, 0.05)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '220px',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'left',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: '100%',
            justifyContent: 'flex-start',
            textAlign: 'left',
          }}
        >
          {icon}
          <Typography
            variant="h6"
            fontWeight={600}
            color={'var(--gray-700)'}
            sx={{ marginTop: '1rem' }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            color={'var(--gray-25)'}
            sx={{ marginTop: '0.5rem' }}
          >
            {description}
          </Typography>
        </Box>
        <Box>
          <Button
            sx={{ padding: '10px 18px 12px 18px' }}
            onClick={onClickButton}
          >
            {buttonTitle}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default React.memo(CardFeatureItem);
