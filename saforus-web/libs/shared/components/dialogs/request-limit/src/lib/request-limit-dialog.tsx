import DialogView from './view';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';

export interface RequestLimitDialogProps {
  onClose: () => void;
}

export function RequestLimitDialog({ onClose }: RequestLimitDialogProps) {
  const handleUpgrade = () => {
    window.location.href = API_ROUTES.USER_INFO.CURRENT_PLAN.path;
  };

  return <DialogView onClose={onClose} onUpgrade={handleUpgrade} />;
}

export default RequestLimitDialog;
