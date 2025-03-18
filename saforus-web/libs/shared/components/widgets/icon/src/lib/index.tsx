import { CSSProperties } from 'react';
import Icons from '../asset/icons.svg';

export interface IconProps {
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
   * Color of the icon
   *
   */
  color?: string | undefined;
  fillColor?: string | undefined;

  /**
   * Style of the icon
   *
   */
  iconStyle?: CSSProperties | undefined;
}

const Icon = ({
  name,
  color = 'var(--base-black)',
  fillColor = 'none',
  size = 24,
  iconStyle,
}: IconProps) => {
  return (
    <svg
      style={iconStyle}
      width={size}
      height={size}
      stroke={color}
      fill={fillColor}
    >
      <use href={`${Icons}#${name}`} />
    </svg>
  );
};

export default Icon;
