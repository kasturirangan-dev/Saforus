import React from 'react';
import InviteMemberDialogView from './view';
import useInviteMemberData from './data';

type CreateTeamDialogProps = {
  onClose: () => void;
};

const InviteMemberDialogContainer: React.FC<CreateTeamDialogProps> = ({
  onClose,
}) => {
  const { register, handleSubmit, errors, onSubmit, loading, control } =
    useInviteMemberData({
      onClose,
    });

  return (
    <InviteMemberDialogView
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
      onClose={onClose}
      control={control}
      loading={loading}
    />
  );
};

export default InviteMemberDialogContainer;
