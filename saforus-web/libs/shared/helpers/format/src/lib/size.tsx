const k = 1024;
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

/**
 * Converts a given number of bytes into a human-readable format using base-1024 units.
 *
 * - Converts bytes to the most appropriate unit (Bytes, KB, MB, GB, etc.).
 * - Supports rounding to the specified number of decimal places.
 * - Automatically removes the decimal part if the value is a whole number (e.g., `1.00 MB` becomes `1 MB`).
 *
 * @param {number} bytes - The size in bytes to be formatted.
 * @param {number} [decimals=2] - The number of decimal places to retain (default: 2).
 * @returns {string} The formatted size with the appropriate unit.
 *
 * @example
 * formatBytes(0);                 // '0 Bytes'
 * formatBytes(1023);              // '1023 Bytes'
 * formatBytes(1024);              // '1 KB'
 * formatBytes(1048576);           // '1 MB'
 * formatBytes(1073741824);        // '1 GB'
 * formatBytes(1099511627776);     // '1 TB'
 */
export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes <= 0) return '0 Bytes';

  const dm = decimals < 0 ? 0 : decimals;

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const unitSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${unitSize} ${sizes[i]}`;
};

/**
 * Converts a given number of bytes into a human-readable format with a minimum unit of 'MB'.
 *
 * - Similar to `formatBytes`, but forces the result to be in 'MB' or higher units.
 *
 * @param {number} bytes - The size in bytes to be formatted.
 * @param {number} [decimals=2] - The number of decimal places to retain (default: 2).
 * @returns {string} The formatted size with the appropriate unit, ensuring the unit is 'MB' or greater.
 *
 * @example
 * formatSize(0);                 // '0 MB'
 * formatSize(1024);              // '1 MB'
 * formatSize(1048576);           // '1 MB'
 * formatSize(1048576000);        // '1000 MB'
 * formatSize(1099511627776);     // '1 TB'
 */
export const formatSize = (bytes: number, decimals = 2): string => {
  if (bytes <= 0) return '0 MB';

  const dm = decimals < 0 ? 0 : decimals;
  const minUnitIndex = 2; // MB

  let i = Math.floor(Math.log(bytes) / Math.log(k));
  if (i < minUnitIndex) i = minUnitIndex;
  const unitSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${unitSize} ${sizes[i]}`;
};
