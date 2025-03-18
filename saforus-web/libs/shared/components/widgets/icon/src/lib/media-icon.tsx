import { CSSProperties } from 'react';
import Icons from '../asset/media-icons.svg';

export interface MediaIconProps {
  /**
   * Size of the icon, can also be passed as fontSize in the style object.
   *
   * @default 24
   */
  size?: number | string | undefined;

  /**
   * Name of the icon to show
   *
   */
  name: string;

  /**
   * Style of the icon
   *
   */
  iconStyle?: CSSProperties | undefined;
}

const MediaIcon = ({ name, size = 24, iconStyle }: MediaIconProps) => {
  return (
    <svg style={iconStyle} width={size} height={size} fill="none">
      <use href={`${Icons}#${name}`} />
    </svg>
  );
};

export default MediaIcon;
