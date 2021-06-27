import firebase from "@firebase/app";
import "@firebase/storage";


var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "fashionshop-c6610",
  storageBucket: "fashionshop-c6610.appspot.com",
  messagingSenderId: "184279877528",
  appId: "1:184279877528:web:1543978f0b77964e418ded",
  measurementId: "G-DD7GJ0H89K"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage()
 
  export  {
    storage, firebase as default
  }
  