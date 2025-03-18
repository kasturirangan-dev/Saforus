import {
  format as formatDateFns,
  parseISO,
  isValid,
  differenceInDays,
  parse,
  getYear,
  addMinutes,
  subMinutes,
} from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { DateFormat, DateFormatWithSlash, DateInput } from './enum';
import i18next from 'i18next';
import { getLocalTimeZone } from './timezone';

const formatDate = (
  date: DateInput | string,
  format: string,
  //  TimeZone should be IANA time zone names or pecified as offsets such as '-0200' or '+04:00"
  timeZone?: string | null
): string => {
  if (!date) {
    return '';
  }

  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  const valid = isValid(parsedDate);
  if (!valid) {
    return typeof date === 'string' ? date : '';
  }

  if (timeZone) {
    return formatInTimeZone(parsedDate, timeZone, format);
  } else {
    return formatDateFns(parsedDate, format);
  }
};

interface FormatDateParams {
  date: DateInput | string;
  language?: string;
  isDetail?: boolean;
  isAmPm?: boolean;
  timezoneString?: string | null;
  withSlash?: boolean;
  tzOffset?: number | null;
}

// Define overloaded function signatures
function formatDateWithLanguage(
  date: DateInput | string,
  language?: string,
  isDetail?: boolean,
  isAmPm?: boolean,
  timezoneString?: string | null,
  withSlash?: boolean,
  tzOffset?: number | null
): string;

function formatDateWithLanguage(params: FormatDateParams): string;

function formatDateWithLanguage(
  dateOrParams: FormatDateParams | DateInput | string,
  language?: string,
  isDetail?: boolean,
  isAmPm?: boolean,
  timezoneString?: string | null,
  withSlash?: boolean,
  // The timezone offset between the local timezone and the user's timezone
  tzOffset?: number | null
): string {
  // Check if the first argument is an object and extract values
  let date: DateInput | string;
  if (
    typeof dateOrParams === 'object' &&
    dateOrParams &&
    !isValid(dateOrParams)
  ) {
    const params = dateOrParams as FormatDateParams;
    ({ date, language, isDetail, isAmPm, timezoneString, withSlash, tzOffset } =
      params);
  } else {
    date = dateOrParams as any;
  }

  let format = '';
  const lang = language ?? i18next.language;
  if (!date) {
    return '';
  }

  // TimeZone should be IANA time zone names or pecified as offsets such as '-0200' or '+04:00"
  let timeZone = '';
  if (timezoneString) {
    const regex = /([+-]?\d{1,2}:\d{2})/;
    const match = timezoneString.match(regex);
    // America/New_York -> America/New_York
    // (GMT 03:00) Nairobi -> +03:00
    if (match) {
      timeZone = match[0]?.replace(/^(?![+-])/, '+');
    } else {
      timeZone = timezoneString;
    }
  } else if (tzOffset) date = addMinutes(new Date(date), tzOffset); // Convert date to user's timezone with the offset
  if (lang === 'ko') {
    format = isDetail
      ? DateFormat.KOREAN_DATETIME_12_HOUR_PERIOD
      : DateFormat.ISO;
    if (withSlash) {
      format = isDetail
        ? DateFormatWithSlash.KOREAN_DATETIME_12_HOUR_PERIOD
        : DateFormatWithSlash.KOREAN_SHORT;
    }
  } else if (lang === 'en') {
    format = isDetail
      ? DateFormat.ENGLISH_DATETIME_12_HOUR_PERIOD
      : DateFormat.EN_UK_SHORT;
    if (withSlash) {
      format = isDetail
        ? DateFormatWithSlash.ENGLISH_DATETIME_12_HOUR_PERIOD
        : DateFormatWithSlash.EN_UK_SHORT;
    }
  } else {
    return '';
  }

  return formatDate(date, isAmPm ? `${format} a` : format, timeZone);
}

const differenceDays = (
  startDate: DateInput | string,
  endDate: DateInput | string
): any => {
  const startDateIso =
    typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const endDateIso = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  return differenceInDays(endDateIso || new Date(), startDateIso || new Date());
};

const getYearValue = (date: DateInput | string): number => {
  const lang = i18next.language;
  const dateFormat =
    lang === 'ko' ? DateFormatWithSlash.ISO : DateFormatWithSlash.EN;
  const parsedDate =
    typeof date === 'string' ? parse(date, dateFormat, new Date()) : date;
  return parsedDate ? getYear(parsedDate) : 0;
};

// Format date with timezone offset
// Return date in user's timezone
const formatTzDate = (
  date: DateInput | string,
  tzOffsetMinutes: number,
  startDate = true
): string => {
  // Check valid date
  if (!date) {
    return '';
  }
  let parsedDate = typeof date === 'string' ? parseISO(date) : date;
  const valid = isValid(parsedDate);
  if (!valid) {
    return typeof date === 'string' ? date : '';
  }

  // Local timezone -> Current date in user's timezone
  parsedDate = addMinutes(parsedDate, tzOffsetMinutes);
  if (startDate) parsedDate.setHours(0, 0, 0, 0);
  else {
    parsedDate.setHours(23, 59, 59, 999);
  }
  // Current date in user timezone -> Local timezone -> UTC
  const { localTzOffet } = getLocalTimeZone();
  parsedDate = subMinutes(parsedDate, tzOffsetMinutes + localTzOffet);
  return valid ? formatDateFns(parsedDate, DateFormat.ISO_DATETIME) : '';
};

const formatBillingDate = (
  date: DateInput,
  tzOffset: number,
  language?: string
) => {
  if (!date) return '';
  const displayDate = addMinutes(new Date(date), tzOffset);
  const lang = language ?? i18next.language;
  if (lang === 'en') {
    return formatDate(displayDate, DateFormatWithSlash.LONG);
  } else {
    return formatDate(displayDate, DateFormatWithSlash.KOREAN_SHORT);
  }
};

export {
  formatDate,
  formatDateWithLanguage,
  differenceDays,
  getYearValue,
  formatTzDate,
  formatBillingDate,
};
