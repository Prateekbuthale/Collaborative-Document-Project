import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3-TXlS9gmsIoWRgxtWYhQekEgbZTyn5g",
  authDomain: "collaborative-doc-de7ec.firebaseapp.com",
  projectId: "collaborative-doc-de7ec",
  storageBucket: "collaborative-doc-de7ec.appspot.com",
  messagingSenderId: "823640933038",
  appId: "1:823640933038:web:2840cf06ded7814c72e33f",
  measurementId: "G-9J1DBFMZWF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const database = getFirestore(app); // Initialize Firestore

export { app, auth, database };