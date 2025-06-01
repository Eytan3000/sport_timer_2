import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYyvP-eENPbMhIqwnTxsdTc4OOFLRBZag",
  authDomain: "sport-timer-7baee.firebaseapp.com",
  projectId: "sport-timer-7baee",
  storageBucket: "sport-timer-7baee.firebasestorage.app",
  messagingSenderId: "565324038861",
  appId: "1:565324038861:web:8ef61f400826951bba1f84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

// Connect to Firestore and Auth Emulator if running locally
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080); // 8080 is the default port
  connectAuthEmulator(auth, "http://localhost:9099"); // 9099 is the default port for Auth emulator
}
export { db, auth };