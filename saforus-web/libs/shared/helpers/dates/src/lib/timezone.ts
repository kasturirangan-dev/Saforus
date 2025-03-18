import { getTimezoneOffset } from 'date-fns-tz';

const getLocalTimeZone = () => {
  const current = new Date();

  const localTzOffet = -current.getTimezoneOffset();
  const sign = localTzOffet < 0 ? '-' : '+';
  const hours = Math.floor(Math.abs(localTzOffet) / 60);
  const minutes = Math.abs(localTzOffet % 60);

  const localTz = `${sign}${String(hours).padStart(2, '0')}:${String(
    minutes
  ).padStart(2, '0')}`;
  return { localTzOffet, localTz };
};

/**
 * Formats the timezone according to the provided zoneId.
 * @param zoneId - The identifier of the timezone. This should be either an IANA time zone name or a string containing a time offset.
 * @returns An object with the standardOffset and timeZone formatted as [+/-]HH:mm.
 */
const formatedTimezone = (zoneId: string) => {
  const regex = /([+-]?\d{1,2}:\d{2})/;
  const match = zoneId.match(regex);

  // Check of the zoneId is an offset string (GMT 03:00) or an IANA time zone name
  if (match) {
    // Get timeZone from offset string (GMT 03:00) -> +03:00
    const timeZone = match[0]?.replace(/^(?![+-])/, '+');

    // Offset in minutes
    const sign = timeZone[0] === '-' ? -1 : 1;
    const [hour, minute] = timeZone.slice(1).split(':');
    const standardOffset =
      sign * ((parseInt(hour) ?? 0) * 60 + (parseInt(minute) ?? 0));

    return { standardOffset, timeZone };
  } else {
    // Get timeZone from IANA time zone names
    let standardOffset = getTimezoneOffset(zoneId) / 60 / 1000;
    // Special case for Pacific/Auckland
    if (zoneId === 'Pacific/Auckland') standardOffset = 720;

    const sign = standardOffset < 0 ? '-' : '+';
    const hour = Math.floor(Math.abs(standardOffset) / 60);
    const minute = Math.abs(standardOffset) % 60;
    const timeZone = `${sign}${String(hour).padStart(2, '0')}:${String(
      minute
    ).padStart(2, '0')}`;

    return { standardOffset, timeZone };
  }
};

export { getLocalTimeZone, formatedTimezone };
