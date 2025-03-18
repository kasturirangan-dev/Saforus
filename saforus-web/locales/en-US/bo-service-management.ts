const serviceManagement = {
  'notification-list': {
    header: 'Manage Notices',
    title: 'Notice List',
    button: {
      'create-new-notice': 'Create New Notice',
      preview: 'Preview',
    },
    'search-placeholder': 'User name or email account',
    table: {
      all: 'All',
      type: 'Type',
      title: 'Title',
      summary: 'Summary',
      lang: 'Lang',
      editor: 'Editor',
      status: 'Status',
      'display-on': 'Display On',
      'notice-period': 'Notice Period',
      notice: 'Notice',
      event: 'Event',
      publish: 'Publish',
      hide: 'Hide',
      show: 'Show',
      'no-row': 'No Notices were created.',
      'no-result': 'No search results found.',
    },
  },
  'create-notification': {
    header: 'Create a New Notice',
    contents: 'Contents',
    summary: 'Summary',
    type: 'Type',
    title: 'Title',
    notice: 'Notice',
    all: 'All',
    event: 'Event',
    'title-placeholder': 'Enter your title (Up to 150 characters)',
    'recommended-upload': 'Recommended image resolution is 480*250.',
    detail: 'Detail',
    'detail-placeholder': 'Enter your detail (Up to 500 characters)',
    'display-options': 'Display Options',
    settings: 'Settings',
    'page-settings': 'Page settings',
    'last-saved': 'Last Saved',
    button: {
      hide: 'Hide',
      'button-show-hide': 'Button Show/Hide',
      banner: 'Show Banner',
      'show-hide': 'Show/Hide',
      save: 'Save',
      publish: 'Publish',
      'view-preview': 'View Preview',
      'do-not-view-day': 'Do not show for a day',
      button: 'Button',
      show: 'Show',
      'set-period': 'Set Notice Period (KST)',
      delete: 'Delete',
      cancel: 'Cancel',
    },
    dialog: {
      'dimension-title': 'The attached image resolution is incorrect.',
      'dimension-description':
        'The recommended image resolution is 480*250(px). Please try again with the recommended resolution.',
      'size-title': 'The attached file size does not fit.',
      'size-description': 'Please upload image files within 5MB.',
      'ext-title': 'The attached file format is incorrect.',
      'ext-description': 'Only JPG, PNG can be uploaded.',
      'delete-title': 'Do you want to delete the notice?',
      'delete-description':
        'You cannot recover deleted Notices, and displayed Notices will be deleted.',
    },
  },
};

export default serviceManagement;
