import { reactive } from 'vue'
import {  getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore"
import { app } from 'boot/firebase'

const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore();

const state = reactive({
    
})

const methods = {
    async googleSignIn (){
      signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        let userID = user.uid;
      
        const userSnap = await getDoc(doc(db, "user", userID));
        if (userSnap.exists()) {
          console.log("Document data:", userSnap.data());
        } else {
        console.log("No such document!");
        }
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
  },
  logOut(){
    signOut(auth).then(() => {
  // Sign-out successful.
    }).catch((error) => {
  // An error happened.
    });
  }
}

export default {
    state, methods
}