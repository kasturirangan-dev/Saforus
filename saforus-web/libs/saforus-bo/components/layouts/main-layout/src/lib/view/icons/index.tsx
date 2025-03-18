import { SettingsIcon } from './settings';
import { DashboardIcon } from './dashboard';
import { SubArrow } from './sub-arrow';
import { CustomerSupport } from './customer-support';
import { TermOfServiceIcon } from './term-service';
import { SubArrowPurple } from './sub-arrow-purple';
import { ServiceConfigurationIcon } from './service-configuration';
import { OrderManagementIcon } from './order-management';
import { UserManagementIcon } from './user-management';
import { WrenchIcon } from './wrench-black';

const SideMenuIcons = () => {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <DashboardIcon />
        <SettingsIcon />
        <SubArrow />
        <SubArrowPurple />
        <CustomerSupport />
        <TermOfServiceIcon />
        <WrenchIcon />
        <ServiceConfigurationIcon />
        <OrderManagementIcon />
        <UserManagementIcon />
      </defs>
    </svg>
  );
};

export default SideMenuIcons;
