import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';
import Icon from '@web-workspace/shared/components/widgets/icon';
import Tooltip from '@web-workspace/shared/components/widgets/tooltip';
import { Control, Controller } from 'react-hook-form';
import { DrmOutputStream } from '@web-workspace/saforus/components/multi-drm/create-order/data';

export interface FileFormatViewProps {
  name: keyof DrmOutputStream;
  title: string;
  streamFormats: string[];
  defaultValue?: string;
  tooltipTitle: string;
  tooltipContent: string;
  control: Control<DrmOutputStream>;
}

const FileFormatView = ({
  name,
  title,
  streamFormats,
  tooltipTitle,
  tooltipContent,
  control,
}: FileFormatViewProps) => {
  return (
    <Grid container columns={5}>
      <Grid
        item
        xs={1.5}
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          backgroundColor: 'var(--neutral-600)',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          flexDirection: 'column',
          border: '1px solid #DAE0E6',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '1rem',
            width: '100%',
            height: '100%',
          }}
        >
          <Typography
            color={'var(--gray-700)'}
            variant="body2"
            fontWeight={500}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {title}
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={3.5}
        alignItems="center"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'var(--base-white)',
          border: '1px solid #DAE0E6',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '16px 16px 16px 10px',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1.5rem',
            }}
          >
            <Controller
              control={control}
              name={name}
              render={({ field }) => {
                const values = field.value as string[];
                return (
                  <>
                    {streamFormats.map((format) => (
                      <FormControlLabel
                        {...field}
                        control={
                          <Checkbox
                            name={format}
                            disabled={format !== 'DASH'}
                            icon={<Icon name="square_uncheck" size={20} />}
                            checkedIcon={
                              <Icon name="square_checked" size={20} />
                            }
                            onChange={() => {
                              if (!values.includes(format)) {
                                field.onChange([...values, format]);
                                return;
                              }
                              const newValue = values.filter(
                                (topic: any) => topic !== format
                              );
                              field.onChange([...newValue]);
                            }}
                            checked={values.includes(format)}
                          />
                        }
                        key={format}
                        label={format}
                        value={format}
                      />
                    ))}
                  </>
                );
              }}
            />
          </Box>
          <Tooltip
            title={tooltipTitle}
            titleHeader={tooltipTitle}
            description={tooltipContent}
            children={
              <Icon size={20} name="information" color={'var(--gray-25)'} />
            }
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default FileFormatView;
