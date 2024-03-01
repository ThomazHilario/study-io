// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQe1cjos4cNcFaQF8tV0eQFGikb_HDSnM",
  authDomain: "study-io-6639a.firebaseapp.com",
  projectId: "study-io-6639a",
  storageBucket: "study-io-6639a.appspot.com",
  messagingSenderId: "727426756747",
  appId: "1:727426756747:web:7bb842ead255f82b5ee48e",
  measurementId: "G-YYL9PC527W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth from firebase/auth
const auth = getAuth(app)

// Initialize DataBase from firebase/firestore
const database = getFirestore(app)

export {auth, database}
