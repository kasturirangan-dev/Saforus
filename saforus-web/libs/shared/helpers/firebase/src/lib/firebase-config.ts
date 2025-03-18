import { initializeApp } from 'firebase/app';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { getFirestore } from 'firebase/firestore';
import { getPerformance } from 'firebase/performance';
import { getAnalytics } from 'firebase/analytics';

const apiKey: string = getEnvVar('VITE_APIKEY');
const authDomain: string = getEnvVar('VITE_AUTHDOMAIN');
const projectId: string = getEnvVar('VITE_PROJECTID');
const storageBucket: string = getEnvVar('VITE_STORAGEBUCKET');
const messagingSenderId: string = getEnvVar('VITE_MESSAGINGSENDERID');
const appId: string = getEnvVar('VITE_APPID');
const measurementId: string = getEnvVar('VITE_MEASUREMENTID');

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseApp);
// Initialize Performance Monitoring and get a reference to the service
const performance = apiKey ? getPerformance(firebaseApp) : undefined;
// Initialize Analytics and get a reference to the service
const analytics = apiKey ? getAnalytics(firebaseApp) : undefined;

export { database, performance, analytics };
