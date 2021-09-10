<template>
  <q-page>
    <div class="text-center">
      <h6>{{ store.state.today }}</h6>
    </div>
    <div>
      <q-card
        v-for="todo in store.state.todoList"
        :key="todo.uid"
        class="q-ma-sm"
      >
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
                  @click="
                    store.methods.toggleTodo(
                      store.state.user.uid,
                      store.state.today,
                      todo.uid
                    ),
                      (todo.isDone = !todo.isDone)
                  "
                />
              </div>
            </div>
          </div>
        </q-card-section>
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
            v-model="text"
            @keyup.enter="prompt = false"
          />
          <q-rating v-model="rating" size="2em" :max="3" color="red" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="취소" v-close-popup />
          <q-btn flat label="추가" v-close-popup @click="todoAdd" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { inject, onUnmounted, ref } from "vue";

export default {
  name: "Today",
  setup() {
    const store = inject("store");

    const text = ref("");

    async function todoAdd() {
      store.methods.addTodo(
        store.state.user.uid,
        store.state.today,
        text,
        false,
        2
      );
    }

    return {
      store,
      text,
      todoAdd,
    };
  },
};
</script>

<style></style>
