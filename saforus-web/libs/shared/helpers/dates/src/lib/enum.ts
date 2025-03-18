export enum DateFormat {
  ISO = 'yyyy-MM-dd',
  ISO_DATETIME = "yyyy-MM-dd'T'HH:mm:ss",
  EN = 'MM-dd-yyyy',
  EN_DATETIME = 'MM-dd-yyyy HH:mm:ss',
  LONG = 'MMMM d, yyyy',
  SHORT = 'MM-dd-yyyy',
  EN_UK_SHORT = 'dd-MM-yyyy',
  KOREAN_SHORT = 'yyyy-MM-dd',
  DATETIME = 'yyyy-MM-dd HH:mm:ss',
  ENGLISH_DATETIME = 'MMM d, yyyy h:mm a',
  ENGLISH_DATETIME_12_HOUR_PERIOD = 'dd-MM-yyyy h:mm a',
  KOREAN_DATETIME = 'M. d, yyyy h:mm a',
  KOREAN_DATETIME_12_HOUR_PERIOD = 'yyyy-MM-dd h:mm a',
}

export enum DateFormatWithSlash {
  ISO = 'yyyy/MM/dd',
  ISO_DATETIME = "yyyy/MM/dd'T'HH:mm:ss",
  EN = 'MM/dd/yyyy',
  EN_DATETIME = 'MM/dd/yyyy HH:mm:ss',
  LONG = 'MMMM d, yyyy',
  SHORT = 'MM/dd/yyyy',
  EN_UK_SHORT = 'dd/MM/yyyy',
  KOREAN_SHORT = 'yyyy/MM/dd',
  DATETIME = 'yyyy/MM/dd HH:mm:ss',
  ENGLISH_DATETIME = 'MMM d, yyyy h:mm a',
  ENGLISH_DATETIME_12_HOUR_PERIOD = 'dd/MM/yyyy h:mm a',
  KOREAN_DATETIME = 'M. d, yyyy h:mm a',
  KOREAN_DATETIME_12_HOUR_PERIOD = 'yyyy/MM/dd h:mm a',
}

export type DateInput = string | Date | null | undefined;
