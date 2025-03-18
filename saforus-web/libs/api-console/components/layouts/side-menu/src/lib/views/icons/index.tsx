import { DashboardIcon } from './dashboard';
import { WatermarkingIcon } from './watermarking';
import { DetectionIcon } from './detection';
import { KeyIcon } from './key';
import { ViewOrderIcon } from './view-order';

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
        <WatermarkingIcon />
        <DetectionIcon />
        <ViewOrderIcon />
        <KeyIcon />
      </defs>
    </svg>
  );
};

export default SideMenuIcons;
