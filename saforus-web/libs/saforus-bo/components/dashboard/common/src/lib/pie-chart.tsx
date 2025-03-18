import React, { PureComponent, useCallback } from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Sector,
} from 'recharts';

interface PieData {
  name: string;
  value: number;
  // color of chart
  color?: string;
}
interface PieChartProps {
  chartData: PieData[];
  // Pie radius
  radius?: number;
  // Spacing between label and pie center
  xLabelSpacing?: number;
  // Spacing to the top of the chart
  topLabelSpacing?: number;
}

// Base colors for chart
const COLORS = ['#437ef7', '#e2341d', '#FFBB28', '#41ae49'];

const PieChartCard = ({
  chartData,
  radius = 100,
  xLabelSpacing = 220,
  topLabelSpacing = 20,
}: PieChartProps) => {
  const RADIAN = Math.PI / 180;
  // Spacing between labels
  const yLabelSpacing = 40;

  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, outerRadius, fill, percent, value, name, index } =
      props;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);

    const isLeftSide = cos >= 0;
    const isTop = sin <= 0;
    const textAnchor = cos >= 0 ? 'end' : 'start';

    const topCirclePart = isTop ? topLabelSpacing : cy;
    // Position of label
    const yPosition = isLeftSide
      ? topCirclePart + index * yLabelSpacing
      : topCirclePart + (chartData?.length - index - 1) * yLabelSpacing;
    const xPosition = cx + (isLeftSide ? 1 : -1) * Math.min(cx, xLabelSpacing);
    // First pint of of label linel, start from middle of circular arc
    const sx = cx + (outerRadius - 10) * cos;
    const sy = cy + (outerRadius - 10) * sin;
    // Second point lin label line
    const mx = cx + (outerRadius + 20) * cos;
    const my = yPosition;
    //const my = cy + (outerRadius + 20) * sin;

    return (
      <g>
        <path
          d={`M${sx},${sy}L${mx},${my}L${xPosition},${yPosition}`}
          stroke={fill}
          fill="none"
        />
        <text
          x={xPosition}
          y={yPosition - 6}
          fontSize={15}
          fontWeight={500}
          textAnchor={textAnchor}
          fill={fill}
        >
          {`${name} `}
        </text>
        <text
          x={xPosition}
          y={yPosition + 12}
          fontSize={13}
          textAnchor={textAnchor}
          fill={'#5f6d7e'}
        >
          {`${(percent * 100).toFixed(1)}% `}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={chartData}
          cx={'50%'}
          cy={'50%'}
          outerRadius={radius}
          startAngle={90}
          endAngle={-270}
          fill="#8884d8"
          label={renderCustomizedLabel}
          labelLine={false}
          isAnimationActive={false}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color || COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartCard;
