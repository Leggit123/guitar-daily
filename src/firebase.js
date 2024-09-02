// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo4QQC3g6YhryeoHS06a9dFWUxMLghCxs",
  authDomain: "guitar-daily-736c2.firebaseapp.com",
  projectId: "guitar-daily-736c2",
  storageBucket: "guitar-daily-736c2.appspot.com",
  messagingSenderId: "850308338251",
  appId: "1:850308338251:web:cd38660c423e88f6d6b3ce",
  measurementId: "G-HXL962PNKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

// Export the auth and db objects so they can be used in other parts of your app
export { auth, db };
