import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0e7wWvFNQKvkKJQz8Xigp7GIouM1n80I",
  authDomain: "finsyt.firebaseapp.com",
  projectId: "finsyt",
  storageBucket: "finsyt.appspot.com",
  messagingSenderId: "810888338279",
  appId: "1:810888338279:web:16da3c81f56a33fd3c6dc2",
  measurementId: "G-97N5KDN185"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app