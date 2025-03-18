import DialogCancelView from './view';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import i18next from 'i18next';

export interface DialogContactProps {
  title: string;
  description: string;
  cancelTitle: string;
  contactTitle: string;
  onClose: () => void;
}

export function DialogContact({
  title,
  description,
  cancelTitle,
  contactTitle,
  onClose,
}: DialogContactProps) {
  const linkSupport = getEnvVar(
    i18next.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );
  const handleContactSale = () => {
    window.open(linkSupport, '_blank');
    onClose();
  };
  return (
    <DialogCancelView
      title={title}
      description={description}
      cancelTitle={cancelTitle}
      contactTitle={contactTitle}
      onClose={onClose}
      onContact={handleContactSale}
    />
  );
}

export default DialogContact;
