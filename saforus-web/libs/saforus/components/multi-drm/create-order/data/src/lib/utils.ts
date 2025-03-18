const generateDrmOrderNo = ({
  infix = '',
  prefix = 'F',
  length = 13,
}: {
  infix?: string,
  prefix?: string,
  length?: number,
}): string => {
  const head = prefix + infix;
  const pnt = length > 0 || length < 13 ? length : 13;
  const body = Date.now().toString().substring(0, pnt);
  return `${head}-${body}`;
};

export const generateOrderNo = (isWatermark: boolean, isDrm: boolean): string => {
  const prefix = 'P';
  let infix = 'NN';
  if (isWatermark && isDrm) {
    infix = 'WD';
  } else if (isWatermark && !isDrm) {
    infix = 'WN';
  } else if (!isWatermark && isDrm) {
    infix = 'ND';
  } else {
    infix = 'NN';
  }
  return generateDrmOrderNo({ infix, prefix });
}