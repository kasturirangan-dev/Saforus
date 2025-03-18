import { SettingsIcon } from './settings';
import { DashboardIcon } from './dashboard';
import { Video } from './videos';
import { Bits } from './bits';
import { UserSecurity } from './user-security';
import { TermOfServiceIcon } from './term-service';
import { QuestionIcon } from './question';
import { SaforusFav } from './saforus-fav';
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
        <SettingsIcon color={color} />
        <Video color={color} />
        <Bits color={color} />
        <UserSecurity color={color} />
        <TermOfServiceIcon />
        <QuestionIcon color={color} />
        <SaforusFav />
      </defs>
    </svg>
  );
};

export default SideMenuIcons;
