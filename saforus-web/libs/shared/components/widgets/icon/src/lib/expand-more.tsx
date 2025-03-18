import { styled } from '@mui/material/styles';
import Icon, { IconProps } from './index';
import Box, { BoxProps } from '@mui/material/Box';

interface ExpandMoreProps extends BoxProps {
  expand: boolean;
  iconProps?: Partial<IconProps>;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, iconProps, children, ...other } = props;

  return (
    <Box {...other}>
      {children || <Icon name="chevron_down" size={16} {...iconProps} />}
    </Box>
  );
})(({ theme }) => ({
  display: 'inline-flex',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => Boolean(expand),
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default ExpandMore;
