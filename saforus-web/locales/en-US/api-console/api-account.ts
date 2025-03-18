const apiAccount = {
  title: 'My Account',
  description:
    'Manage your personal information and account settings conveniently.',
  'personal-information': {
    title: 'Personal Information',
    name: 'Name',
    email: 'Email',
    company: 'Company',
    'service-plan': 'Service Plan',
    phone: 'Phone number',
  },
  'account-information': {
    title: 'Account Information',
    'login-account': 'Login Account',
    'account-id': 'Account ID',
    'created-date': 'Created Date',
  },
  'timezone-settings': 'Timezone Settings',
  'recent-session': 'Recent Session',
  button: {
    'edit-profile': 'Edit Profile',
    change: 'Change',
    'save-changes': 'Save Changes',
    deactivate: 'Deactivate',
    'change-password': 'Change Password',
    logout: 'Log out',
    'change-passowrd-confirm': 'Change Passowrd',
    cancel: 'Cancel',
  },
  'edit-profile': {
    title: 'Edit Profile',
    'user-name': 'User Name',
    'company-name': 'Company Name',
    'phone-number': 'Phone number',
  },
  'deactivate-account': {
    title: 'Deactive Account?',
    description:
      'Are you sure you want to deactivate your account? Your service plan and all data will be lost and cannot be recovered within 365 days.',
    close: 'Close',
    yes: 'Yes',
  },
  'avatar-editor': {
    title: 'Profile Photo',
    'upload-photo': 'Upload Photo',
    'update-photo': 'Update Photo',
    save: 'Save',
    success: 'Profile image updated successfully!',
    fail: 'Failed to update the image. Please try again!',
    'delete-success': 'Profile image deleted successfully!',
    'delete-fail': 'Failed to delete the image. Please try again!',
  },
  'edit-timezone': {
    title: 'Time Zone Setting',
    timezone: 'Timezone',
    success: 'Timezone updated successfully!',
    fail: 'Timezone updated failed!',
  },
};

export { apiAccount };
