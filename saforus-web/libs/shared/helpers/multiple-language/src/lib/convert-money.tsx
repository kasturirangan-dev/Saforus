// const convertCurrencyWithLanguage = (
//   currentNumber: number,
//   from: string,
//   to: string,
//   rate?: number
// ): string => {
//   let convertedNumber = 0;

//   if (!['en', 'ko'].includes(from) || !['en', 'ko'].includes(to)) {
//     throw new Error('Invalid language code');
//   }

//   if (from === to) {
//     convertedNumber = currentNumber;
//   } else {
//     if (rate) {
//       convertedNumber = currentNumber * rate;
//     } else {
//       if (from === 'en' && to === 'ko') {
//         convertedNumber = currentNumber * 1329;
//       } else if (from === 'ko' && to === 'en') {
//         convertedNumber = currentNumber * 0.00075;
//       }
//     }
//   }

//   let currencySymbol = '';
//   let shortHandUnit = '';

//   if (to === 'en') {
//     currencySymbol = '$';
//     if (convertedNumber >= 1000 && convertedNumber < 1000000) {
//       shortHandUnit = 'K';
//       convertedNumber /= 1000;
//     } else if (convertedNumber >= 1000000) {
//       shortHandUnit = 'M';
//       convertedNumber /= 1000000;
//     }
//   } else if (to === 'ko') {
//     currencySymbol = '원';
//     if (convertedNumber >= 10000 && convertedNumber < 100000000) {
//       shortHandUnit = '만';
//       convertedNumber /= 10000;
//     } else if (convertedNumber >= 100000000) {
//       shortHandUnit = '억';
//       convertedNumber /= 100000000;
//     }
//   }

//   if (to === 'en') {
//     return currencySymbol + convertedNumber.toString() + shortHandUnit;
//   } else if (to === 'ko') {
//     return convertedNumber.toString() + shortHandUnit + currencySymbol;
//   } else {
//     return '';
//   }
// };

// export { convertCurrencyWithLanguage };
