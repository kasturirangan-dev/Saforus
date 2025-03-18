const apiOrderList = {
  title: 'Order List',
  search: {
    title: 'Filters',
    reset: 'Reset all',
    'order-type': 'Order Type',
    format: 'File Format',
    'request-date': 'Requested Date',
    status: 'Status',
    keyword: 'Keyword',
    'keyword-placeholder': 'Order number or file name',
    search: 'Search',
    channel: 'Requested channel',
  },
  table: {
    WTR: 'Watermarking',
    PD: 'Detection',
    'order-type': 'Order Type',
    'order-no': 'Order Number',
    status: 'Status',
    'request-date': 'Requested Date',
    'original-file': 'Original File',
    'no-results': 'No results found',
    'no-results-des-1': 'Try adjusting your search or filters.',
    'no-results-des-2':
      'You can also use <0>Insert Watermark</0> or <1>Detect Watermark</1> to create a new order.',
    total: 'Total',
    'expired-tooltip': 'Expired order, you can not view the detail',
  },
  delete: {
    'wtr-title': 'Delete Watermarking Order',
    'wtr-description':
      'Deleting this order will disable watermark detection requests for it. All associated files and data will be permanently deleted and cannot be recovered. Are you sure you want to proceed?',
    'pd-title': 'Delete Detection Order',
    'pd-description':
      'Deleting this order will permanently remove all associated files and data. This action cannot be undone. Are you sure you want to proceed?',
    success: ' The order %{orderName} has been deleted.',
    'btn-cancel': 'Cancel',
    'btn-delete': 'Delete',
  },
};

export default apiOrderList;
