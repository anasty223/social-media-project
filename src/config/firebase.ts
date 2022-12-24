// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import{getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYA4aHP_ZUvb8sEB16_2vLtDvVz4dzNRo",
  authDomain: "socialmediaproject-dc535.firebaseapp.com",
  projectId: "socialmediaproject-dc535",
  storageBucket: "socialmediaproject-dc535.appspot.com",
  messagingSenderId: "943556660560",
  appId: "1:943556660560:web:9fac0b0750fb893dc7f055"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const provider =new GoogleAuthProvider();
export const db=getFirestore(app)