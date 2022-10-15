import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKMzxKLFHJQLntejDNfqeYS39J7Mghl9o",
  authDomain: "react-emart-b6649.firebaseapp.com",
  projectId: "react-emart-b6649",
  storageBucket: "react-emart-b6649.appspot.com",
  messagingSenderId: "506514827859",
  appId: "1:506514827859:web:b952db2b08ab71500234a6",
};

// Use this to initialize the firebase App
const firebaseapp = firebase.initializeApp(firebaseConfig);

// Use for db
const db = firebaseapp.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { db, auth, googleProvider, facebookProvider };
