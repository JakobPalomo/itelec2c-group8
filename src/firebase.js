// CommonJS
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const {
  REACT_APP_FRB_API_KEY,
  REACT_APP_FRB_AUTH_DOMAIN,
  REACT_APP_FRB_PROJECT_ID,
  REACT_APP_FRB_STORAGE_BUCKET,
  REACT_APP_FRB_MESSAGING_SENDER_ID,
  REACT_APP_FRB_APP_ID,
} = process.env;

// Firebase configuration
const firebaseConfig = {
  apiKey: REACT_APP_FRB_API_KEY,
  authDomain: REACT_APP_FRB_AUTH_DOMAIN,
  projectId: REACT_APP_FRB_PROJECT_ID,
  storageBucket: REACT_APP_FRB_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FRB_MESSAGING_SENDER_ID,
  appId: REACT_APP_FRB_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
