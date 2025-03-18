import DialogCancelView from './view';

export interface DialogCancelProps {
  onClose: () => void;
  onLeave: () => void;
  onStay: () => void;
  title?: string;
  description?: string;
  leaveTitle?: string;
  stayTitle?: string;
}

export function DialogCancel({
  onClose,
  onLeave,
  onStay,
  title,
  description,
  leaveTitle,
  stayTitle,
}: DialogCancelProps) {
  return (
    <DialogCancelView
      title={title}
      description={description}
      leaveTitle={leaveTitle}
      stayTitle={stayTitle}
      onClose={onClose}
      onLeave={onLeave}
      onStay={onStay}
    />
  );
}

export default DialogCancel;
