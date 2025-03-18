import { PureComponent } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const sampleData = [
  {
    statDate: '2023/10/10',
    totalUserCount: 590,
    newUserCount: 200,
  },
  {
    statDate: '2023/10/11',
    totalUserCount: 868,
    newUserCount: 100,
  },
  {
    statDate: '2023/10/12',
    totalUserCount: 1397,
    newUserCount: 550,
  },
  {
    statDate: '2023/10/13',
    totalUserCount: 1480,
    newUserCount: 340,
  },
  {
    statDate: '2023/10/14',
    totalUserCount: 1520,
    newUserCount: 410,
  },
  {
    statDate: '2023/10/15',
    totalUserCount: 1600,
    newUserCount: 170,
  },
  {
    statDate: '2023/10/16',
    totalUserCount: 1620,
    newUserCount: 220,
  },
  {
    statDate: '2023/10/17',
    totalUserCount: 1700,
    newUserCount: 221,
  },
];

interface LineBarChartCardProps {
  data: Array<any>;
}

const LineBarChartCard: React.FC<LineBarChartCardProps> = ({ data }) => {
  const renderCustomizedLegendText = (value: string) => {
    return (
      <span style={{ color: 'var(--gray-700)', fontSize: 14 }}>{value}</span>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        title="LineBarChartCard"
        width={500}
        height={500}
        data={data}
        margin={{
          top: 10,
          right: 10,
          bottom: 30,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="statDate"
          height={50}
          angle={-30}
          textAnchor="end"
          fontSize={13}
          fontWeight={500}
        />
        <YAxis fontSize={13} fontWeight={500} />
        <Tooltip contentStyle={{ fontSize: 13 }} />
        <Legend
          verticalAlign="top"
          height={36}
          formatter={renderCustomizedLegendText}
        />

        <Bar
          dataKey="newUserCount"
          barSize={20}
          name="New users"
          fill="var(--blue-600)"
        />
        <Line
          type="linear"
          dataKey="totalUserCount"
          name="Total of users"
          stroke="var(--red-600)"
          fill="var(--red-600)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default LineBarChartCard;
