import React from 'react';
import DeleteAdminUsersDialogView from './view';
import useDeleteAdminUsersData from './data';

type DeleteAdminUsersDialogProps = {
  onClose: () => void;
};

const RemoveTeamMemberDialogContainer: React.FC<
  DeleteAdminUsersDialogProps
> = ({ onClose }) => {
  const { onSubmit, error } = useDeleteAdminUsersData({
    onClose,
  });

  return <DeleteAdminUsersDialogView onSubmit={onSubmit} onClose={onClose} />;
};

export default RemoveTeamMemberDialogContainer;
