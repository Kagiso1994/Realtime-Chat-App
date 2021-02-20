
import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCmZr-OzlWilKUwRJqgbHLryL-4mPqlsvI",
  authDomain: "chat-app-bd093.firebaseapp.com",
  projectId: "chat-app-bd093",
  storageBucket: "chat-app-bd093.appspot.com",
  messagingSenderId: "187611692399",
  appId: "1:187611692399:web:2f2282a45c1e645f5e3c9a"
});

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
//console.log(db)
//const auth = firebase.auth()
//const provider = new firebase.auth.GoogleAuthProvider();


export default { auth, provider, db };
//export default ;