// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCcJ5u_QTWA4cCN_a_Sw-mCkbd_xS8R0IM',
  authDomain: "personal-project-a60f8.firebaseapp.com",
  projectId: "personal-project-a60f8",
  storageBucket: "personal-project-a60f8.appspot.com",
  messagingSenderId: "896690613453",
  appId: "1:896690613453:web:8b875df8b84bace0460d84",
  measurementId: "G-7KYZZKPF4G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
