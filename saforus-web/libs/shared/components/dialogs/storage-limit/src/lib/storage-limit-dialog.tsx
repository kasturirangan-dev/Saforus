import DialogView from './view';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';

export interface StorageLimitDialogProps {
  onClose: () => void;
}

export function StorageLimitDialog({ onClose }: StorageLimitDialogProps) {
  const handleFreeUpSpace = () => {
    window.location.href = API_ROUTES.VIEW_ORDERS.ROOT;
  };

  const handleUpgrade = () => {
    window.location.href = API_ROUTES.USER_INFO.CURRENT_PLAN.path;
  };

  return (
    <DialogView
      onClose={onClose}
      onFreeUpSpace={handleFreeUpSpace}
      onUpgrade={handleUpgrade}
    />
  );
}

export default StorageLimitDialog;
