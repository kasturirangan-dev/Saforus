import { Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import MessageSvg from './assests/message';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
interface BarChartCardProps {
  chartData: any;
  dataKey: string;
}

const BarChartCard = ({ chartData, dataKey }: BarChartCardProps) => {
  const { t } = useTranslation();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  function compareLength(min: number, max: number) {
    // Convert the numbers to strings
    const minStr = min.toString();
    const maxStr = max.toString();
    const result =
      minStr.length > maxStr.length ? minStr.length : maxStr.length;
    // Compare the lengths of the strings and return the number with the longer string
    // the yAxis will have 0.25, 0.75 so return 3 to make it show properly
    return max < 2 ? 3 : result;
  }

  const [barGraphData, setBarGraphData] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    value: [1, 2],
    payload: {},
    background: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    tooltipPayload: [],
    tooltipPosition: {
      x: 0,
      y: 0,
    },
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={chartData}>
        <CartesianGrid />
        <XAxis dataKey={dataKey} axisLine={false} tickLine={false} />
        <YAxis
          axisLine={false}
          tickLine={false}
          domain={([dataMin, dataMax]) => {
            setMin(dataMin);
            const max =
              dataMax > 10 ? dataMax + Math.floor(dataMax / 10) : dataMax + 1;
            setMax(max);
            return [dataMin, max];
          }}
          width={compareLength(min, max) * 12}
        />
        <Tooltip
          position={{
            x: barGraphData.x + barGraphData.width / 2 - 46 / 2,
            y: barGraphData.tooltipPosition.y - 42,
          }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const value = payload[0]?.value;
              return (
                <Box
                  sx={{
                    fontSize: '14px',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <MessageSvg width={value ? value?.toString.length : 0} />
                  </Box>
                  <Box
                    component="span"
                    sx={{ position: 'absolute', top: '10px' }}
                  >
                    {value}
                  </Box>
                </Box>
              );
            }
          }}
          shared={false}
          cursor={false}
        />
        <Bar
          barSize={60}
          dataKey="wtrImageCount"
          name={`${t('dashboard.service-usage.usage-by-period.image')}`}
          stackId="a"
          fill="#736CFB"
          onMouseOver={(data) => {
            setBarGraphData(data);
          }}
        />
        <Bar
          barSize={60}
          dataKey="wtrVideoCount"
          name={`${t('dashboard.service-usage.usage-by-period.video')}`}
          stackId="a"
          fill="#FFC772"
          onMouseOver={(data) => {
            setBarGraphData(data);
          }}
        />
        <Bar
          barSize={60}
          dataKey="wtrAudioCount"
          name={`${t('dashboard.service-usage.usage-by-period.audio')}`}
          stackId="a"
          fill="#70BAFF"
          onMouseOver={(data) => {
            setBarGraphData(data);
          }}
        />
        <Bar
          barSize={60}
          dataKey="pdCount"
          name={`${t(
            'dashboard.service-usage.usage-by-period.piracy-detection'
          )}`}
          stackId="a"
          fill="#7FD184"
          onMouseOver={(data) => {
            setBarGraphData(data);
          }}
        />

        <Legend align="left" type="rect" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartCard;
