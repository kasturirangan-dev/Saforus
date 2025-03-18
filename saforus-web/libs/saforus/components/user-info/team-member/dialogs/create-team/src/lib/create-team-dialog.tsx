import React, { useEffect } from 'react';
import useCreateTeamDialogData from './data';
import CreateTeamDialogView from './view';

type CreateTeamDialogProps = {
  onClose: () => void;
};

const CreateTeamDialogContainer: React.FC<CreateTeamDialogProps> = ({
  onClose,
}) => {
  const { register, handleSubmit, errors, onSubmit, loading, handleKeyPress } =
    useCreateTeamDialogData({
      onClose,
    });

  return (
    <CreateTeamDialogView
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
      onClose={onClose}
      loading={loading}
      handleKeyPress={handleKeyPress}
    />
  );
};

export default CreateTeamDialogContainer;
