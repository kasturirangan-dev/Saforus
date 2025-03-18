/**
 * Converts pixel or rem values to viewport width (vw) units.
 *
 * @param {string | number | Array<string | number>} values - The pixel or rem values to convert. Can be a single value or an array of values.
 * @param {boolean} returnAsPixel - If true, the function will return pixel values instead of vw units. Default is false.
 * @returns {string | number} The converted values in vw units. If the screen width is less than 800px, the original pixel values are returned.
 * If the screen width is between 800px and 1024px, the values are converted to vw units based on a base screen width of 1024px. If the screen width is greater than 1024px,
 * the values are converted to vw units based on a base screen width of 1920px. If an array of values is passed in, the returned values are joined into a single string with
 * spaces between each value.
 *
 * @throws Will throw an error if a string value is passed in that does not end with 'px', 'rem', or is not a unitless number.
 *
 * @example
 * // returns '5vw' on screens wider than 1024px, '5.47vw' on screens between 800px and 1024px, and '96' on screens narrower than 800px
 * pxToVw('96px');
 *
 * @example
 * // returns '10vw 5vw' on screens wider than 1024px, '10.94vw 5.47vw' on screens between 800px and 1024px, and '192 96' on screens narrower than 800px
 * pxToVw(['192px', '96px']);
 *
 * @example
 * // returns '10vw' on screens wider than 1024px, '10.94vw' on screens between 800px and 1024px, and '192' on screens narrower than 800px
 * pxToVw(192);
 *
 * @example
 * // returns '1vw' on screens wider than 1024px, '1.09vw' on screens between 800px and 1024px, and '16' on screens narrower than 800px
 * pxToVw('1rem');
 *
 * @example
 * // returns pixel values instead of vw units
 * pxToVw(96, true) as number;
 */

import {
  FeatureFlag,
  isFeatureEnabled,
} from '@web-workspace/shared/feature-flag';

export function pxToVw(
  values: string | number | Array<string | number>,
  returnAsPixel = false
): string | number {
  const screenWidth = window.innerWidth;
  // Ensure values is always an array
  const valuesArray = Array.isArray(values) ? values : [values];

  // Check if the screen width is above the minimum and the feature flag is enabled
  const displayResponsive =
    screenWidth >= 800 && isFeatureEnabled(FeatureFlag.RESPONSIVE);
  if (!displayResponsive) {
    const originalValues = valuesArray.map((value) =>
      typeof value === 'number'
        ? returnAsPixel
          ? value // Return original pixel value as px number
          : `${value}px` // Return original pixel value as px string
        : value.toString()
    );

    return Array.isArray(values) ? originalValues.join(' ') : originalValues[0];
  }

  const vwValues = valuesArray.map((value) => {
    let pixelValue;
    const rootFontSize = 16; // Default root font size is 16px, adjust if necessary

    if (typeof value === 'number') {
      pixelValue = value;
    } else if (value.endsWith('px')) {
      pixelValue = parseFloat(value.replace('px', ''));
    } else if (value.endsWith('rem')) {
      pixelValue = parseFloat(value.replace('rem', '')) * rootFontSize;
    } else {
      throw new Error(
        'Invalid value. Only px, rem, and unitless values are supported.'
      );
    }

    if (returnAsPixel) {
      if (screenWidth > 1024) {
        const baseScreenWidth = 1920; // Base screen width for vw calculation
        const pixelValueForCurrentScreenWidth =
          (screenWidth / baseScreenWidth) * pixelValue;
        return pixelValueForCurrentScreenWidth;
      } else if (screenWidth <= 1024 && screenWidth >= 800) {
        const baseScreenWidth = 1100; // Base screen width for vw calculation
        const pixelValueForCurrentScreenWidth =
          (screenWidth / baseScreenWidth) * pixelValue;
        return pixelValueForCurrentScreenWidth;
      } else {
        return pixelValue; // Return original pixel value as number
      }
    } else {
      if (screenWidth > 1024) {
        const baseScreenWidth = 1920; // Base screen width for vw calculation
        const vwValue = (
          (Math.abs(pixelValue) / baseScreenWidth) *
          100
        ).toFixed(2);
        return `${Math.sign(pixelValue) === -1 ? '-' : ''}${vwValue}vw`;
      } else if (screenWidth <= 1024 && screenWidth >= 800) {
        const baseScreenWidth = 1100; // Base screen width for vw calculation
        const vwValue = (
          (Math.abs(pixelValue) / baseScreenWidth) *
          100
        ).toFixed(2);
        return `${Math.sign(pixelValue) === -1 ? '-' : ''}${vwValue}vw`;
      } else {
        return pixelValue; // Return original pixel value as number
      }
    }
  });

  return vwValues.join(' ');
}
