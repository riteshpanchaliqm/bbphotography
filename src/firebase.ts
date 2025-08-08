// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkhzgmgi4JUGr__ujsqw9tITmaRX0Blp4",
  authDomain: "releasedashboard-dccee.firebaseapp.com",
  projectId: "releasedashboard-dccee",
  storageBucket: "releasedashboard-dccee.firebasestorage.app",
  messagingSenderId: "157350699905",
  appId: "1:157350699905:web:81c4dc78f3e6bfe5233e80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const storage = getStorage(app);
export const db = getFirestore(app);

// Configure CORS for Firebase Storage
if (process.env.NODE_ENV === 'development') {
  // Connect to emulators in development
  try {
    connectStorageEmulator(storage, 'localhost', 9199);
    connectFirestoreEmulator(db, 'localhost', 8080);
  } catch (error) {
    console.log('Emulators not running');
  }
}

export default app;
