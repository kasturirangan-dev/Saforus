import AuthStore from '@web-workspace/shared/hooks/use-auth';

export function getTimezone() {
  return `(GMT${AuthStore.timeZone})` || '';
}

export function getMinuteOffset() {
  return AuthStore.tzDisplayOffset || 0;
}
