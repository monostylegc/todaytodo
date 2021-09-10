import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5nALExeuc-O3CAZ6t3wKT6o90t76DClw",
  authDomain: "todaytodo-9bb22.firebaseapp.com",
  projectId: "todaytodo-9bb22",
  storageBucket: "todaytodo-9bb22.appspot.com",
  messagingSenderId: "920131132737",
  appId: "1:920131132737:web:e7aa67fbb35e89b9be15c0",
  measurementId: "G-8RHZK04KXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

export  {
    app, analytics, auth, db
}

