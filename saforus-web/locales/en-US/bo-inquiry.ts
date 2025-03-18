const boInquiry = {
  search: {
    pageTitle: 'Search Inquiries',
    title: 'Inquiry list',
    category: 'Category',
    status: 'Status',
    replier: 'Replier',
    dates: 'Inquired Date',
    createForm: 'Create a Inquiry Form',
    button: 'Search',
  },
  table: {
    email: 'Email',
    category: 'Category',
    title: 'Title',
    status: 'Status',
    replier: 'Replier',
    date: 'Date',
    total: '%{row} out of %{total}',
  },
  detail: {
    status: {
      answered: 'Answered',
      in_progress: 'In Progress',
      in_queue: 'In Queue',
      canceled: 'Canceled',
    },
    'category-list': {
      use_of_service: 'Use of Service',
      service_and_technology: 'Service technology',
      service_bug_or_error_report: 'Service bug or error report',
      subscription_plan_and_payment: 'Service plan & payment',
      team_and_account: 'Team and account',
      others: 'Others',
    },
    reply: {
      'save': 'Save',
      'publish': 'Publish',
      'create-successful': 'Your inquiry has been answered..',
      'create-failed-max-file': 'You can attach only one file.',
      'create-failed-max-file-size':
        'Your uploaded file size should not exceed 30MB. Please try again.',
    },
  },
};

export default boInquiry;
