import { Backdrop, CircularProgress } from '@mui/material';

function DownloadLoader({ open }: { open: boolean }) {
  return (
    <Backdrop
      sx={{
        color: 'var(--base-white)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default DownloadLoader;
