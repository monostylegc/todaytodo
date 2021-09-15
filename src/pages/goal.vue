<template>
  <div>
    <q-card class="q-ma-sm">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">목표</div>
        <div class="text-subtitle2">Description</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="left">
        <q-rating
          v-model="model3"
          max="10"
          size="1.5em"
          color="red"
          color-selected="red-9"
          icon="favorite_border"
          icon-selected="favorite"
          icon-half="favorite"
          no-dimming
        />
      </q-card-actions>
    </q-card>
  </div>
  <q-dialog v-model="store.state.addDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">할 일 추가</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          label="할 일을 입력해주세요"
          dense
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="취소" v-close-popup />
        <q-btn flat label="추가" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { inject, ref } from "vue";
export default {
  name: "Goal",
  setup() {
    const store = inject("store");

    return {
      store,
    };
  },
};
</script>

<style></style>
