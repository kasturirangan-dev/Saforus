import { SettingsIcon } from './settings';
import { DashboardIcon } from './dashboard';
import { QuestionIcon } from './question';
import { UserSecurityIcon } from './user-security';

const SideMenuIcons = ({ color = 'var(--base-white)' }) => {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <DashboardIcon color={color} />
        <UserSecurityIcon color={color} />
        <SettingsIcon color={color} />
        <QuestionIcon color={color} />
      </defs>
    </svg>
  );
};

export default SideMenuIcons;
