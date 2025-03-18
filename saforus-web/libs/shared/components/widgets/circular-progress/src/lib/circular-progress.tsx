import MuiCircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

interface CustomProgressProps extends CircularProgressProps {
  reqDate?: string | number | Date;
  esCompletedTime?: string | number | Date;
}

export const maxDisplayProgress = 95;
export function CircularProgress({
  reqDate,
  esCompletedTime,
  ...props
}: CustomProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timerId: NodeJS.Timer;
    if (reqDate && esCompletedTime) {
      const requestTime = new Date(reqDate).getTime();
      const esTime = new Date(esCompletedTime).getTime();
      timerId = setInterval(() => {
        const now = +new Date();
        const progress = Math.min(
          ((now - requestTime) / (esTime - requestTime)) * 100,
          maxDisplayProgress
        );
        setProgress(progress);
        if (now > esTime) {
          clearInterval(timerId);
        }
      }, 100);
    } else {
      setProgress(0);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [reqDate, esCompletedTime]);

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <MuiCircularProgress
        variant="determinate"
        sx={{
          color: 'var(--purple-600)',
          opacity: 0.2,
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <MuiCircularProgress
        variant="determinate"
        disableShrink
        sx={{
          color: 'var(--purple-600)',
          position: 'absolute',
          left: 0,
        }}
        size={40}
        thickness={4}
        value={progress}
        {...props}
      />
    </Box>
  );
}

export default CircularProgress;
