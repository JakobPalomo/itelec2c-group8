// ES module
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

const dotenv = require("dotenv").config({ path: "./.env" });
const {
  FRB_API_KEY,
  FRB_AUTH_DOMAIN,
  FRB_PROJECT_ID,
  FRB_STORAGE_BUCKET,
  FRB_MESSAGING_SENDER_ID,
  FRB_APP_ID,
} = process.env;

// Firebase configuration
const firebaseConfig = {
  apiKey: FRB_API_KEY,
  authDomain: FRB_AUTH_DOMAIN,
  projectId: FRB_PROJECT_ID,
  storageBucket: FRB_STORAGE_BUCKET,
  messagingSenderId: FRB_MESSAGING_SENDER_ID,
  appId: FRB_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

module.exports = { auth, db };
