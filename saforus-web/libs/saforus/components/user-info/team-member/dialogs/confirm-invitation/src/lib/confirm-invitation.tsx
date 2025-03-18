import React from 'react';
import ConfirmInvitationDialogView from './view';
import useConfirmInvitationData from './data';

type CreateTeamDialogProps = {
  onClose: () => void;
};

const ConfirmInvitationDialogContainer: React.FC<CreateTeamDialogProps> = ({
  onClose,
}) => {
  const { onAccept, onDecline, loading } = useConfirmInvitationData({
    onClose,
  });

  return (
    <ConfirmInvitationDialogView
      onClose={onClose}
      onAccept={onAccept}
      onDecline={onDecline}
      loading={loading}
    />
  );
};

export default ConfirmInvitationDialogContainer;
