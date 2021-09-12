import { reactive } from 'vue'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { collection, getDocs, getDoc, doc, setDoc,  deleteDoc, query, addDoc, updateDoc } from "firebase/firestore"
import { db, auth } from 'boot/firebase'

const provider = new GoogleAuthProvider();
const date = new Date();

const state = reactive({
    user:{
      name:'',
      email:'',
      uid:'',
    },
    todoList:[],
    today: date.toLocaleDateString(),
    addDialog: false,
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
          await setDoc(doc(db, "user", userID), {
          name: user.displayName,
          email: user.email,
          });
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

    }).catch((error) => {
  // An error happened.
    });
  },

  async getTodos(userID, date){
    state.todoList = [];
    const q = query(collection(db, "user/"+userID+"/date/"+date+"/todo"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      state.todoList.push({
        uid: doc.id,
        title: doc.data().title,
        isDone: doc.data().isDone,
        importance: doc.data().importance
      })
    });
    console.log(state.today);
  },

  async toggleTodo(userID, date, todoID){
    const todo = doc(db, "user/"+userID+"/date/"+date+"/todo", todoID);
    const todoSnap = await getDoc(todo);
    if(todoSnap.data().isDone){
      await updateDoc(todo, {
        isDone: false
      });
    }
    else{
      await updateDoc(todo, {
        isDone: true
      });
    }
  },

  async addTodo(userID, date, title, isDone, importance){
    await addDoc(collection(db, "/user/"+userID+"/date/"+date+"/todo/"), {
      title: title,
      isDone: isDone,
      importance: importance
    }).then((result)=>{
      
      state.todoList.push({
        uid: result.id,
        title: title,
        isDone: false,
        importance: importance,
      });
    });
    
  },

  async removeTodo(userID, date, todoID){
    await deleteDoc(doc(db, "/user/"+userID+"/date/"+date+"/todo/", todoID));
    var tempList = state.todoList.filter((e)=>{
      return e.uid != todoID
    });
    state.todoList = tempList;
  },
}

export default {
    state, methods
}