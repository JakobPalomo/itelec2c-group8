// CommonJS
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUZV3tnloegUqChZzfzPWtOHHo9pd4EWw",
  authDomain: "palengkerist-31337.firebaseapp.com",
  projectId: "palengkerist-31337",
  storageBucket: "palengkerist-31337.appspot.com",
  messagingSenderId: "958166495730",
  appId: "1:958166495730:web:c77db480d75693c8a03b6b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
