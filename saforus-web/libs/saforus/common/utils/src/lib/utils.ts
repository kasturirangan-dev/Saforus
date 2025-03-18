export const getMediaTypeByString = (value: string) => {
  const valueUpper = value.toUpperCase();
  if (value === 'IMG' || value === 'IMAGE') {
    return 'IMG';
  }

  return valueUpper;
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * This function takes a size in bytes and formats it to a string representation in either MB or GB.
 *
 * The rules for formatting are as follows:
 * - If the size is between 0 and 999 (inclusive), the unit is MB.
 * - If the size is greater than 1000, the unit is GB.
 * - The size is formatted with up to two decimal places.
 * - If the size is exactly a whole number in GB or MB (like 1.00, 2.00, etc.), it is returned without the decimal part.
 *
 * Examples:
 * - 0 bytes -> '0 MB'
 * - 999 bytes -> '999 MB'
 * - 1000 bytes -> '1 GB'
 * - 1234 bytes -> '1.23 GB'
 * - 2000 bytes -> '2 GB'
 *
 * @param {number} bytes - The size in bytes to be formatted.
 * @returns {string} The formatted size string in either MB or GB.
 */

export const formatSize = (bytes: number): string => {
    if (bytes < 0) { // Check if the size is negative.
      return '0 MB';
  }
  
  const units = ['MB', 'GB'];
  let size = bytes / 1024 / 1024;
  let unitIndex = 0;

  while (size >= 1000 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  // Get the unit (MB or GB) based on the unit index.
  const unit = units[unitIndex];

  // If the unit is GB else MB, format the size with two decimal places.
  if (unit === 'GB') {
    const gbSize = size.toFixed(2);
    // Check if the size is a whole number.
    return gbSize.endsWith('.00') ? `${parseInt(gbSize)} GB` : `${gbSize} GB`;
  } else {
    const mbSize = size.toFixed(2);
    // Check if the size is a whole number.
    return mbSize.endsWith('.00') ? `${parseInt(mbSize)} MB` : `${mbSize} MB`;
  }
};