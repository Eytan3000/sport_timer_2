import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

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

// Connect to Firestore Emulator if running locally
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080); // 8080 is the default port
}

export { db };