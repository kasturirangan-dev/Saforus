import { Box, Typography, styled } from '@mui/material';
import { pxToVw } from '@web-workspace/saforus/common/utils';

const Translucent = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  height: '100%',
  position: 'absolute',
  backdropFilter: 'blur(4px)',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const TranslucentText = styled(Typography)(({ theme }) => ({
  color: 'var(--gray-50)',
  fontSize: pxToVw(16),
  lineHeight: pxToVw(24),
  fontWeight: 600,
  textAlign: 'center',
}));
type TranslucentWrapperProps = {
  children: React.ReactNode;
  isDisabled: boolean;
  title: string;
};

const TranslucentWrapper: React.FC<TranslucentWrapperProps> = ({
  isDisabled,
  children,
  title,
}) => {
  return isDisabled ? (
    <Box position="relative" width="100%" height="100%">
      <Translucent>
        <TranslucentText>{title}</TranslucentText>
      </Translucent>
      {children}
    </Box>
  ) : (
    <Box>{children}</Box>
  );
};

export default TranslucentWrapper;
