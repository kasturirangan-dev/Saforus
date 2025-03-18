import { logEvent as logEventFirebase } from 'firebase/analytics';
import { analytics } from './firebase-config';

const logEvent = (eventName: string, eventParams?: { [key: string]: any }) => {
  try {
    logEventFirebase(analytics, eventName, eventParams);
  } catch (error) {
    console.error(error);
  }
};

export { logEvent };
