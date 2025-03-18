/**
 * DateRangePicker is a React component that renders a text field with a custom date range picker modal.
 * It allows users to select a date range and displays the selected range in the text field.
 * The component also adjusts its behavior and styling based on the current language setting.
 *
 * Props:
 * @param {Date[]} value - The current selected date range as an array of two dates.
 * @param {(dates: Date[]) => void} onChange - A callback function that is called when the date range changes.
 * @param {number} [tzOffset=0] - The timezone offset between the local timezone and the user's timezone
 *
 * The component utilizes several external libraries and components, including:
 * - `mui-daterange-picker-plus` for the date range picker modal.
 * - `date-fns` for date manipulation functions.
 * - `@mui/material` for Material-UI components.
 * - `@web-workspace/shared/helpers/dates` for date display formatting with internationalization support.
 *
 * The component also includes custom styling for the picker modal and the text field to match the application's theme.
 */

import { useState, useEffect } from 'react';
import { DateRange, PickerModal } from 'mui-daterange-picker-plus';
import { subMinutes, addDays, addMinutes } from 'date-fns';
import { enUS, ko } from 'date-fns/locale';
import { TextField, InputAdornment, SxProps, ButtonBase } from '@mui/material';
import CalendarIcon from './asset/calendar.svg';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import { useTranslation } from 'react-i18next';

interface DateRangePickerProps {
  value: Date[];
  onChange: (dates: Date[]) => void;
  // The timezone offset between the local timezone and the user's timezone
  // Used to display and select dates in the user's actual timezone setting.
  tzOffset?: number;
  inputStyle?: SxProps;
}

