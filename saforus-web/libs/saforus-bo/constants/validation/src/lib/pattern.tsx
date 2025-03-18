const PATTERN = {
  // reference https://stackoverflow.com/questions/68122071/regex-that-allows-all-international-characters-but-no-symbols
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape
  NAME: /^[\p{L}\s]+$/u,
  // https://stackoverflow.com/questions/60862572/how-to-write-the-regex-not-to-allow-spaces-in-the-beginning-and-ending-but-spac
  // https://stackoverflow.com/questions/28273684/regular-expression-string-cannot-start-end-with-white-space-and-consist-of-fe
  // /^(\w+\s)*\w+$/,
  NOT_SPACE_START: /^\S+(?: \S+)*$/,
  // reference https://regexlib.com/REDetails.aspx?regexp_id=174
  // https://stackoverflow.com/questions/74506746/regular-expression-prevent-non-english-letters-from-email
  EMAIL:
    /^[A-Za-z0-9]+(?:[.\-_][A-Za-z0-9]+)*@[A-Za-z0-9]+(?:[.\-_][A-Za-z0-9]+)*\.[a-z]{2,}$/,
  COMPANY_NAME: /^[\p{L}0-9_\\-\\)\\(\s-]+$/u,
  WATERMARK_FILE_NAME: /^[-_a-zA-Z0-9]+$/,
  MARK_ANY_DOMAIN: ['markany.com', 'markany.co.kr'] as string[],
  // reference https://stackoverflow.com/questions/1559751/regex-to-make-sure-that-the-string-contains-at-least-one-lower-case-char-upper
  UPPERCASE_LEAST: /(?=.*[A-Z]).*$/,
  LOWERCASE_LEAST: /(?=.*[a-z]).*$/,
  UP_LOWER_CASE_LEAST: /(?=.*[a-z])(?=.*[A-Z]).*$/,
  NUMBER_LEAST: /(?=.*\d).+$/,
  SYMBOL_LEAST: /(?=.*\W).+$/,
  FIRST_LETTER: /^[A-Za-z]/,
  EXCLUDES_SPECIAL_CHARACTER: /^[a-zA-Z0-9]+$/,
  ONLY_ENGLISH: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  TITLE: /^[\p{L}0-9_\\[\]\\-\\)\\(\s-]+$/u,
} as const;

export default PATTERN;
