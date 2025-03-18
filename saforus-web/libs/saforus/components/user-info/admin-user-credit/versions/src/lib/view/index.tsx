import {
  Box,
  Card,
  Container,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { memo, Suspense } from 'react';
import CardVersionItem from './card-version-item';
import IconInfo from '../assets/ico_window_info.svg';
import IconMsg from '../assets/ico_msg_circle_info.svg';
import useVersionData from '../data';

function VersionView() {
  const { data, loading } = useVersionData();

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Loading...
        </Box>
      }
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1.5rem',
          mt: '1.5rem',
          background: 'var(--base-white)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
        }}
      >
        <Backdrop
          open={loading}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            color: 'var(--main-brand)',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <CardVersionItem
          sx={{ flex: 1 }}
          icon={
            <img
              src={IconInfo}
              alt="web-version"
              width={48}
              height={48}
              loading="lazy"
            />
          }
          title={'SaForus Web'}
          items={data?.apps ?? []}
        />
        <CardVersionItem
          sx={{ flex: 1 }}
          icon={
            <img
              src={IconMsg}
              alt="module-version"
              width={48}
              height={48}
              loading="lazy"
            />
          }
          title={'Watermarking & Detection'}
          items={data?.modules ?? []}
        />
      </Card>
    </Suspense>
  );
}

export default memo(VersionView);
