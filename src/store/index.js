import { reactive } from 'vue'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { collection, getDocs, getDoc, doc, setDoc,  deleteDoc, query, addDoc, updateDoc } from "firebase/firestore"
import { db, auth } from 'boot/firebase'

const provider = new GoogleAuthProvider();
const date = new Date();

Date.prototype.yyyymmdd = function()
{
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
 
    return yyyy + (mm[1] ? mm : '0'+mm[0]) + (dd[1] ? dd : '0'+dd[0]);
}

const state = reactive({
    user:{
      name:'',
      email:'',
      uid:'',
    },
    todoList:[],
    achivement: 0,
    achiveList:[],
    today: date.yyyymmdd(),
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
    const achivementSnap = await getDoc(doc(db, "/user/"+userID+"/date/",date));
    state.achivement = achivementSnap.data().achivement;
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
    this.setAchivement(userID,date)
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

  async setAchivement(userID, date ){
    state.achivement = this.calcAchivement();
    const todayAchive = doc(db, "/user/"+userID+"/date/"+date);
    await setDoc(todayAchive, {
      achivement: state.achivement
    });
  },

  async getAchivement(userID){
    state.achiveList = [];
    const q = query(collection(db, "user/"+userID+"/date/"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      state.achiveList.push({
        date: doc.id,
        achivement: doc.data().achivement
      })
    });
  },

  calcAchivement(){
    let achive,done=0,temp = 0;

    let doneList = state.todoList.filter((e) => {
      return e.isDone != false;
    });

    for (let i = 0; i < state.todoList.length; i++) {
      temp = temp + state.todoList[i].importance;
    }

    for (let v = 0; v < doneList.length; v++) {
      done = done +  doneList[v].importance;
    }

    if (temp === 0 ) {
      return 0;
    } else {
      achive = done/temp;
      return achive;
    }
  }
}

export default {
    state, methods
}