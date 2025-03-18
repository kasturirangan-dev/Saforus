const apiKeyManagement = {
  title: 'API Key Management',
  description:
    'Manage your API keys with ease. Create, view, and control API keys to customize access for each application.\n Simplify API usage and maintain security by tailoring permissions for your needs.',
  table: {
    'api-keys': 'API Keys',
    name: 'Key Name',
    token: 'Token',
    status: 'Status',
    expires: 'Expires',
    'created-date': 'Created Date',
    action: 'Action',
    'days-left': '%{numberOfDay} days left',
    'never-expire': 'Never Expire',
  },
  button: {
    create: 'Create API Key',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    discard: 'Discard',
    save: 'Save Changes',
    cancel: 'Cancel',
    'contact-support': 'Contact Support',
  },
  form: {
    name: 'API Key Name',
    'name-placeholder': 'Please input key name.',
    status: 'Status',
    expriation: 'Expiration Date',
    'never-expire': 'Never Expire',
  },
  create: {
    title: 'Create API Key',
    description:
      'Enter an identifying name for your API key, set an expiration time, and click Create to generate it.',
  },
  edit: {
    title: 'Edit API Key',
    description:
      'Modify settings such as the name, permissions, or expiration time of the API key',
  },
  delete: {
    title: 'Delete API Key?',
    description:
      'This action cannot be undone. It will permanently deactive this API key, are you sure you want to proceed?',
  },
  'reached-limit': {
    title: 'API Key Limit Reached',
    description:
      'You’ve reached the maximum of 10 API keys per account. Please review your existing keys or contact Help Center if you need additional keys or further assistance.',
  },
  errmsg: {
    'names-max-length': 'Please keep names under 30 characters.',
  },
};

export { apiKeyManagement };
