import React from 'react';
import useDeleteStorageData from './data';
import DeleteStorageView from './view';

interface DeleteStorageDialogProps {
  onClose: () => void;
  name: string;
}

const DeleteStorageDialog: React.FC<DeleteStorageDialogProps> = ({
  onClose,
  name,
}) => {
  const { checkboxValue, handleCheckboxChange, onDelete, isLoading } =
    useDeleteStorageData({ onClose });

  return (
    <DeleteStorageView
      onDelete={onDelete}
      onClose={onClose}
      checkboxValue={checkboxValue}
      handleCheckboxChange={handleCheckboxChange}
      isLoading={isLoading}
      name={name}
    />
  );
};

export default DeleteStorageDialog;
