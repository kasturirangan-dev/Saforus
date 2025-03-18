import React, { SVGProps } from 'react';

export interface InlineSvgProps extends SVGProps<SVGSVGElement> {
  cssClass?: string;
  focusable?: boolean;
  ariaLabel?: string;
  ariaHidden?: boolean;
  viewBox?: string;
}

const InlineSvg: React.FC<InlineSvgProps> = ({
  cssClass,
  focusable = true,
  ariaLabel,
  ariaHidden = false,
  viewBox = '0 0 32 32',
  children,
  ...otherProps
}) => {
  return (
    <svg
      {...otherProps}
      className={cssClass}
      focusable={focusable ? 'true' : 'false'}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

export default React.memo(InlineSvg);
