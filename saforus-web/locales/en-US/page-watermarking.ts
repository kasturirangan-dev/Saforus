const watermarking = {
  'page-watermarking': {
    create: {
      title: 'Digital Watermarking Service',
      'order-title': 'Order Title',
      'order-title-placeholder': 'Enter your order title (Up to 50 characters)',
      'content-type': 'Content Type',
      'content-type-description':
        'Choose your content type to create a new forensic watermarking request',
      image: 'Image',
      video: 'Video',
      audio: 'Audio',
      document: 'Document',
      'image-format': 'Image Format',
      'audio-format': 'Audio Format',
      'video-format': 'Video Format',
      'recommended-resolution': 'Resolution in Pixels',
      'recommended-resolution-description':
        '512x512 or more(recommended) \n 256x256(minimum)',
      'video-frame': 'Video Frame Rate',
      'video-frame-description': 'CFR (Constant Frame Rate)',
      'audio-rate': 'Audio Sample Rate',
      'file-location': 'Upload Original Files',
      'file-location-description':
        'Choose your option to provide the original file to apply forensic watermarking.',
      'file-location-format':
        'Filename should contain only letters, numbers, "-" or "_". ',
      'file-location-capacity':
        'Total uploaded files must not exceed 600MB. (Please contact Customer Support for the large files)',
      pc: 'PC',

      'cloud-storage': 'Cloud Storage',
      'presigned-url': 'Presigned URL',
      'file-list': 'File List (%{selectedFiles} out of %{allFiles})',
      'file-list-description':
        'Select your files to apply forensic watermarking',
      'set-watermarking-code': 'Set Watermark Code',
      'watermarking-code-description':
        'Type your watermark codes between 1 and 2000 which will be  applied to the original content',
      'watermarking-code-description-standard':
        'Enter watermark codes between %{startCode} to %{endCode} to be embedded into the original content.',
      'watermarking-code-description-standard-ex':
        'For Example: If you enter 1~5, five files will be created with invisible codes 1, 2, 3, 4 and 5.',
      'watermarking-code-description-trial':
        'Enter watermark codes between %{startCode} to %{endCode} to be embedded into the original content.',
      'watermarking-code-description-trial-ex':
        'For Example: If you enter 1~5, five files will be created with invisible codes 1, 2, 3, 4 and 5.',
      'create-new-order': 'Create New Order',
      'start-code': 'Starting Watermark Code',
      'end-code': 'Ending Watermark Code',
      'drop-your-files': 'Drop your files here',
      'delete-selected': 'Delete Selected',
      'browse-files': 'Browse Files',
      'from-your-computer': 'from your computer',
      'site-credential': 'Site and Credential',
      'site-credential-description':
        'Choose your site which has the list of your preset storages and their access permission',
      message: {
        'between-1-and-2000': 'Watermark Code should be between 1 and 2000.',
        '2000-or-less': 'Watermark Code should be 2000 or less.',
        'end-code-greater':
          'Enter a number not less than Starting Watermark Code.',
        'file-length': 'Please select no more than 10 files per order.',
        'video-length-single': 'Please select one video file per order.',
        'file-selected-capacity': 'Please upload files up to 600MB per order.',
        'file-name-format':
          'The file name must contain only letters, numbers, "-" or "_".',
        'file-name-characters':
          'Please enter the file name within 200 characters.',
        'unsupported-file':
          'Please upload a supported file format for digital watermarking.',
        permission:
          'Please check your Access Key and Secret Key in My Site & Storage.',
        'load-files-failure': "Can't load files from the Input File Path.",
        'create-folder-successful':
          'Created an output folder in Output Storage successfully.',
        'please-create-folder':
          'Please create an output folder in Output Storage.',
        'folder-existed':
          'Folder already exists. Please input a different name.',
        'need-permission':
          'As a viewer, you can not use this feature. Please ask for permission and try again.',
      },
      'file-location-storage': {
        'see-details': 'See details',
        'input-files': 'Input File Location',
        'input-files-description':
          'Choose a storage in the list below to provide input content file(s)',
        'output-files': 'Output File Location',
        'output-files-description':
          'Choose a storage in the list below to save forensic watermarking file(s)',
        'add-storage': '+Add storage',
        'input-storage': 'Input Storage',
        'output-storage': 'Output Storage',
        'bucket-name': 'Bucket Name',
        'input-file-path': 'Input File Path',
        'output-file-path': 'Output File Path',
        'load-files': 'Load Files',
        'create-folder': 'Create Folder',
      },
      'trial-title':
        '%{fullName} is currently on a Free Trial Plan (%{numberOfDay} days left).',
      'trial-description-1':
        'The free plan allows you to embed 1 to 10 forensic watermark codes per file.',
      'trial-description-2':
        'Upgrade your service plan now to unblock advanced features.',
      'don-show-trial': 'Don’t show this for a day',
      'delete-file-dialog': {
        title: 'Do you want to delete the selected files from the list?',
        description: 'The files won’t be included in your order.',
        btnCancelText: 'Cancel',
        btnContinueText: 'Delete',
      },
      'storage-dialog': {
        title: 'Not Enough Capacity',
        description: `You've exceeded your watermark capacity. Please modify the file size or upgrade your service plan before trying again.`,
        noSpaceTitle: 'Out of Capacity',
        noSpaceDescription: `Sorry! You can't create a new order because your Watermark Capacity is full. To continue using our service, please consider upgrading your plan.`,
        currentAvailable: 'Available Capacity %{currentAvailable}',
        primaryAction: 'Try Again',
        secondaryAction: 'View Service Plan',
        noSpacePrimaryAction: 'View Service Plan',
        noSpaceSecondaryAction: 'Close',
      },
      'warning-file-length-dialog': {
        title: 'File upload maximum exceeded.',
        description: 'You can upload up to %{length} files.',
        'retry-btn': 'Retry',
      },
    },
    'submitting-order': {
      title: 'Confirm Order',
      'order-no-description': 'Please confirm your order and submit it.',
      'submit-order': 'Submit Order',
      message: {
        failed:
          'Your order could not be submitted! Please try it again or contact Support to get help.',
        successful: 'Your order has been successfully submitted.',
      },
      'error-dialog': {
        title: 'An unknown error occurred.',
        description: '(Error Code: %{errorCode})',
      },
    },
    tooltip: {
      'image-title': 'Need more file format?',
      'image-description': 'Please contact Customer Support to get help.',
      'recommended-resolution': 'Recommended image resolution?',
      'recommended-resolution-description':
        'Watermark can be embedded on images with a minimum resolution of 256x256. However, using images of 512x512 or more is strongly recommended to increase the watermark detection rate.',
      'video-frame': 'Not support VFR(Variable Frame Rate)',
      'video-frame-description':
        'Please convert VFR to CRF to apply forensic watermarking.',
      'audio-title': 'Need more audio format?',
      'audio-description': 'Please contact Customer Support to get help.',
      'video-title': 'Need more video format?',
      'video-description': 'Please contact Customer Support to get help.',
      'audio-rate': '44.1 KHz vs. 48 KHz ?',
      'audio-rate-description':
        '44.1KHz is a common sampling frequency for music and 48KHz is used for movies.',
      'input-path': 'Input File Path?',
      'input-path-description':
        'Please enter the original content file name or path to apply forensic watermarking.',
      'output-path': 'Output File Path?',
      'output-path-description':
        'The completed files will be saved to the output folder in output storage.',
    },
    'submitted-order': {
      title: 'Order Submitted',
      'order-no-description': 'Your order is being processed',
      'view-order-list': 'View Order List',
      'view-order-list-description':
        'You can also see the progress in the details of the View Order List.',
    },
    table: {
      'order-no': 'Order No',
      requester: 'Requester',
      title: 'Order Title',
      summary: 'Summary',
      format: 'Format',
      type: 'Type',
      requested: 'Requested Date',
      'file-link': 'File Link',
      'file-name': 'File Name',
      'content-type': 'Content Type',
      'file-format': 'Format',
      'file-size': 'Size',
      'watermark-code': 'Watermark Code',
      supported: 'Supported',
      status: 'Status',
      'no-rows': 'Whoops! No files in list.',
      'service-type': 'Service Type',
      'in-queue': 'IN QUEUE',
      'in-progress': 'IN PROGRESS',
      completed: 'COMPLETED',
      failed: 'FAILED',
      'expiration-date': 'Expiration Date',
      'selected-row': '%{selected} selected out of %{total}',
      'selection-restriction':
        'Only 10 files (for video only 1 file) can be selected at a time',
      share: 'Share',
      shared: 'Shared',
      'download-limits': 'Download Limits',
      'download-limits-tooltip-header': 'Download Limits?',
      'download-limits-tooltip':
        'To prevent over downloading, it is constrained to 3 time downloads.',
      'shared-to': 'Shared With',
      image: 'IMAGE',
      video: 'VIDEO',
      audio: 'AUDIO',
      document: 'DOCUMENT',
    },
    'order-no': 'Order No: %{orderNo}',
    details: 'Details',
    'loading-description-1': 'Submitting your order.',
    'loading-description-2': 'Please wait.',
    dialog: {
      'change-content-title':
        'Do you want to change the content type to %{contentType}?',
      'change-content-description':
        "Changing 'Content Type' will initialize your order form.",
      'files-location-title':
        'Do you want to choose your original file(s) from your computer?',
      'storage-location-title':
        'Do you want to choose your original file(s) from your storage?',
      'url-location-title':
        'Do you want to choose your original file(s) from the presigned URL?',
      'changed-location-description': 'The file list needs to be reloaded.',
      'cancel-order-title': 'Do you want to cancel your order?',
      'cancel-order-description':
        'All data in the order form will be reinitialized',
      'cancel-check-title': 'Yes, I would like to cancel my order.',
      'share-title': 'Share Watermarked File',
      'share-subtitle':
        'An email with the attached watermarked file <0>%{fileName}</0> will be sent to:',
      'share-email-placeholder': 'Enter email',
      'share-email-description':
        'Please enter a valid email address.',
      'share-send': 'Send',
      'email-success': 'Email sent.',
      'email-fail': 'Sending email failed.',
      'link-expired-title': 'Sorry, the link has expired.',
      'link-expired-description1':
        'The link was set to expire after a certain amount of time.',
      'link-expired-description2':
        'Please contact the person who shared this link with you.',
    },
    status: {
      'in-progress': 'IN PROGRESS',
      completed: 'COMPLETED',
      failed: 'FAILED',
      'in-queue': 'IN QUEUE',
      expired: 'EXPIRED',
    },
  },
  'view-order': {
    title: 'Watermarking Order History',
    'title-find-order': 'Find Digital Watermarking Order Number',
    total: '%{row} out of %{total}',
    'search-order-no': 'Order number or title',
    search: {
      title: 'Search Orders',
      'service-type': 'Service Type',
      'detection-type': 'Detection Mode',
      status: 'Status',
      'content-type': 'Content Type',
      requester: 'Requester',
      requestor: 'Requestor',
      format: 'Format',
      'requested-date': 'Requested Date',
      keywords: 'Keywords',
      'packaging-option': 'Packaging Option',
    },
    list: {
      title: 'Result',
    },
    detail: {
      title: 'Details',
      'sub-title': 'Please download the completed files within expiration date',
      breadcrumb: {
        'forensic-watermarking': 'Digital Watermarking',
        'view-orders': 'View Orders',
        details: 'Details',
      },
    },
  },

  'download-files': {
    'expiry-date': 'Expiration Date',
    'expires-on': 'Expires on %{expiresOn}',
    download: 'Download Selected',
    downloadAll: 'Download File(s)',
    downloadFile: 'Download File',
    selected: 'Selected',
    note: 'Download or Share files before it expires to prevent any inconvenience.',
    'share-link-history': 'Shared History',
    breadcrumb: {
      'forensic-watermarking': 'Forensic Watermarking',
      'view-orders': 'View Orders',
      details: 'Details',
      'download-files': 'Download Files',
    },
    message: {
      'file-length': 'Please select no more than 10 files.',
    },
    'download-limit-hit': {
      title: 'Sorry, you hit the download limits.',
      subtitle1: 'If you want to access this file again,',
      subtitle2: 'please contact the person who shared this file with you.',
    },
    'download-expired': {
      title: 'Sorry, the link has expired.',
      subtitle1:
        'The download was set to expire after a certain amount of time.',
      subtitle2: 'Please contact the person who shared this file with you.',
      expiredOrder: 'This order has expired.',
    },
    'share-warning': {
      'first-sentence':
        'Please avoid sharing it with others to maintain smooth traceability and continued accessibility.',
      'second-sentence':
        'This compromises the uniqueness of the file, making it difficult to trace the source in case of a leak.',
      'third-sentence':
        'If you share the file with others, it cannot be downloaded.',
    },
  },
};

export default watermarking;
