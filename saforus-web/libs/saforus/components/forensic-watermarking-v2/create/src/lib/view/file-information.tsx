import { createRef, useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  styled,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '@mui/material';
import { WatermarkingCreateOrder } from '../data/utils';
import { useTranslation } from 'react-i18next';
import {
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import {
  WatermarkCode,
  generateWtrCode,
} from '@web-workspace/saforus/components/forensic-watermarking-v2/data';
import Input from '@web-workspace/shared/components/widgets/input';
import removeFile from '../assets/remove-file.svg';
import addFile from '../assets/add-file.svg';
import { randomId } from '@web-workspace/shared/helpers/strings';
import { StepTitle } from '@web-workspace/saforus/components/forensic-watermarking-v2/common';
import CloseIcon from '@mui/icons-material/Close';
import Icon from '@web-workspace/shared/components/widgets/icon';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '8px',
  border: '1px solid var(--neutral-500)',
}));

const StyledTable = styled(Table)(({ theme }) => ({
  backgroundColor: 'var(--base-white)',
  borderStyle: 'hidden',

  '& .MuiTableCell-root': {
    border: '1px solid var(--neutral-400)',
  },

  '& th': {
    backgroundColor: 'var(--neutral-400)',
    padding: '12px 16px',
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '22px',
    letterSpacing: '-0.1px',
    color: 'var(--gray-950)',
  },

  '& td': {
    padding: '8px',
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: '6px',
  backgroundColor: 'var(--neutral-200)',
  borderRadius: '4px',
  '& svg': {
    fill: 'var(--gray-25)',
  },
  '&.MuiIconButton-colorPrimary': {
    '&:hover': {
      backgroundColor: 'var(--purple-50)',
      '& svg': {
        fill: 'var(--purple-500)',
      },
    },
  },
  '&.MuiIconButton-colorError': {
    '&:hover': {
      backgroundColor: 'var(--red-50)',
      '& svg': {
        fill: 'var(--red-500)',
      },
    },
  },
}));

const RowInfo = ({
  watermark,
  updateWatermark,
  removeWatermark,
}: {
  watermark: WatermarkCode;
  updateWatermark: (watermark: WatermarkCode) => void;
  removeWatermark: (watermark: WatermarkCode) => void;
}) => {
  const { t } = useTranslation();

  const updateDescription = (value: string | null) => {
    updateWatermark({ ...watermark, description: value });
  };

  const onRemove = () => {
    removeWatermark(watermark);
  };

  const [editMode, setEditMode] = useState(true);
  const textRef = useRef<HTMLInputElement>(null);

  const onClear = () => {
    if (textRef.current) {
      textRef.current.value = '';
      updateDescription(null);
    }
  };

  return (
    <TableRow>
      <TableCell align="center">
        <Typography
          sx={{
            color: 'var(--purple-600)',
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          {watermark.wtrMsg}
        </Typography>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {editMode ? (
            <Input
              inputRef={textRef}
              autoFocus
              defaultValue={watermark.description}
              placeholder={
                t(
                  'create-watermarking.file-information.placeholder-watermark-code'
                ) as string
              }
              style={{ flex: 1 }}
              inputStyle={{
                backgroundColor: 'var(--neutral-300)',
                border: 'none',
              }}
              onChange={(e) => {
                updateDescription(e.target.value);
              }}
              inputProps={{ maxLength: 20 }}
              showErrorMsg={false}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditMode(false);
                }
              }}
              onBlur={() => setEditMode(false)}
              icon={
                <IconButton
                  sx={{ padding: '4px', marginRight: '-4px' }}
                  onClick={() => onClear()}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <CloseIcon
                    sx={{ fontSize: '16px', color: 'var(--gray-25)' }}
                  />
                </IconButton>
              }
              disabled={watermark.id === 'default'}
            />
          ) : (
            <>
              <Typography color={'var(--gray-700)'} padding="9px 8px" flex={1}>
                {watermark.description ?? '--'}
              </Typography>
              <ActionButton onClick={() => setEditMode(true)} color="primary">
                <Icon
                  name="edit"
                  size={16}
                  fillColor="var(--gray-25)"
                  color="none"
                />
              </ActionButton>
              <ActionButton onClick={onRemove} color="error">
                <Icon
                  name="delete"
                  size={16}
                  fillColor="var(--gray-25)"
                  color="none"
                />
              </ActionButton>
            </>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export interface FileInfoViewProps {
  setValue: UseFormSetValue<WatermarkingCreateOrder>;
  getValues: UseFormGetValues<WatermarkingCreateOrder>;
  watch: UseFormWatch<WatermarkingCreateOrder>;
}

const FileInfo = ({ setValue, getValues, watch }: FileInfoViewProps) => {
  const { t } = useTranslation();
  const filesUploaded = watch('files');
  const isActive = filesUploaded && filesUploaded.length > 0;

  const startNum = watch('startNum') as number;
  const watermarkCodes = watch('watermarkCodes') as WatermarkCode[];

  const addWatermark = () => {
    const items = (getValues('watermarkCodes') || []) as WatermarkCode[];
    const newItem = {
      id: randomId(),
      description: undefined,
    } as WatermarkCode;
    setValue('watermarkCodes', [...items, newItem]);
  };

  const updateWatermark = (watermark: WatermarkCode) => {
    const items = (getValues('watermarkCodes') || []) as WatermarkCode[];
    const updatedItems = items.map((item) =>
      item.id === watermark.id ? { ...item, ...watermark } : item
    );
    setValue('watermarkCodes', updatedItems);
  };

  const removeWatermark = (watermark: WatermarkCode) => {
    const items = (getValues('watermarkCodes') as WatermarkCode[]) || [];
    const updatedItems = items.filter((item) => item.id !== watermark.id);
    if (updatedItems.length === 0) {
      setValue('startNum', generateWtrCode());
      updatedItems.push({ id: randomId() });
    }
    setValue('watermarkCodes', updatedItems);
  };
  useEffect(() => {
    if (!isActive) {
      setValue('watermarkCodes', []);
    } else {
      setValue('startNum', generateWtrCode());
      setValue('watermarkCodes', [{ id: randomId() }]);
    }
  }, [isActive]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <StepTitle
        step={2}
        title={t('create-watermarking.file-information.title')}
        isActive={isActive}
      />
      <StyledTableContainer>
        <StyledTable>
          <TableHead>
            <TableCell width={160} align="center">
              {t('create-watermarking.file-information.watermark-code')}
            </TableCell>
            <TableCell>
              {t('create-watermarking.file-information.description')}
            </TableCell>
          </TableHead>
          <TableBody>
            {isActive ? (
              watermarkCodes?.map((item, index) => (
                <RowInfo
                  key={item.id}
                  watermark={{ ...item, wtrMsg: startNum + index }}
                  updateWatermark={updateWatermark}
                  removeWatermark={removeWatermark}
                />
              ))
            ) : (
              <RowInfo
                key={'default'}
                watermark={{ id: 'default', wtrMsg: '---' }}
                updateWatermark={updateWatermark}
                removeWatermark={removeWatermark}
              />
            )}
            <TableRow>
              {watermarkCodes.length < 10 && (
                <TableCell colSpan={2} align="center">
                  <IconButton
                    onClick={isActive ? addWatermark : null}
                    sx={{ padding: 0 }}
                  >
                    <img
                      src={addFile}
                      alt="addFile"
                      width={32}
                      height={32}
                      loading="lazy"
                    />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </StyledTable>
      </StyledTableContainer>

      <Box
        sx={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            backgroundColor: 'var(--neutral-300)',
            padding: '2px 8px',
            borderRadius: '5px',
            border: '1px solid var(--neutral-700)',
            fontWeight: 600,
            color: 'var(--gray-700)',
          }}
        >
          {watermarkCodes.length}/10
        </Typography>
        <Typography color={'var(--gray-50)'}>
          {t('create-watermarking.file-information.watermark-code-limit')}
        </Typography>
      </Box>
    </Box>
  );
};

export default FileInfo;
