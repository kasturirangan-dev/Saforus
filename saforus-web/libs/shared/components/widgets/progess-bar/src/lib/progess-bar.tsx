import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface CustomLinearProgressProps extends LinearProgressProps {
  startLabel?: string;
  endLabel?: string;
  notionlabel?: string;
}

export default function ProgressBar(
  props: CustomLinearProgressProps & { value: number }
) {
  const { value } = props;
  const newValue = value ? (value > 100 ? 100 : value) : 0;
  const newProps = { ...props, value: newValue };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ minWidth: 35, fontSize: '14px', fontWeight: '500' }}>
        <Typography variant="body2" color="text.secondary">
          {props.startLabel}
        </Typography>
      </Box>
      <Box sx={{ width: '100%', mr: 1, position: 'relative' }}>
        <LinearProgress
          variant="determinate"
          {...newProps}
          sx={{ height: '8px', borderRadius: '5px' }}
        />

        <Box
          sx={{
            minWidth: 50,
            fontSize: '14px',
            fontWeight: '500',
            position: 'absolute',
            left: `calc(${newValue}% - 25px)`,
            top: '10px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {props.notionlabel}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ minWidth: 35, fontSize: '14px', fontWeight: '500' }}>
        <Typography variant="body2" color="text.secondary">
          {props.endLabel}
        </Typography>
      </Box>
    </Box>
  );
}
