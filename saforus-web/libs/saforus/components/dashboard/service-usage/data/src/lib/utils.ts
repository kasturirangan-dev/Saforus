export function convertNumber(number: number) {
  if (!number) {
    return 0;
  }

  if (Number.isInteger(number)) {
    return number;
  }

  return parseFloat(number.toFixed(2));
}
