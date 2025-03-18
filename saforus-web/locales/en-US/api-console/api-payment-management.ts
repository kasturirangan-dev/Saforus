const apiPaymentManagement = {
  title: 'Payment Management',
  description:
    'Easily manage your payment methods and view your complete payment history in one place.',
  paymentMethod: 'Payment Method',
  paymentHistory: 'Payment History',
  addCard: 'Add New Card',
  default: 'Default',
  setDefault: 'Set default',
  delete: 'Delete',
  MONTHLY: 'Monthly',
  YEARLY: 'Yearly',
  table: {
    date: 'Date',
    paymentMethod: 'Payment Method',
    status: 'Status',
    plan: 'Plan',
    billingCycle: 'Billing Cycle',
    amount: 'Amount',
    invoice: 'Invoice',
    'no-list-title': 'No Payment History Yet',
    'no-list-description':
      'Your transactions will appear here once you make a payment.',
  },
  status: {
    success: 'Success',
    failed: 'Failed',
  },
  msg: {
    'card-added': 'Your card added successfully!',
    'card-added-failed': 'Failed to add your card. Please try again!',
    'card-remove': 'Your card removed successfully!',
    'card-remove-failed': 'Failed to remove your card. Please try again!',
    'card-default-remove':
      'This card is set as the default for your current subscription. Please set a different card as the default before deleting this one.',
    'card-active-remove':
      'You cannot remove the default card as it is still in use for the current billing cycle. Please wait until the cycle ends.',
  },
  removeDialog: {
    title: 'Remove Card',
    description: `Are you sure you want to remove this card (%{card}) from your payment methods? This action cannot be undone.`,
    remove: 'Remove',
    cancel: 'Cancel',
  },
};

export { apiPaymentManagement };
