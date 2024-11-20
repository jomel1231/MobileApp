// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM3_ZQ0KhW-ra2JwhB4sa6mLBefyEZWPk",
  authDomain: "webapp-603c9.firebaseapp.com",
  projectId: "webapp-603c9",
  storageBucket: "webapp-603c9.firebasestorage.app",
  messagingSenderId: "530147246945",
  appId: "1:530147246945:web:9e78434add4578a022fb20",
  measurementId: "G-0VMNMDE07Q"
};
// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth();

export { auth };