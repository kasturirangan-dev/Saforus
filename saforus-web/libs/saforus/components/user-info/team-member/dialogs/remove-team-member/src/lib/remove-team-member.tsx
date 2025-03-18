import React from 'react';
import RemoveTeamMemberDialogView from './view';
import useRemoveMemberData from './data';

type CreateTeamDialogProps = {
  onClose: () => void;
};

const RemoveTeamMemberDialogContainer: React.FC<CreateTeamDialogProps> = ({
  onClose,
}) => {
  const { onSubmit, error } = useRemoveMemberData({
    onClose,
  });

  return <RemoveTeamMemberDialogView onSubmit={onSubmit} onClose={onClose} />;
};

export default RemoveTeamMemberDialogContainer;
