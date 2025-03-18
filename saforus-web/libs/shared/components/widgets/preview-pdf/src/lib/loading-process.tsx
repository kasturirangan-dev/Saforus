import { Box, CircularProgress, styled } from '@mui/material';

const LoadingProcess = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const LoadingProcessLayer = ({ progress }: { progress: number }) => {
  return (
    <LoadingProcess>
      <CircularProgress variant="determinate" value={progress} />
    </LoadingProcess>
  );
};
