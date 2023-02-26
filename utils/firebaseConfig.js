// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUKkqY898JnZatVeRX8zpHHsr8lYAyC9U",
  authDomain: "telegrom-app.firebaseapp.com",
  //   projectId: "telegrom-app",
  //   storageBucket: "telegrom-app.appspot.com",
  //   messagingSenderId: "616175171580",
  //   appId: "1:616175171580:web:489fa15f7e17aa32d4e479",
  //   measurementId: "G-F2Z504236N",
  databaseURL:
    "https://telegrom-app-default-rtdb.asia-southeast1.firebasedatabase.app/",

  // apiKey: process.env.NEXT_API_KEY,
  // authDomain: process.env.NEXT_AUTH_DOMAIN,
  projectId: process.env.NEXT_PROJECT_ID,
  storageBucket: process.env.NEXT_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_APP_ID,
  measurementId: process.env.NEXT_MEASUREMENT_ID,
  //   databaseURL: process.env.NEXT_DATABASE_FIREBASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { database, auth };
