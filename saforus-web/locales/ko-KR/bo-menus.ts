// add korean text when it available
const boSidemenu = {
  'admin-dashboard': 'Admin Dashboard',
  'forensic-watermarking': 'Forensic Watermarking',
  'piracy-detection': 'Piracy Detection',
  'search-orders': 'Search Orders',
  'order-management': 'Order Management',
  'service-management': 'Service Management',
  'notification-management': 'Notice List',
  'watermarking-orders': 'Watermarking Orders',
  'piracy-detection-requests': 'Piracy Detection Requests',
  'user-management': 'User Management',
  'search-users': 'Search Users',
  'search-team-and-members': 'Search Team & Members',
  'customer-support': 'Customer Support',
  'search-inquiries': 'Search 1:1 Inquiries',
  'service-configuration': 'Service Configuration',
  inquiry: '1:1 Inquiry',
  'service-plan-manager': 'Service Plan Manager',
  settings: 'Settings',
  'admin-user-management': 'Admin User Management',
};

const boGnbmenu = {
  'user-info': 'My Account',
  'team-members': 'Team & Members',
  'service-plan': 'Service Plan & Billing',
  'service-billing': 'Service Plan & Billing',
  'customer-support': 'Customer Support',
  'my-inquiries': 'My Inquiries',
  logout: 'Log Out',
  role: {
    'super-admin': 'Super Admin',
    'admin-cs': 'Admin CS',
    admin: 'Admin',
  },
  tooltip: {
    'super-admin': {
      content1: 'Can add new Admin users to Back Office.',
      content2: `Can grant and withdraw 'super admin' permission to the admin users in Back Office.`,
      content3: 'Has all permission of Admin & Admin CS.',
    },
    'admin-cs': {
      content1: 'Can access ‘Customer Support’ in Back Office.',
      content2: 'Has the same permission to Admin.',
    },
    admin: {
      content1: 'Can not access ‘Customer Support’.',
      content2: 'Can not add/delete Admin users.',
      content3: 'Can manage SaForus Web user information such as searching users, updating their information.',
      content4: 'Can monitor the order status created by the users.',
    },
  },
};

export { boSidemenu, boGnbmenu };
