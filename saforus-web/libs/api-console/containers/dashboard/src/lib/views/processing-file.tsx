import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { PieChart, Pie, ResponsiveContainer, Cell, Label } from 'recharts';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { ApiDashboardStore } from '@web-workspace/api-console/components/dashboard/data';
import { useTranslation } from 'react-i18next';
import {
  StyledTab,
  StyledTable,
  StyledTabs,
  UsageContainer,
} from './styled-elements';
import dataIcon from '../assets/stats.svg';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';

const initialData = [
  { name: 'image', value: 0, color: '#14b8a6' },
  // { name: 'audio', value: 0, color: '#3B82F6' },
  // { name: 'video', value: 0, color: '#F59E0B' },
  { name: 'document', value: 0, color: '#FACC15' },
];

const PieChartL = ({ data }) => {
  return (
    <ResponsiveContainer>
      <PieChart width={800} height={800}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          <Label
            value="100%"
            position="center"
            fill="#000"
            style={{ fontSize: '24px', fontWeight: 'bold' }}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

function ProcessingFile({ loading = false }: { loading?: boolean }) {
  const { t } = useTranslation();
  const { watermarkingUsage, detectionUsage } = useSnapshot(ApiDashboardStore);
  const [data, setData] = useState(initialData);
  const [total, setTotal] = useState(1);
  const [value, setValue] = useState('ALL');

  useEffect(() => {
    let updatedData = [];

    if (value === 'WATERMARKING') {
      updatedData = initialData.map((item) => ({
        ...item,
        value: watermarkingUsage?.data?.[item.name]?.total || 0,
      }));
    } else if (value === 'DETECTION') {
      updatedData = initialData.map((item) => ({
        ...item,
        value: detectionUsage?.data?.[item.name]?.total || 0,
      }));
    } else {
      updatedData = initialData.map((item) => ({
        ...item,
        value:
          (watermarkingUsage?.data?.[item.name]?.total || 0) +
          (detectionUsage?.data?.[item.name]?.total || 0),
      }));
    }

    setData(updatedData);
    const total = updatedData.reduce((acc, cur) => acc + cur.value, 0);
    setTotal(total);
  }, [value, watermarkingUsage, detectionUsage]);

  const tabData = [
    { label: t('apiDashboard.usageStatistics.all'), value: 'ALL' },
    {
      label: t('apiDashboard.usageStatistics.watermark'),
      value: 'WATERMARKING',
    },
    { label: t('apiDashboard.usageStatistics.detection'), value: 'DETECTION' },
  ];

  const handleChange = (event: any, newValue) => {
    setValue(newValue);
  };

  const hasData = !(total === 0 && value === 'ALL' && !loading);

  return (
    <UsageContainer>
      {hasData ? (
        <Box
          sx={{
            backgroundColor: 'var(--base-white)',
            padding: '12px 20px 20px 20px',
            borderRadius: '8px',
            minWidth: '400px',
            minHeight: '254px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
          }}
        >
          <LoadingOverLayer loading={loading} />

          <StyledTabs value={value} onChange={handleChange}>
            {tabData.map((tab) => (
              <StyledTab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </StyledTabs>

          <Box
            display="flex"
            alignItems="center"
            gap="20px"
            height={'100%'}
            flexDirection={'column'}
          >
            <Box width="180px" height="180px" flexShrink={0}>
              <PieChartL data={data} />
            </Box>
            <TableContainer>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <TableCell width={10}></TableCell>

                    <TableCell width={170}>
                      {t('apiDashboard.usageStatistics.type')}
                    </TableCell>
                    <TableCell width={50} align="center">
                      {t('apiDashboard.usageStatistics.value')}
                    </TableCell>
                    <TableCell width={50} align="right">
                      %
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Box
                          component="span"
                          sx={{
                            display: 'inline-block',
                            width: 12,
                            height: 12,
                            backgroundColor: entry.color,
                            borderRadius: '50%',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {t(`common.content-type.${entry.name}`)}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }} align="center">
                        {entry.value}
                      </TableCell>
                      <TableCell align="right">
                        {total ? ((entry.value / total) * 100).toFixed(0) : 0}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </TableContainer>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            padding: '12px 20px 20px 20px',
            borderRadius: '8px',
            minWidth: '400px',
            minHeight: '254px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              padding: '20px',
              borderRadius: '50%',
              background: 'var(--neutral-600)',
            }}
          >
            <img src={dataIcon} alt="data icon" height={24} width={24} />
          </Box>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            color="var(--gray-700)"
          >
            {t('apiDashboard.usage-overview.no-data')}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={500}
            color="var(--gray-700)"
            whiteSpace={'pre-line'}
          >
            {t('apiDashboard.usage-overview.no-data-des')}
          </Typography>
        </Box>
      )}
    </UsageContainer>
  );
}

export default ProcessingFile;
