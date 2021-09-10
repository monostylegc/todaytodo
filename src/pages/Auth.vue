<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-btn
          class="q-px-xl"
          color="primary"
          text-color="white"
          unelevated
          label="Google LoggIn"
          no-caps
          @click="store.methods.googleSignIn"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "Auth",

  setup() {
    const store = inject("store");

    return {
      store,
    };
  },
});
</script>
