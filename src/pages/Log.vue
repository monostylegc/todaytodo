<template>
  <q-page>
    <div v-for="achive in store.state.achiveList" :key="achive.date">
      <q-card class="q-ma-sm" flat>
        <q-card-section>
          {{ achive.date }}달성률
          <q-linear-progress
            :value="achive.achivement"
            rounded
            color="secondary"
            size="10px"
            class="q-my-sm"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const store = inject("store");

    store.methods.getAchivement(store.state.user.uid);

    return {
      store,
    };
  },
};
</script>

<style></style>
