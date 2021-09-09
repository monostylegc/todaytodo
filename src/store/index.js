import { reactive } from 'vue'
import {  getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from 'boot/firebase'

const provider = new GoogleAuthProvider();
const auth = getAuth();

const state = reactive({
    
})

const methods = {
    googleSignIn(){
        signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }
}

export default {
    state, methods
}