export function currencyToSymbol(currencyCode: string): string {
  const currencySymbols = {
    USD: '$', // US Dollar
    EUR: '€', // Euro
    GBP: '£', // British Pound Sterling
    JPY: '¥', // Japanese Yen
    CNY: '¥', // Chinese Yuan (same symbol as Yen, but contextually different)
    INR: '₹', // Indian Rupee
    BRL: 'R$', // Brazilian Real
    CAD: '$', // Canadian Dollar
    AUD: '$', // Australian Dollar
    ZAR: 'R', // South African Rand
    RUB: '₽', // Russian Ruble
  };

  // Return the symbol if found; otherwise, return the code itself.
  return currencySymbols[currencyCode.toUpperCase()] || currencyCode;
}

export function capitalizeFirstLetter(string: string): string {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}
