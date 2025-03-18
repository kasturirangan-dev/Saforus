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
import { WatermarkingForm } from '../data/const';
import { useTranslation } from 'react-i18next';
import {
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import Input from '@web-workspace/shared/components/widgets/input';
import addFile from '../assets/add-file.svg';
import { randomId } from '@web-workspace/shared/helpers/strings';
import CloseIcon from '@mui/icons-material/Close';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { FileType } from '@web-workspace/api-console/common/model';
import { WatermarkFile } from '@web-workspace/api-console/components/watermarking/data';
import InfoIcon from '../assets/info.svg';
import Tooltip from '@web-workspace/shared/components/widgets/tooltip';

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
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: '-0.1px',
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

const WmCodeTooltip = ({ content }: { content: string | undefined | null }) => (
  <Tooltip
    title={null}
    titleHeader={content ?? ''}
    titleHeaderStyle={{ textAlign: 'center' }}
    placement="top"
  >
    <img src={InfoIcon} alt="info" loading="lazy" />
  </Tooltip>
);

const RowInfo = ({
  index,
  watermark,
  updateWatermark,
  removeWatermark,
  disabled,
  canDelete,
}: {
  index: number;
  watermark: WatermarkFile;
  updateWatermark: (watermark: WatermarkFile) => void;
  removeWatermark: (watermark: WatermarkFile) => void;
  disabled?: boolean;
  canDelete?: boolean;
}) => {
  const { t } = useTranslation();

  const updateDescription = (value: string) => {
    updateWatermark({ ...watermark, wtrDescription: value });
  };

  const onRemove = () => {
    removeWatermark(watermark);
  };

  const [editMode, setEditMode] = useState(true);
  const textRef = useRef<HTMLInputElement>(null);

  const onClear = () => {
    if (textRef.current) {
      textRef.current.value = '';
      updateDescription('');
    }
  };

  return (
    <TableRow>
      <TableCell align="center">{index}</TableCell>
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
              defaultValue={watermark.wtrDescription}
              placeholder={
                t('apiWatermarking.create.watermark.placeholder') as string
              }
              style={{ flex: 1 }}
              inputStyle={{
                backgroundColor: 'var(--neutral-300)',
                border: 'none',
              }}
              onChange={(e) => {
                updateDescription(e.target.value);
              }}
              inputProps={{ maxLength: 200 }}
              showErrorMsg={false}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditMode(false);
                }
              }}
              onBlur={() => {
                if (textRef.current?.value) {
                  setEditMode(false);
                }
              }}
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
              disabled={disabled}
            />
          ) : (
            <Typography
              color={'var(--gray-700)'}
              padding="9px 8px"
              flex={1}
              onClick={() => setEditMode(true)}
              sx={{ wordBreak: 'break-word' }}
            >
              {watermark.wtrDescription ?? '--'}
            </Typography>
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {(!editMode || !canDelete) && (
            <ActionButton onClick={() => setEditMode(true)} color="primary">
              <Icon
                name="edit"
                size={16}
                fillColor="var(--gray-25)"
                color="none"
              />
            </ActionButton>
          )}
          {canDelete && (
            <ActionButton onClick={onRemove} color="error">
              <Icon
                name="delete"
                size={16}
                fillColor="var(--gray-25)"
                color="none"
              />
            </ActionButton>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export interface FileInfoViewProps {
  setValue: UseFormSetValue<WatermarkingForm>;
  getValues: UseFormGetValues<WatermarkingForm>;
  watch: UseFormWatch<WatermarkingForm>;
}

const FileInfo = ({ setValue, getValues, watch }: FileInfoViewProps) => {
  const { t } = useTranslation();
  const file = watch('file') as FileType;
  const isActive = Boolean(file?.file);

  const watermarkCodes = watch('wtrOrderFiles') as WatermarkFile[];

  const addWatermark = () => {
    const items = (getValues('wtrOrderFiles') || []) as WatermarkFile[];
    const newItem = {
      wtrName: randomId(),
      wtrDescription: '',
    } as WatermarkFile;
    setValue('wtrOrderFiles', [...items, newItem]);
  };

  const updateWatermark = (watermark: WatermarkFile) => {
    const items = (getValues('wtrOrderFiles') || []) as WatermarkFile[];
    const updatedItems = items.map((item) =>
      item.wtrName === watermark.wtrName ? { ...item, ...watermark } : item
    );
    setValue('wtrOrderFiles', updatedItems);
  };

  const removeWatermark = (watermark: WatermarkFile) => {
    const items = (getValues('wtrOrderFiles') as WatermarkFile[]) || [];
    const updatedItems = items.filter(
      (item) => item.wtrName !== watermark.wtrName
    );
    if (updatedItems.length === 0) {
      updatedItems.push({ wtrName: randomId(), wtrDescription: '' });
    }
    setValue('wtrOrderFiles', updatedItems);
  };

  useEffect(() => {
    if (!isActive) {
      setValue('wtrOrderFiles', [{ wtrName: randomId(), wtrDescription: '' }]);
    }
  }, [isActive]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <StyledTableContainer>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell width={60} align="center">
                #
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: '4px' }}>
                  {t('apiWatermarking.create.watermark.description')}
                  <WmCodeTooltip
                    content={t(
                      'apiWatermarking.create.watermark.description-tooltip'
                    )}
                  />
                </Box>
              </TableCell>
              <TableCell width={140}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {watermarkCodes?.map((item, index) => (
              <RowInfo
                key={item.wtrName}
                index={index + 1}
                watermark={item}
                updateWatermark={updateWatermark}
                removeWatermark={removeWatermark}
                disabled={!isActive}
                canDelete={watermarkCodes.length > 1}
              />
            ))}
            <TableRow>
              {watermarkCodes?.length < 10 && (
                <TableCell colSpan={3} align="center">
                  <IconButton
                    onClick={isActive ? addWatermark : undefined}
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
        <Icon name="information" size={18} color={'var(--gray-50)'} />
        <Typography color={'var(--gray-50)'}>
          {t('apiWatermarking.create.watermark.limit')}
        </Typography>
      </Box>
    </Box>
  );
};

export default FileInfo;
