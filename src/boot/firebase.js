import { boot } from 'quasar/wrappers'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

console.log("ㅋㅋㅋ")
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  return{
    app, analytics
  }
})
