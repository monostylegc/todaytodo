<template>
  <q-page>
    <div class="text-center"><h6>하루 할 일</h6></div>
    <div>
      <q-card v-for="(todo, i) in todos" :key="i" class="q-ma-sm">
        <q-card-section :class="todo.isDone ? 'bg-grey-4' : 'bg-white'">
          <div class="row">
            <div class="col-7">
              <div class="row">
                {{ todo.title }}
              </div>
              <div class="row">
                <q-rating
                  v-model="todo.importance"
                  size="1.5em"
                  :max="3"
                  color="red"
                  class="q-mt-sm"
                />
              </div>
            </div>
            <div class="col-5 self-center">
              <div class="row justify-around">
                <q-btn flat dense icon="eva-trash-2-outline" />

                <q-btn
                  flat
                  dense
                  :icon="
                    todo.isDone
                      ? 'eva-done-all-outline'
                      : 'eva-minus-circle-outline'
                  "
                  class="q-ml-md"
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { inject } from "vue";

export default {
  name: "Today",
  setup() {
    const store = inject("store");

    const todos = [
      {
        title: "밥묵기",
        isDone: false,
        importance: 2,
      },
      {
        title: "빨래하기",
        isDone: true,
        importance: 3,
      },
    ];

    return {
      todos,
      store,
    };
  },
};
</script>

<style></style>
