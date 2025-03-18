import React from 'react';
import useCreateSiteDialogData from './data';
import AddSiteDialogView from './view';

type AddSiteDialogProps = {
  onClose: () => void;
};

const AddSiteDialogContainer: React.FC<AddSiteDialogProps> = ({ onClose }) => {
  const { register, handleSubmit, errors, onSubmit, loading, handleKeyPress } =
    useCreateSiteDialogData({
      onClose,
    });

  return (
    <AddSiteDialogView
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

export default AddSiteDialogContainer;
