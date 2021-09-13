<template>
  <router-view />
</template>
<script>
import { provide } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "boot/firebase";

import { useRouter } from "vue-router";
import store from "./store";

export default {
  name: "App",

  setup() {
    const router = useRouter();
    provide("store", store);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        store.state.user.uid = user.uid;
        store.state.user.email = user.email;
        store.state.user.name = user.displayName;
        store.methods.getTodos(store.state.user.uid, store.state.today);
        router.push("/");
      } else {
        console.log(user);
        store.state.user.uid = null;
        store.state.user.email = null;
        store.state.user.name = null;
        store.state.todoList = [];
        store.state.achiveList = [];
        router.replace("/auth");
      }
    });
  },
};
</script>
