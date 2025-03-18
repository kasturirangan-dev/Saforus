import { Box, CircularProgress, styled } from '@mui/material';

const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#574EFA',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent overlay
  zIndex: 2, // Ensure it's above all other content
  borderRadius: 'inherit',
}));

const LoadingOverLayer = ({
  loading,
  isTransparent,
}: {
  loading: boolean;
  isTransparent?: boolean;
}) => {
  const backgroundColor = isTransparent
    ? 'rgba(0, 0, 0, 0.25)'
    : 'rgba(255, 255, 255, 0.8)';
  const color = isTransparent ? 'var(--main-brand)' : '#574EFA';
  return loading ? (
    <LoadingOverlay sx={{ backgroundColor: backgroundColor, color: color }}>
      <CircularProgress color={'inherit'} />
    </LoadingOverlay>
  ) : null;
};

export default LoadingOverLayer;
