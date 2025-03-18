import MuiIconButton from '@mui/material/IconButton';
import React from 'react';
import InlineSvg, { InlineSvgProps } from './inline-svg';

interface IconButtonProps extends InlineSvgProps {
  [key: string]: any;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  ...props
}: IconButtonProps) => {
  return (
    <MuiIconButton edge="start" color="inherit">
      <InlineSvg {...props}>{children}</InlineSvg>
    </MuiIconButton>
  );
};

export default React.memo(IconButton);
