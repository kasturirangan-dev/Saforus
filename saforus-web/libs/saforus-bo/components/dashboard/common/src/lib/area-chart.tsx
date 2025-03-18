import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
} from 'recharts';

interface ChartData {
  name: string;
  value: number;
}
export const AreaChartCard = ({ data }: { data: ChartData[] }) => {
  const CustomActiveDot = (props: any) => {
    const { cx, cy, setActiveDotPos } = props;

    return (
      <svg
        x={cx - 7}
        y={cy - 7}
        width="14"
        height="121"
        viewBox="0 0 14 121"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 12.5001C10.0376 12.5001 12.5 10.0377 12.5 7.00012C12.5 3.96256 10.0376 1.50012 7 1.50012C3.96243 1.50012 1.5 3.96256 1.5 7.00012C1.5 10.0377 3.96243 12.5001 7 12.5001Z"
          fill="white"
          stroke="url(#customCursorColor)"
          stroke-width="3"
        />
        <line
          x1="7"
          y1="12.5"
          x2="7"
          y2="121"
          stroke="url(#customCursorColor)"
          stroke-width="3"
        />
        <defs>
          <linearGradient
            id="customCursorColor"
            x1="7"
            y1="3.00012"
            x2="7"
            y2="121"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#736CFB" />
            <stop offset="1" stop-color="#978FED" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  const CustomTooltip = (props: any) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const value = payload[0]?.value;
      const name = payload[0]?.payload?.['name'];
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '12px 16px',
            borderRadius: '6px',
            backgroundColor: 'var(--base-white)',
            border: '1px solid var(--neutral-500)',
          }}
        >
          <Typography variant="caption" color="var(--neutral-800)">
            {name}
          </Typography>
          <Typography variant="subtitle1" fontWeight={600}>
            {value}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const maxValue = Math.max(...data.map((item) => item.value));
  const maxLength = maxValue.toString().length;
  // the yAxis will have 0.25, 0.75 so return 3 to make it show properly
  const axistLength = maxLength <= 2 ? 32 : maxLength * 10;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={500} height={400} data={data}>
        <defs>
          <linearGradient id="customeColor" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#C7C4FD" />
            <stop offset="1" stopColor="#FEFDFF" />
          </linearGradient>
        </defs>
        {/* <YAxis
          axisLine={false}
          tickLine={false}
          type="number"
          domain={data.length > 1 ? [0, 'auto'] : [0, maxValue * 2]}
          allowDataOverflow={true}
          width={axistLength}
          fontSize={10}
          fontWeight={200}
        /> */}
        <YAxis fontSize={10} fontWeight={200} tickLine={false} width={30} />
        <XAxis dataKey="name" fontSize={10} fontWeight={200} tickLine={false} />

        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Area
          type="monotone"
          dataKey={'value'}
          stroke="#8F89FC"
          strokeWidth={3}
          fill="url(#customeColor)"
          activeDot={<CustomActiveDot />}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
