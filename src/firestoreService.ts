import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();

// Enable offline persistence
db.enablePersistence()
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a time.
      console.error('Persistence failed: multiple tabs open');
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence.
      console.error('Persistence not supported');
    }
  });

// Specify 'collectionName' as a string type
export const addDocument = (collectionName: string, data: object) => {
    return db.collection(collectionName).add(data);
  };
  
  // Specify 'collectionName' as a string type
  export const getDocuments = (collectionName: string) => {
    return db.collection(collectionName).get();
  };
  
  // Specify 'collectionName' as a string type
  export const getDocument = (collectionName: string, documentId: string) => {
    return db.collection(collectionName).doc(documentId).get();
  };
  
  // Specify 'collectionName' as a string type
  export const updateDocument = (collectionName: string, documentId: string, data: object) => {
    return db.collection(collectionName).doc(documentId).update(data);
  };
  
  // Specify 'collectionName' as a string type
  export const deleteDocument = (collectionName: string, documentId: string) => {
    return db.collection(collectionName).doc(documentId).delete();
  };
