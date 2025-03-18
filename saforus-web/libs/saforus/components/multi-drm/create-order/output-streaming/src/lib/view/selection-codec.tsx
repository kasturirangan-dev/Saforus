import {
  Box,
  Grid,
  Typography,
  FormControl,
  SelectChangeEvent,
  Select,
  MenuItem,
} from '@mui/material';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { DrmOutputStream } from '@web-workspace/saforus/components/multi-drm/create-order/data';
import { useEffect } from 'react';
import { isNotEmpty } from '@web-workspace/shared/helpers/strings';

export interface CodecViewProps {
  name: keyof DrmOutputStream;
  title: string;
  items: string[];
  control: Control<DrmOutputStream>;
  disabled?: boolean;
}

const SelectionCodec = ({
  name,
  title,
  items,
  control,
  disabled,
}: CodecViewProps) => {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<DrmOutputStream>();

  let defaultValue = watch(name) as string;

  useEffect(() => {
    if (!isNotEmpty(defaultValue) && items?.length > 0) {
      defaultValue = items[0] as string;
      setValue(name, defaultValue);
    }
  }, [items]);

  const onSelectedChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    const oldValue = watch(name);
    if (oldValue === value) return;
    setValue(name, value);
  };

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
            <FormControl>
              <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                  <Select
                    fullWidth
                    disabled={disabled}
                    value={defaultValue}
                    labelId={name}
                    sx={{ width: '10vw', height: 40 }}
                    onChange={onSelectedChange}
                  >
                    {items?.length > 0 &&
                      items?.map((el, index) => (
                        <MenuItem
                          key={index}
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          value={el}
                        >
                          {el}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SelectionCodec;
