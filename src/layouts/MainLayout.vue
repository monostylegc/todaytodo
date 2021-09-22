<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal bordered class="bg-white text-grey-8">
      <q-toolbar class="constrain">
        <q-btn
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="eva-menu-outline"
        />
        <q-toolbar-title> 작심1일 </q-toolbar-title>
        <q-space />

        <q-btn
          flat
          icon="logout"
          @click="store.methods.logOut"
          v-show="store.state.user.uid"
        />
      </q-toolbar>
    </q-header>

    <q-page-container class="constrain">
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          v-show="this.$route.fullPath === '/'"
          fab
          icon="add"
          color="green"
          @click="
            store.state.todoList.length >= 5
              ? $q.notify({
                  message: '5개 이상 등록할 수 없습니다.',
                  color: 'red',
                })
              : (store.state.addDialog = !store.state.addDialog)
          "
        />
      </q-page-sticky>
    </q-page-container>
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item v-ripple clickable @click="this.$router.push(menuItem.to)">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-footer reveal bordered class="bg-white text-grey-8"> </q-footer>
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
    const menuList = [
      {
        icon: "eva-checkmark-circle-outline",
        label: "오늘 할 일",
        to: "/",
      },
      {
        icon: "eva-activity-outline",
        label: "기록",
        to: "/log",
      },
      {
        icon: "help",
        iconColor: "primary",
        label: "Help",
      },
    ];

    return {
      drawer: ref(false),
      menuList,
      tab,
      store,
    };
  },
});
</script>
