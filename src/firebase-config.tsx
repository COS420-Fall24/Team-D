// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth";

import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAtceTiAFQ-YCQ7SDw7f1c4gtt09s11N8",
  authDomain: "stylenest-cctg.firebaseapp.com",
  projectId: "stylenest-cctg",
  storageBucket: "stylenest-cctg.appspot.com",
  messagingSenderId: "796223415455",
  appId: "1:796223415455:web:e41b26d019753bc0bdeeaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Firebase authentication
export const db = getFirestore(app); // Firestore database
export default app;