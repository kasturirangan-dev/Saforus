const adminDashboard = {
  title: 'Dashboard',
  filters: {
    date: 'Date',
  },
  status: {
    invited: 'Invited',
    active: 'Active',
    suspended: 'Suspended',
    locked: 'Locked',
    hidden: 'Hidden',
    published: 'Published',
  },
  'user-role': {
    owner: 'Master',
    member: 'Member',
    viewer: 'Viewer',
    user: 'User',
  },
  'see-more': 'See More',
  summary: {
    title: 'Summary',
    users: 'Users',
    wtr: 'Watermarking',
    pd: 'Privacy Detection',
    notice: 'Notice & Events',
    total: 'Total Count',
  },
  'user-overview': {
    title: 'Recently Added Users',
    email: 'Email',
    name: 'Name',
    type: 'Type',
    'team-name': 'Team Name',
    subscription: 'Subscription',
    status: 'Status',
    joined: 'Joined',
  },
  'user-trend': {
    title: 'User Trends',
    description: 'New Users in %{current} compared to %{previous}',
  },
};

export default adminDashboard;
