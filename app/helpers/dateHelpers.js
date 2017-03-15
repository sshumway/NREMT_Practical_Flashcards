import { updateIntervalInMilliseconds } from '../constants';

export function oneUpdateIntervalAgo() {
  const now = new Date();
  return new Date(now.getTime() - (updateIntervalInMilliseconds + 1e+6));
}

export function updateIntervalExceeded(lastUpdate) {
  const now = new Date();
  return now.getTime() - lastUpdate.getTime() > updateIntervalInMilliseconds;
}
