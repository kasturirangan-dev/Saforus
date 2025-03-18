import DialogChangeOwnerView from './view';

export interface DialogChangeOwnerProps {
  onClose: () => void;
  onChange: () => Promise<boolean>;
  value: any;
  label: string;
  onCancel: () => void;
}

export function DialogChangeOwner({
  onClose,
  onCancel,
  onChange,
  value,
  label,
}: DialogChangeOwnerProps) {
  return (
    <DialogChangeOwnerView
      onClose={onClose}
      onCancel={onCancel}
      onChange={onChange}
      value={value}
      label={label}
    />
  );
}

export default DialogChangeOwner;
