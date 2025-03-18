import useChangePasswordDialogData from './data';
import CurrentPasswordDialogView from './view';

type CurrentPasswordDialogProps = {
  onClose: () => void;
  onResetPassword: () => void;
  // show dialog success or
  onContinue: (result: boolean, currentPassword?: string) => void;
};

export function ChangePasswordDialog({
  onClose,
  onResetPassword,
  onContinue,
}: CurrentPasswordDialogProps) {
  const { register, handleSubmit, errors, onSubmit, watch, loading } =
    useChangePasswordDialogData({ onContinue, onClose });

  return (
    <CurrentPasswordDialogView
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
      onClose={onClose}
      watch={watch}
      loading={loading}
      onResetPassword={onResetPassword}
    />
  );
}

export default ChangePasswordDialog;
