import React from 'react';
import useDeleteSiteData from './data';
import DeleteSiteView from './view';

type DeleteSiteDialogProps = {
  onClose: () => void;
  siteName: string;
};

const DeleteSiteDialog: React.FC<DeleteSiteDialogProps> = ({
  onClose,
  siteName,
}) => {
  const { checkboxValue, handleCheckboxChange, onDelete, isLoading } =
    useDeleteSiteData({
      onClose,
    });

  return (
    <DeleteSiteView
      onClose={onClose}
      siteName={siteName}
      checkboxValue={checkboxValue}
      handleCheckboxChange={handleCheckboxChange}
      onDelete={onDelete}
      isLoading={isLoading}
    />
  );
};

export default DeleteSiteDialog;
