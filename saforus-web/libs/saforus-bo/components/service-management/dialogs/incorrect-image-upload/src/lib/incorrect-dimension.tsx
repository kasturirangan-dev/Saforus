import React from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@web-workspace/shared/components/widgets/button';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import Photo from './assets/photo.svg';
import { useTranslation } from 'react-i18next';

type IncorrectDimensionViewProps = {
  title?: string;
  description?: string;
  onClose: () => void;
};

const IncorrectDimensionView: React.FC<IncorrectDimensionViewProps> = ({
  title,
  description,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      PaperProps={{
        style: { boxShadow: 'var(--shadow-2xl)', borderRadius: '5px' },
      }}
      contentCss={{ margin: 'auto' }}
      icon={
        <img
          src={Photo}
          alt="Warning"
          title="Warning"
          width="32"
          height="32"
          loading="lazy"
        />
      }
      iconCss={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
      onClose={onClose}
      footer={
        <Button
          fullWidth
          onClick={() => {
            onClose();
          }}
          sx={{
            padding: ' 12px 18px',
          }}
        >
          {'OK'}
        </Button>
      }
      dialogContent={
        <Box
          sx={{
            width: 350,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '28px',
              letterSpacing: '-0.4px',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{ textAlign: 'center' }}
            variant="subtitle2"
            color={'var(--gray-50)'}
          >
            {description}
          </Typography>
        </Box>
      }
      dialogCss={{
        width: '100%',
        height: 'auto',
        margin: 'auto',
        justifyContent: 'center',
      }}
    />
  );
};

export default React.memo(IncorrectDimensionView);
