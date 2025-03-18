const teamMember = {
  'team-member': {
    'team-member-info': {
      'search-placeholder': 'Search by email or name.',
      'no-team': 'No Team',
      'no-team-des-1': 'Please create a team and collaborate with members.',
      'no-team-des-2':
        'You can share the order history with them and manage it together.',
      'team-details': 'Team details',
      'team-owner': 'Team Owner',
      'team-service-plan': 'Team Service Plan',
      description: 'Description',
      created: 'Created',
      'search-member': 'Search Member',
      role: 'Role',
      status: 'Status',
      date: 'Date',
      members: 'Members (Total %{total})',
      'detail-members': 'Team Members (Total %{total})',
      'invite-member': 'Invite Member',
      'remove-members': 'Remove Members',
      'free-plan': 'Free Plan',
      'standard-plan': 'Standard',
      'enterprise-plan': 'Enterprise',
    },
    table: {
      email: 'Email',
      name: 'Name',
      role: 'Role',
      status: 'Status',
      joined: 'Joined',
      'invited-date': 'Invited',
      'expired-date': 'Expired',
      'no-rows': 'No orders',
    },
    status: {
      joined: 'Joined',
      invited: 'Invited',
      expired: 'Expired',
      cancelled: 'Cancelled',
    },
    role: {
      owner: 'Master',
      member: 'Member',
      viewer: 'Viewer',
    },
    button: {
      'create-team': 'Create New Team',
      cancel: 'Cancel',
      continue: 'Continue',
    },
    dialog: {
      'create-team-title': 'Create New Team',
      'create-team-description': 'Please enter your team information.',
      'invite-member-title': 'Invite Member',
      'invite-member-description':
        'Please enter the name and email address to invite your team member.',
      'remove-team-member-title': 'Do you want to remove members?',
      'remove-team-member-description':
        'Will remove %{size} members from the team. Invited users will have their invitation email expired.',
      'invite-member-failed':
        '[Error Code: %{code}] Can not invite the team member. Please contact Customer Support.',
      'invite-member-failed-nocode':
        'Can not invite the team member. Please contact Customer Support.',
      'invite-member-failed-exceeded-limit':
        'The maximum number of members on the team cannot exceed %{quantity}.',
      'member-of-another-team':
        'Cannot invite user as they are already a member of another team.',
      'accept-invitation-title': 'You have been invited by %{team}.',
      'accept-invitation-description':
        ' If you accept a team invitation, you will automatically accept the team service terms and conditions, and your account information such as the company name, URL, and Country of Incorporation will be changed to %{team} information.',
      'confirm-invitation-title': 'Confirm Team Membership',
      'confirm-invitation-description':
        "Click 'Accept' to join the %{team} team. \nIf you prefer not to join, you can decline the invitation.",
      'confirm-invitation-accept': 'Accept',
      'confirm-invitation-decline': 'Decline',
      'accept-policy-checkbox':
        '<strong>[Required]</strong> I agree to the Team <0><strong>Service Terms and Conditions</strong></0> on Saforus.',
    },
    'create-team': {
      'team-name': 'Team Name',
      'team-name-placeholder': 'Please enter your team name.',
      'team-description': 'Description',
      'team-description-placeholder':
        'Enter team description (Up to 500 characters)',
    },
    'invite-member': {
      name: 'Name',
      'name-placeholder': 'Please enter name.',
      email: 'Email',
      'email-placeholder': 'Please enter email.',
      role: 'Role',
      'role-placeholder': 'Please select role.',
    },
    'accept-invitation': {
      'accept-invitation-cancel-button': 'Cancel',
      'accept-invitation-accept-button': 'Accept',
    },
    'expired-email-view': {
      title: 'Expired',
      heading: 'Your invitation mail has expired.',
      description:
        'If you want to join a team, ask the team master for an invitation email.',
      button: 'Home',
    },
    message: {
      'create-team-successful': 'Your team has been successfully created!',
      'create-team-failure-no-code':
        'Can not create the team. Please contact Customer Support.',
      'create-team-failure-code':
        'Can not create the team. Please contact Customer Support. [Error Code: %{code}]',
      'update-team-successful': 'Team information has been updated.',
      'update-team-failure':
        'Can not update team information. Please contact Customer Support.',
      'invite-member-successful':
        'New team member has been successfully invited!',
      'remove-member-successful':
        '%{size} member(s) have been removed successfully.',
      'accept-invitation-successful': 'You have joined %{team} as a %{role}.',
      'decline-invitation-successful':
        'You have declined the invitation to join %{team} team.',
      'invitation-error': {
        expired: 'Unfortunately, this invitation has expired.',
        declined: 'The invitation has been declined before.',
        accepted: 'This invitation has already been accepted.',
        'team-deleted':
          "The invitation is no longer active because the team doesn't exist.",
        'not-found':
          'The invitation could not be found, or you do not have permission to view it. Please login with the correct username.',
      },
    },
    tooltip: {
      master: {
        content1: 'Team owner & admin.',
        content2: 'Invite or remove team members.',
        content3: 'Configure site and storage information.',
        content4: 'Manage service plan & billing information.',
      },
      member: {
        content1: 'Create & submit a new order.',
        content2: 'See the result from team orders.',
      },
      viewer: {
        content1: 'See the result from team orders.',
        content2: 'Can’t create & submit new order.',
      },
    },
  },
  'team-detail': {
    title: 'Team Details',
    'team-overview': 'Team Overview',
    name: 'Name',
    owner: 'Owner',
    description: 'Description',
    'company-name': 'Company Name',
    'company-url': 'Company URL',
    country: 'Country of Incorporation',
    'team-service-plan': 'Team Service Plan',
    'subscription-on': 'Subscription on %{date}',
    'subscription-type': 'Subscription Type',
    change: 'Change',
    'delete-team': 'Delete Team',
    'team-history-order': 'Team Order History (Total %{total})',
    dialog: {
      'change-owner-title': 'Are you sure you want to change the team owner?',
      'change-owner-description-1':
        'Team owner is the master who manages Service Plan , Payment and Members for the team.',
      'change-owner-description-2':
        'Need to re-login after changing the owner.',
      'checkbox-title':
        'Yes, I would like to change team owner to %{new_owner} and log out.',
      'change-owner-button': 'Change Team Owner',
    },
    'free-plan': 'Free Trial Plan',
  },
  'delete-team': {
    'button-delete': 'Delete Team',
    dialog: {
      'remove-team-title': 'Delete My Team',
      'remove-team-description':
        'You can not search your previous tasks in the site once you delete this.',
      'confirm-msg-one': 'Download SaForus order history as a backup file.',
      'confirm-msg-two': 'I have read and understood the notice above.',
      'btn-cancel': 'Cancel',
      'btn-delete': 'Delete Team',
      'confirm-required': 'Confirmation required.',
    },
  },
};

export default teamMember;
