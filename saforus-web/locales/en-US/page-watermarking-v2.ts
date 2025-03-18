const watermarking = {
  'create-watermarking': {
    title: 'Watermarking',
    description: 'Embed an invisible watermark into the content.',
    'attack-file': {
      title: 'Upload File',
      description: 'Please attach the file to watermark',
      'drop-file-text': 'Upload your file for watermarking',
      'browse-file-text': 'Drag or <0>Browse</0> a file from your computer.',

      'current-usage': 'Current Usage',
      'invalid-name': `File name with special characters (& $ @ = ; / : + , ? { } ^ % \` [ ] " ' < > ~ # |) is not supported. Please rename the file and try again!`,
      unsupported: 'Unsupported file format.',
      oneFileAllowed: 'Only one file can be attached',
      'try-again': 'Try again',
    },
    'file-information': {
      title: 'Insert Watermark',
      'watermark-code': 'Watermark Code',
      'watermark-code-description':
        'A unique watermark code is automatically generated for each file, but it may repeat if requests exceed 65,536.',
      description: 'File Identifier',
      'placeholder-watermark-code':
        'Enter a file identifier (e.g., Sharing with A Company).',
      'watermark-code-limit': 'file(s) with a watermark will be generated.',
    },
    supported: {
      title: 'Supported Format',
      'file-size':
        'You can upload file up to 600MB for each order. For larger files, please contact our <0>Help Center</0> for assistance.',
    },
    'insert-watermark': 'Submit Order ',
    success: 'Submitted!',
    'failed-title': 'Something went wrong.',
    'failed-description': 'Please try again!',
  },
  'view-watermarked-order': {
    title: 'Watermarked Orders',
    description: 'Embed an invisible watermark into the content.',
    search: {
      title: 'Filters',
      reset: 'Reset all',
      format: 'Format',
      requested: 'Requested Date',
    },
    table: {
      'order-no': 'Order Number',
      'watermarked-file': 'Watermarked File',
      'file-name': 'File Name',
      format: 'Format',
      requestor: 'Requestor',
      status: 'Status',
      requested: 'Requested Date',
      action: 'Action',
      'no-results': 'There are no watermark orders requested.',
    },
    'inprogress-message': 'Watermarking in progress. Please wait…',
  },
  'watermarked-order-detail': {
    title: 'Order Details',
    description: 'Embed an invisible watermark into the content.',
    'order-number': 'Order Number',
    status: 'Status',
    'requested-date': 'Requested Date',

    'file-information': {
      title: 'File Information',
      'watermark-code': 'Watermark Code',
      description: 'File Identifier',
    },
    share: 'Send Email',
    'share-success': 'Successfully shared with ‘%{email}’',
    'share-fail': 'Oops! The email couldn’t be sent. Please try again.',
    'download-files': 'Download',

    'shared-history': {
      title: 'Shared History',
      'watermark-code': 'Watermark Code',
      'file-name': 'File Name',
      'share-email': 'Email',
      'share-date': 'Shared Date',
    },

    'delete-order': {
      title: 'Delete Order',
      description:
        'It will disable watermark detection requests for this order. Are you sure you want to delete? \n All files and data will be permanently deleted and cannot be recovered.',
      cancel: 'Cancel',
      delete: 'Delete',
    },
    'delete-success': 'The order %{orderNo} has been deleted.',
  },
};

export default watermarking;
