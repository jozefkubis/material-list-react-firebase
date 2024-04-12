import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDE_xeq4-ug9kBadi0fHvPgr_JpHnn3mlI",
  authDomain: "material-list-react-fire-4c5ba.firebaseapp.com",
  projectId: "material-list-react-fire-4c5ba",
  storageBucket: "material-list-react-fire-4c5ba.appspot.com",
  messagingSenderId: "76248828946",
  appId: "1:76248828946:web:9e7b04906a8a6694e89ccb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Services
const projectFirestore = firebase.firestore();

export { projectFirestore };
