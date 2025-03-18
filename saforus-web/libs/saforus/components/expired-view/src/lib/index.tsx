import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { ExpiredView } from './views/expired';
import { NoActiveView } from './views/no-active';
import { useSnapshot } from 'valtio';
import UseSubscription, {
  SubscriptionStatus,
} from '@web-workspace/shared/hooks/use-subscription';

export interface SaforusExpiredViewProps {
  children: React.ReactElement<any, any>;
}

export function SaforusExpiredView({ children }: SaforusExpiredViewProps) {
  const { status, setStatus } = useSnapshot(UseSubscription);
  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);

  if (['expired', 'no-active', 'active'].includes(paramsAsObject?.status)) {
    setStatus(paramsAsObject?.status as SubscriptionStatus);
  }
  return status !== SubscriptionStatus.ACTIVE ? (
    <Box sx={{ position: 'relative', overflow: 'hidden', height: '85vh' }}>
      {children}
      <Box 
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.50)',
          backdropFilter: 'blur(17.5px)',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ display: 'flex', textAlign: 'center' }}>
          {status === SubscriptionStatus.EXPIRED ? (
            <ExpiredView />
          ) : (
            <NoActiveView />
          )}
        </Box>
      </Box>
    </Box>
  ) : (
    children
  );
}

export default SaforusExpiredView;
