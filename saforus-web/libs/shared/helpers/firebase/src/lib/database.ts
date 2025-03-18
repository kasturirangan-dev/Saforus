import {
  getDocs,
  collection,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { database } from './firebase-config';

const fetchFromCollection = async (
  collectionName: FIREBASE_COLLECTIONS
): Promise<DocumentData[]> => {
  try {
    const collectionData = await getDocs(collection(database, collectionName));
    return collectionData.docs.map((doc: QueryDocumentSnapshot<DocumentData>) =>
      doc.data()
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

const enum FIREBASE_COLLECTIONS {
  VERSION = 'versions',
  FEATURE_FLAG = 'feature-flag',
}

export { fetchFromCollection, FIREBASE_COLLECTIONS };
