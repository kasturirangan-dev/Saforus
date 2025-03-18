import LoadingDialog from './view/loading';
import SuccessDialog from './view/subscription-success';
import FailDialog from './view/subscription-fail';
import Dialog from '@web-workspace/shared/components/widgets/dialog';

export interface SubscriptionResultProps {
  status: 'loading' | 'success' | 'failed';
  subscriptionType?: 'subscribe' | 'upgrade';
  code?: string;
  onClose: () => void;
  onSuccess: () => void;
}

// Combine in one dialog for smooth transition
export function SubscriptionResultDialog({
  status,
  subscriptionType,
  code,
  onClose,
  onSuccess,
}: SubscriptionResultProps) {
  let content = null;
  switch (status) {
    case 'loading':
      content = <LoadingDialog onClose={onClose} />;
      break;
    case 'success':
      content = <SuccessDialog onClose={onClose} onSuccess={onSuccess} />;
      break;
    case 'failed':
      content = (
        <FailDialog type={subscriptionType} code={code} onClose={onClose} />
      );
      break;
    default:
  }

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '400px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: status === 'loading' ? '16px' : '5px',
          textAlign: 'center',
        },
      }}
      dialogContent={content}
      contentCss={{ padding: '0' }}
    />
  );
}

export default SubscriptionResultDialog;
