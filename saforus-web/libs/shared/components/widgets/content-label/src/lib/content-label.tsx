import { Typography, TypographyProps } from '@mui/material';

export interface ContentLabelProps extends TypographyProps {
  label: string;
  style?: React.CSSProperties;
  supported?: boolean;
  neutral?: boolean;
}

const ContentLabel = (props: ContentLabelProps) => {
  const { label, supported, neutral, ...otherProps } = props;
  return (
    <Typography
      variant="body2"
      fontWeight={500}
      sx={{
        textTransform: 'uppercase',
        padding: '4px 12px',
        color: neutral
          ? 'var(--gray-700)'
          : supported
          ? 'var(--green-700)'
          : 'var(--gray-25)',
        backgroundColor: neutral
          ? 'var(--neutral-300)'
          : supported
          ? 'var(--green-50)'
          : 'var(--neutral-300)',
        borderRadius: '5px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      {...otherProps}
    >
      {label}
    </Typography>
  );
};

export default ContentLabel;
