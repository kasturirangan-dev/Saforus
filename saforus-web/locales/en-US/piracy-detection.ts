const piracyDetection = {
  'create-new-request': {
    'header-title': 'Detect Watermark',
    'header-description':
      'Check for watermark codes in uploaded file to detect leaks and ensure content integrity.',
    'description-2':
      'Watermarking has now improved! For files ordered before Nov 13, 2024, please contact <0>Help Center</0> for detection.',
    'sub-title':
      'Choose your content type to request for the detection of forensic watermark.',
    'request-title': 'Order Title*',
    'request-title-placeholder':
      'Enter your order title (Up to 50 characters) ',
    'content-type': 'Content Type',
    'order-number': 'Original Watermarked File',
    'order-number-placeholder': 'e.g. FI-1675667544270',
    'order-number-helper-text':
      'Choose the watermarking order number of the leaked copy of your content.',
    'find-order-number': 'Search File',
    'requested-file': 'File Location For Detection',
    'upload-linked-file': 'Upload Leaked File',
    'upload-file': 'Upload File*',
    'requested-file-description':
      'Send a copy of the leaked content to SaForus for detecting the invisible watermark.',
    'file-format': 'Filename should contain only letters, numbers, "-" or "_".',
    'file-size': 'The maximum file size for uploading is up to 1GB.',
    'file-size-support':
      'Total uploaded files must not exceed 600MB. (Please contact Customer Support for the large files)',
    'requirement-description':
      'Check the minimum requirement to detect watermark from the leaked file.',
    'remove-loading': 'Removing your file.\nPlease wait until done.',
    'create-loading': 'Uploading your file.\nPlease wait until done.',
    'upload-my-file': 'PC',
    'share-link': 'Cloud Storage',
    'minimum-image-length': 'Minimum Image Length',
    'image-quality': 'Image quality',
    'image-stability': 'Image stability',
    'minimum-video-length': 'Minimum Video Length',
    'video-quality': 'Video quality',
    'video-stability': 'Video stability',
    'minimum-audio-length': 'Minimum Audio Length',
    'audio-quality': 'Audio quality',
    'audio-stability': 'Audio stability',
    'submit-request': 'Request Detection',
    'attack-file': {
      title: 'Upload File',
      'drop-file-text': 'Upload your file for detection',
      'browse-file-text': 'Drag or <0>Browse</0> a file from your computer.',
    },
    'search-watermark': {
      title: 'Original Watermarked File',
      'watermarked-file': 'Watermarked File',
      searching: 'Searching...',
      'not-found': 'No exact matches found',
      'not-found-desc':
        'In some cases, the file may not be supported, or the original file might not exist in our database, which could make automatic search unavailable',
      'try-again': 'Try again',
      'help-text': 'or manually select an original content',
      'search-text': 'Select an original content',
      'search-file': 'Search File',
    },
    supported: {
      title: 'Supported Type',
      'file-size':
        'You can upload file up to 600MB for each order. For larger files, please contact our <0>Help Center</0> for assistance.',
      format: 'Format',
      wav: 'Wav(Default)',
    },
    requirement: {
      img: {
        'resolution-in-pixels': 'Resolution in Pixels',
        'resolution-1': 'At least 512 X 512 (Recommended)',
        'supported-file-format': 'Supported file formats',
        'supported-format-1': 'JPG',
        'supported-format-2': 'BMP(RGB 24bit, RGBA 32bit or Gray 8bit)',
        'not-supported': 'Not Supported Format',
        'not-supported-1': 'CMYK format',
        'not-supported-2': '10 bit color format',
        'not-supported-3': '1 bit grayscale',
      },
      video: {
        'play-time': 'Playback Time',
        'play-time-1': 'Distribution Video : at least 3 min',
        'play-time-2': 'Streaming Video: at least 15 min',
        resolution: 'Resolution & Quality',
        'resolution-1': 'At least 480p(SD), 1Mbps',
        'resolution-2': 'More than 720p(HD), 30fps, 3Mbps (Recommended)',
        'supported-file-formats': 'Supported File Format',
        'supported-file-formats-1': 'MP4 (CBR)',
        'supported-codec': 'Supported Codec',
        'supported-codec-1': 'Video Codec (H.264 , H.265)',
        'supported-codec-2': 'Audio Codec (No restrictions)',
        note: 'Note',
        'note-1':
          'Requires stable recorded video without shaking. Undetectable if the screen is shaken due to shooting with a handheld camera or smartphone.',
        'note-2':
          'Requires a section played normally without buffering or screen freezing for at least 5 minutes.',
      },
      audio: {
        'play-time': 'Playback Time',
        'play-time-1': 'At least 8 seconds (Minimum)',
        'play-time-2': 'More than 16 seconds (Recommended)',
        'file-format': 'File Format',
        'file-format-1': 'MP3, Wav(default)',
        'sampling-rate': 'Audio Sampling Rate',
        'sampling-rate-1': '44.1KHz',
        'sampling-rate-2': '48KHz',
      },
    },
    confirm: {
      'img-header':
        'JPEG or BMP is recommended for the Digital Watermark Detection.',
      'img-desc':
        'I agreed to the conversion of the file format for detection purposes if required.',
      'audio-header': 'Only MP3 and WAV can be detected.',
      'audio-desc':
        'I agreed to the conversion of the file format for detection purposes if required.',
      'video-header': 'Only MP4 and WMV can be detected.',
      'video-desc':
        'I agreed to the conversion of the file format for detection purposes if required.',
      'file-upload-failed': 'File upload failed.',
      'document-desc':
        'I agreed to the conversion of the file format for detection purposes if required.',
      'file-upload-failed-img':
        'This is not an image file type. Please upload it according to the file format.',
      'file-upload-failed-video':
        'This is not an video file type. Please upload it according to the file format.',
      'file-upload-failed-audio':
        'This is not an audio file type. Please upload it according to the file format.',
      'file-upload-failed-any_available': 'This file format ',
      'file-upload-failed-any_available_continued':
        ' is not allowed. Please upload it according to the supported file format.',
      unsupported: 'Unsupported file format.',
      'file-upload-max-size': 'Please submit a file smaller than 1GB.',
      'file-upload-wrong-format-name':
        'Order request failed. Please check the file name and file format.',
      'file-upload-wrong-format':
        'File type not supported for detection. \n Please upload supported file types only.',
      'only-one-file-allowed': 'Only one file can be attached',
      'retry-btn': 'Try Again',
    },
    'trial-description':
      'The free plan allows you to check only the watermark code detected in the leaked file. Try upgrading your service plan to view recipient information of detected watermark codes.',
    message: {
      'failed-title': 'Something went wrong.',
      'failed-description': 'Please try again!',
      successful: 'Submitted!',
      'failed-402010':
        'You have exceeded the allowed Piracy Detection attempts in your subscription plan.',
      'need-permission':
        'As a viewer, you can not use this feature. Please ask for permission and try again.',
      'pd-request-limit':
        'You have used all allowed Piracy Detection requests. Please contact Customer Support, if you need additional requests.',
    },
    'trial-title':
      '%{fullName} is currently on a Free Trial Plan (%{numberOfDay} days left).',
    'trial-description-1':
      'The free plan allows you to check only the watermark code detected in the leaked file.',
    'trial-description-2':
      'Upgrade your service plan now to unblock advanced features.',
    'don-show-trial': 'Don’t show this for a day',
  },
  delete: {
    title: 'Delete Order?',
    description:
      'Please be aware that once this order is deleted, it cannot be recovered after 30 days.',
    success: ' The order %{orderName} has been deleted.',
    button: {
      close: 'Cancel',
      delete: 'Delete',
    },
  },
  'piracy-order-view': {
    'order-list': 'Order List',
    'header-title': 'Detection Orders',
    'header-description':
      'Monitor and manage watermark detection requests, highlighting the status and outcomes of each order.',
    'header-find-order': 'Find Digital Watermarking Order Number',
    'search-order-no': 'Order number or title',
    search: {
      title: 'Filters',
      reset: 'Reset all',
      format: 'Format',
      requested: 'Requested Date',
    },
    table: {
      results: 'Results',
      'order-no': 'Order No',
      title: 'Title',
      'file-name': 'Name',
      format: 'Format',
      status: 'Status',
      'content-type': 'Content Type',
      requestor: 'Requestor',
      'request-date': 'Requested Date',
      'in-queue': 'IN QUEUE',
      'in-progress': 'IN PROGRESS',
      completed: 'COMPLETED',
      failed: 'FAILED',
      expired: 'EXPIRED',
      action: 'Action',
      details: 'Watermarked File',
      description: 'File Name',
    },
    'order-detail': {
      title: 'Detection Result',
      'header-description':
        'Check for watermark codes in uploaded file to detect leaks and ensure content integrity.',
      'order-title': 'Order No %{orderNo}',
      'order-number': 'Order Number',
      'request-date': 'Requested Date',
      status: 'Status',
      'requested-file': 'Uploaded File',
      inqueue: 'IN QUEUE',
      inprogress: 'IN PROGRESS',
      completed: 'COMPLETED',
      detected: 'DETECTED',
      undetected: 'UNDETECTED',
      failed: 'FAILED',
      'auto-detection': 'Auto',
      'expert-detection': 'Expert',
      'detection-result': 'Detection Result',
      'content-type': 'Content Type',
      'file-format': 'File Format',
      'reference-order-no': 'Reference Order No',
      'watermark-code': 'Watermark Code',
      'watermarked-date': 'Watermarked Date',
      'share-history': 'Shared history',
      description: 'File Identifier',
      'no-share': 'No sharing history available yet.',
      'no-description': 'No information available.',
      'failed-popup-title':
        'This file does not support automatic Digital Watermark Detection.',
      'failed-popup-description':
        '<strong>Automatic detection</strong> requires a watermarked file or a file directly downloaded with the leaked content. Please request <strong>expert detection</strong> for leaked files that have been captured or recorded with a camera or screen capture.',
      'failed-request-btn': 'Request Expert Detection',
      'view-faqs': 'View FAQs',
      'no-file-or-link-available': 'No file or link available!',
      'failed-to-detect': 'Failed to detect.',
      detecting: 'Detecting',
      'requirement-title':
        'Check the minimum requirement to detect watermark from the leaked file.',
      'failed-to-request-expert':
        'Invalid. Cannot request expert detection for the selected order.',
      'failed-due-to-server':
        'Watermark detection failed due to a server error. please try again.',
      message: {
        'inprogress-des-1': 'In Progress',
        'inprogress-des-2': 'Please wait a few minutes until done',
        'undetected-des-1': 'Watermark Code Not Detected',
        'undetected-des-2':
          'Uploaded file may not contain a watermark code or may not be detectable.',
        'undetected-des-3':
          'Please contact our <0>Help Center</0> for assistance.',
      },
    },
  },
  'find-order-number': {
    title: 'Select Original File',
    filter: 'Filters',
    reset: 'Reset all',
    'select-order-number': 'Order Selected',
    'not-select': 'Not selected -- --',
    'btn-cancel': 'Cancel',
    'btn-apply': 'Select',
    'btn-select': 'Select',
    'select-image-title':
      'Please select the original file of the leaked content from the list.',
    'no-image': 'Please select an image.',
    'no-audio': 'Please select an audio.',
    'no-document': 'You can check the PDF page.',
    'selected-alert':
      'Selected the watermarking order number for the leaked content.',
    'not-selected-alert':
      'Please select the watermarking order number of your leaked content.',
    'failed-retrieve': 'Failed to retrieve the selected file.',
    'download-file': 'Please <0>download</0> the file to check it out.',
    result: 'Result %{total}',
    'preview-alert': {
      DOCUMENT: 'This is a 5-page preview of your file.',
    },
    'click-to-preview': 'Click to preview',
    'no-results': 'No data',
    'no-results-des':
      'No original file has been uploaded, or all files may have already been deleted',
  },
  'submit-order': {
    title: 'Order Submitted',
    'order-no': 'Order No',
    submitted: 'Submitted',
    status: {
      'in-queue': 'IN QUEUE',
      'in-progress': 'IN PROGRESS',
      completed: 'COMPLETED',
      detected: 'DETECTED',
      undetected: 'UNDETECTED',
      failed: 'FAILED',
    },
    table: {
      'order-no': 'Watermarking Order No',
      title: 'Title',
      'file-name': 'Name',
      status: 'Status',
      'content-type': 'Content Type',
      requestor: 'Requestor',
      'request-date': 'Requested Date',
      'in-progress': 'IN PROGRESS',
      image: 'IMAGE',
      video: 'VIDEO',
      audio: 'AUDIO',
    },
    'view-order-list': 'View Order List',
  },
  'privacy-model-view-order': {
    list: {
      title: 'Please choose the original content for watermark detection',
    },
    table: {
      'thumbnail-image': 'Original File',
      'order-no': 'Order No',
      'content-type': 'Content Type',
    },
  },
};

export default piracyDetection;
