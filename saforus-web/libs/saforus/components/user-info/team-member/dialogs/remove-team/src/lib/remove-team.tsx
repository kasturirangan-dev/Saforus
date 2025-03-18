import React from 'react';
import RemoveTeamDialogView from './view';
import useDeleteTeamData from './data';

type CreateTeamDialogProps = {
  onClose: () => void;
};

const RemoveTeamDialogContainer: React.FC<CreateTeamDialogProps> = ({
  onClose,
}) => {
  const { onSubmit, register, errors, handleSubmit } =
  useDeleteTeamData({
      onClose,
    });

  return (
    <RemoveTeamDialogView
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onClose={onClose}
      register={register}
      errors={errors}
    />
  );
};

export default RemoveTeamDialogContainer;
