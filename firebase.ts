// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQef5r13ymxXhHvhQRix3ubALi2kl-IGE",
  authDomain: "chatclonegpt.firebaseapp.com",
  projectId: "chatclonegpt",
  storageBucket: "chatclonegpt.appspot.com",
  messagingSenderId: "95486948815",
  appId: "1:95486948815:web:1af1be2cd2c465d2b40eba",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
