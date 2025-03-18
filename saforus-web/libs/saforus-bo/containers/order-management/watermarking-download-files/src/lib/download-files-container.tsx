import { Box, Container, styled, Typography } from '@mui/material';
import DownloadFile, {
  DownloadFileStore,
} from '@web-workspace/saforus-bo/components/order-management/watermarking-orders/download-files';
import Icon from '@web-workspace/shared/components/widgets/icon';
import MuiButton from '@mui/material/Button';
import { useSnapshot } from 'valtio';
import { useSearchParams } from 'react-router-dom';

const StyledButton = styled(MuiButton)(({ theme }) => ({
  padding: 0,
  fontSize: 30,
  fontWeight: '600',
  lineHeight: '30px',
  textTransform: 'none',
  color: '#EFEFF1',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export function DownloadFilesContainer() {
  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);
  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledButton
            onClick={() => {
              window.history.back();
            }}
            variant={'text'}
          >
            <Icon
              iconStyle={{ marginRight: '6px' }}
              name="arrow_left"
              size={45}
              color="#5F6D7E"
            />
          </StyledButton>
          <Typography variant="h4">{paramsAsObject.fileName}</Typography>
        </Box>
      </Box>
      <DownloadFile />
    </Container>
  );
}

export default DownloadFilesContainer;
