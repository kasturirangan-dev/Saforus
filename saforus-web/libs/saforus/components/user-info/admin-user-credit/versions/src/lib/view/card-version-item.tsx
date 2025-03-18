import { Box, Card, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';

interface ItemRelease {
  title: string;
  version: string;
}

interface CardVersionItemProps {
  sx?: SxProps<Theme>;
  title: string;
  items: ItemRelease[];
  icon?: React.ReactNode;
}

const CardFeatureItem = ({ sx, title, items, icon }: CardVersionItemProps) => {
  return (
    <Card
      sx={{
        background: 'var(--base-white)',
        padding: '1.5rem 2rem',
        borderRadius: '5px',
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.04)',
        border: '1px solid var(--neutral-600, #EAEBF0)',
        ...sx,
      }}
    >
      <Box
        sx={{
          width: '100%',
          // height: {
          //   xs: '200px',
          //   sm: '200px',
          //   md: '200px',
          //   lg: '200px',
          //   xl: '200px',
          //   xxl: '200px',
          // },
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              justifyContent: 'flex-start',
              alignItems: 'center',
              pl: 0,
              ml: 0,
            }}
          >
            {icon}
            <Typography
              variant="subtitle1"
              fontSize={'20px'}
              fontWeight={500}
              color={'var(--gray-700, #272D37)'}
            >
              {title}
            </Typography>
          </Box>
          <Box component={'ul'} sx={{ marginTop: '1rem', pl: 0, ml: '1rem' }}>
            {items.map((item, index) => (
              <Typography
                key={index}
                component={'li'}
                variant="subtitle2"
                color={'var(--gray-25)'}
              >
                {item.title} : {item.version}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default React.memo(CardFeatureItem);
