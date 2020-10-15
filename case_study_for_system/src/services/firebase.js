import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnuvSdgM6f-EMlCnG06qzoOWEBdJGmu3g",
  authDomain: "procurements-for-constructions.firebaseapp.com",
  databaseURL: "https://procurements-for-constructions.firebaseio.com",
  projectId: "procurements-for-constructions",
  storageBucket: "procurements-for-constructions.appspot.com",
  messagingSenderId: "161695814624",
  appId: "1:161695814624:web:076c9cb11bfb0afc895185",
  measurementId: "G-E5KZCGC7RK",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;
