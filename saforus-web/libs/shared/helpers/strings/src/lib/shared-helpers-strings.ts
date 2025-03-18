export const randomId = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

export const isNotEmpty = (value?: string | null | undefined) => {
  if (value === null || value === undefined || value === '') {
    return false;
  }

  return true;
}

export const capitalizeFirstLetter = (value?: string) => {
  if (value === null || value === undefined || value === '') {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}
