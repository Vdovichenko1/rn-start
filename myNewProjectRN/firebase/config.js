// import * as firebase from "firebase";
// import "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwdDTX6OF6OHYSyWygWDIXUOUhW2NPv0E",
  authDomain: "rn-start-1d578.firebaseapp.com",
  projectId: "rn-start-1d578",
  storageBucket: "rn-start-1d578.appspot.com",
  messagingSenderId: "492302764162",
  appId: "1:492302764162:web:f9a030c569061794c10c9b",
  measurementId: "G-QWZ9S18FM3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