export default function DateRangePicker({
  value,
  onChange,
  tzOffset = 0,
  inputStyle,
}: DateRangePickerProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'ko' ? ko : enUS;

  // Adjust the current date to the user's timezone
  const today = addMinutes(new Date(), tzOffset);

  const definedRanges = [
    {
      label: t('calendar.weekLy'),
      startDate: addDays(today, -6),
      endDate: today,
    },
    {
      label: t('calendar.monthLy'),
      startDate: addDays(today, -29),
      endDate: today,
    },
    {
      label: t('calendar.1year'),
      startDate: addDays(today, -364),
      endDate: today,
    },
    {
      label: t('calendar.2year'),
      startDate: addDays(today, -729),
      endDate: today,
    },
    {
      label: t('calendar.3year'),
      startDate: addDays(today, -1094),
      endDate: today,
    },
  ];

  // state + handlers for the Modal
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  // state + handlers for the date range
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(addMinutes(value[0], tzOffset)),
    endDate: new Date(addMinutes(value[1], tzOffset)),
  });
  useEffect(() => {
    setDateRange({
      startDate: new Date(addMinutes(value[0], tzOffset)),
      endDate: new Date(addMinutes(value[1], tzOffset)),
    });
  }, [value]);

  const handleSetDateRangeOnChange = (dateRangeObj: DateRange) => {
    const startDate = dateRangeObj.startDate;
    const endDate = dateRangeObj.endDate;

    // Convert string dates to Date objects
    if (
      startDate instanceof Date &&
      !isNaN(startDate.getTime()) &&
      endDate instanceof Date &&
      !isNaN(endDate.getTime())
    ) {
      // Correct to user's timezone date:
      const adjustedDateRange = [
        subMinutes(startDate, tzOffset),
        subMinutes(endDate, tzOffset),
      ];
      onChange(adjustedDateRange);
      setDateRange(dateRangeObj);
    }
    handleClose();
  };

  // Format the date range text
  // Date rang value already at the user's language setting
  const formatDateRange = (dateRange: DateRange) => {
    const startValue = formatDateWithLanguage({
      date: dateRange?.startDate,
      isDetail: false,
      withSlash: true,
      // tzOffset,
    });
    const endValue = formatDateWithLanguage({
      date: dateRange?.endDate,
      isDetail: false,
      withSlash: true,
      // tzOffset,
    });
    return `${startValue} ~ ${endValue}`;
  };

  return (
    <>
      <style>
        {`
          .drp-header {
            background-color: inherit;
            .MuiIconButton-colorSecondary {
              border: 1px solid var(--neutral-750);
              border-radius: 5px;
              padding: 9px;
            }
            .MuiSvgIcon-root {
              color: var(--gray-700);
            }
            .MuiInputBase-root {
              height: 40px;
              .MuiSelect-select {
                padding: 10px 16px;
              }
              .MuiSelect-icon {
                display: none;
              }  
            }
            .MuiPaper-root {
              margin-top: 6px;
              width: 138px;
            }
            ::-webkit-scrollbar {
              width: 6px;
            }
            .MuiTypography-root {
              font-weight: 500;
              font-size: 14px;
              line-height: 20px;
            }
          }

          .drp-weekdays{
            .MuiTypography-root {
              font-weight: 500;
              font-size: 14px;
              line-height: 20px;
              color: var(--neutral-800);
            }
          }

          .drp-day {
            .MuiButtonBase-root {
              border-radius: 5px;
            }
            .MuiTypography-root {
              font-weight: 500;
              font-size: 14px;
              line-height: 20px;
            }
            .drp-day-outlined {
              background-color: var(--purple-50);
              border: none;
              .MuiTypography-root {
                color: var(--purple-600);
              }
              &:hover {
                background-color: #D6D5FF;
              }
            }
            .Mui-disabled  {
              .MuiTypography-root {
                color: var(--neutral-800);
              }
            }
          }

          .drp-footer {
            .MuiTypography-root {
              font-weight: 400;
              font-size: 15px;
              line-height: 22px;
              color: var(--gray-700);
            }
          }
          .drp-cancel-btn {
            min-width: 140px;
            height: 40px;
            font-size: 14px;
            font-weight: 700;
            color: var(--gray-700);
            border-radius: 5px;
            border: 1px solid var(--neutral-750);
          }
          .drp-apply-btn {
            min-width: 140px;
            height: 40px;
            font-size: 14px;
            font-weight: 700;
            border-radius: 5px;
            background: var(--purple-600);
            &:hover {
              background: var(--purple-400);
            }
          }

          .DRP-Defined-Ranges {
            .drp-header {
              display: none;
            }
            .MuiList-root {
              padding-top: 24px;
              padding-bottom: 24px;
            }
            .MuiButtonBase-root {
              padding: 10px 28px;
              height: 44px;
            }
            .MuiTypography-root {
              min-width: 120px;
              font-weight: 600;
              font-size: 15px;
              line-height: 22px;
              color: var(--gray-50);
            }
            .drp-selected-range {
              position: relative;
              background-color: var(--blue-50);
              &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                border-left: 3px solid var(--purple-600);
              }
              .MuiTypography-root {
                color: var(--purple-600);
              }
            }
          }
        `}
      </style>
      <ButtonBase>
        <TextField
          variant="outlined"
          size="small"
          fullWidth={false}
          value={formatDateRange(dateRange)}
          onClick={handleClick}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <img
                  src={CalendarIcon}
                  alt="CalendarIcon"
                  title="Calendar"
                  style={{
                    width: 18,
                    height: 18,
                  }}
                  loading="lazy"
                />
              </InputAdornment>
            ),
          }}
          sx={{
            width: '230px',
            backgroundColor: 'var(--base-white)',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--neutral-750)',
              boxShadow: 'var(--shadow-xsm)',
            },
            '& .MuiInputBase-input': {
              fontFamily: 'Noto Sans',
            },
            ...inputStyle,
          }}
        />
      </ButtonBase>
      <PickerModal
        hideOutsideMonthDays={false}
        initialDateRange={dateRange}
        definedRanges={definedRanges}
        maxDate={new Date()}
        customProps={{
          onSubmit: (dateRange) => {
            handleSetDateRangeOnChange(dateRange);
          },
          onCloseCallback: handleClose,
          labels: {
            footer: {
              endDate: ' ',
            },
            actions: {
              apply: t('calendar.apply'),
              cancel: t('calendar.close'),
            },
          },
        }}
        locale={locale}
        modalProps={{
          open,
          anchorEl,
          onClose: handleClose,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          sx: {
            '& > .MuiPaper-root': {
              marginTop: '6px',
            },
          },
        }}
      />
    </>
  );
}
