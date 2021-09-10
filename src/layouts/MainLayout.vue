<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal bordered class="bg-white text-grey-8">
      <q-toolbar>
        <q-toolbar-title> 오늘의 할 일 </q-toolbar-title>
        <q-space />

        <q-btn flat label="로그아웃" @click="store.methods.logOut" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          fab
          icon="add"
          color="primary"
          @click="
            store.state.todoList.length >= 5
              ? $q.notify('5개이상 등록할 수 없다')
              : (store.state.addDialog = !store.state.addDialog)
          "
        />
      </q-page-sticky>
    </q-page-container>

    <q-footer reveal bordered class="bg-white text-grey-8">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-route-tab name="Todo" label="Todo" to="/" />
        <q-route-tab name="Log" label="Log" to="/log" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { Quasar, Notify } from "quasar";
import { defineComponent, ref, inject } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const store = inject("store");

    const tab = ref("Today");
    return {
      tab,
      store,
    };
  },
});
</script>
