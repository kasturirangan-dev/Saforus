import { Box, Card, SxProps, Theme, Typography } from '@mui/material';
import Button from '@web-workspace/shared/components/widgets/button';
import React from 'react';
import { pxToVw } from '@web-workspace/saforus/common/utils';
import Icon from '@web-workspace/shared/components/widgets/icon';

interface CardFeatureItemProps {
  sx?: SxProps<Theme>;
  title: string;
  description: string;
  icon?: React.ReactNode | string;
  onClickButton?: () => void;
  buttonTitle?: string;
}

const CardFeatureItem = ({
  sx,
  title,
  description,
  icon,
  onClickButton,
  buttonTitle,
}: CardFeatureItemProps) => {
  return (
    <Card
      sx={{
        background: 'var(--base-white)',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: 'var(--shadow-xsm)',
        border: '1px solid var(--neutral-600, #EAEBF0)',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '230px',
        ...sx,
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          {typeof icon === 'string' ? (
            <Box
              sx={{
                display: 'inline-flex',
                padding: '8px',
                borderRadius: '30px',
                backgroundColor: 'var(--neutral-100)',
              }}
            >
              <img
                src={icon}
                alt={title}
                width="32px"
                height="32px"
                loading="lazy"
              />
            </Box>
          ) : (
            icon
          )}
          <Typography
            fontSize="20px"
            fontWeight={500}
            lineHeight="28px"
            letterSpacing="-0.02em"
            color={'var(--gray-700)'}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ marginTop: pxToVw('1rem') }}>
          <Typography variant="subtitle2" color={'var(--gray-25)'}>
            {description}
          </Typography>
        </Box>
      </Box>

      <Button
        color="secondary"
        sx={{
          marginLeft: 'auto',
          padding: '12px 18px',
          borderRadius: '6px',
          fontSize: '15px',
          gap: '6px',
        }}
        onClick={onClickButton}
      >
        {buttonTitle}
        <Icon name="arrow_right" size={20} color="var(--gray-700)" />
      </Button>
    </Card>
  );
};

export default React.memo(CardFeatureItem);
