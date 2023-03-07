// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEAcFz7-s5I1ZQqBINcATU8xyyH-Y8rsE",
  authDomain: "react-disney-pluse-app.firebaseapp.com",
  projectId: "react-disney-pluse-app",
  storageBucket: "react-disney-pluse-app.appspot.com",
  messagingSenderId: "125915015037",
  appId: "1:125915015037:web:8a449f5f5385bdca0d8e14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
