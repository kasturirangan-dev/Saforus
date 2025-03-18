const apiDetection = {
  create: {
    title: 'Detect Watermark',
    description:
      'You can track down the leaker by analyzing the watermark code from the leaked file.',
    'drop-file-text': 'Upload your file for detection',
    'browse-file-text': 'Drag or <0>Browse</0> a file from your computer.',
    'request-detection': 'Request Detection',
    loading: 'Submitting your order...',
    success: 'Submitted',
    failed: 'Something went wrong.',
    errorCode: 'Error Code: %{code}',
    'try-again': 'Please try again!',
  },
  'order-detail': {
    title: 'Detection order',
    description:
      'You can track down the leaker by analyzing the watermark code from the leaked file.',
    'order-file-title': 'Detection order details',
    'order-file-description':
      'You can track down the leaker by analyzing the watermark code from the leaked file.',
    'order-number': 'Order Number',
    'requested-date': 'Requested Date',
    'requested-file': 'Requested File',
    status: 'Status',
    'file-number': 'Requested File Number',
    'process-date': 'Processed Date',
    'detection-result': 'Detection Result',
    'watermark-description': 'Watermark description',
    'created-date': 'Created Date',
    inprogress: 'In Progress',
    'inprogress-des': 'Please wait a few minutes until done',
    undetected: 'Watermark Code Not Detected',
    'retry-des':
      'The file may lack a detectable watermark or the original file no longer exist in our database. Do you want to try again by selecting the original file?',
    'undetected-des':
      'Uploaded file may not contain a watermark code or may not be detectable.\n Please contact our <0>Help Center</0> for assistance.',
    'retry-detection': 'Retry Detection',
  },
};

export default apiDetection;
