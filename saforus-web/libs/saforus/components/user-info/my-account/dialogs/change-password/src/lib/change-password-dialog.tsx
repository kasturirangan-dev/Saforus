import useChangePasswordDialogData from './data';
import ChangePasswordDialogView from './view';

type ChangePasswordDialogProps = {
  onClose: () => void;
  // show dialog success or
  currentPassword: string;
  onResult: (result: boolean) => void;
};

export function ChangePasswordDialog({
  onClose,
  currentPassword,
  onResult,
}: ChangePasswordDialogProps) {
  const { register, handleSubmit, errors, onSubmit, watch, loading } =
    useChangePasswordDialogData({ currentPassword, onResult, onClose });

  return (
    <ChangePasswordDialogView
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
      onClose={onClose}
      watch={watch}
      loading={loading}
      onResult={onResult}
    />
  );
}

export default ChangePasswordDialog;
