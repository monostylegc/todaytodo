<template>
  <q-page class="constrain">
    <div>
      <q-card class="q-ma-sm" flat>
        <q-card-section>
          {{ store.state.today }}달성률
          <q-linear-progress :value="achivement" class="q-my-sm" />
        </q-card-section>
      </q-card>
    </div>
    <div>
      <q-card
        v-for="todo in store.state.todoList"
        :key="todo.uid"
        class="q-ma-sm"
      >
        <q-card-section :class="todo.isDone ? 'bg-grey-6' : 'bg-white'">
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
                  readonly
                />
              </div>
            </div>
            <div class="col-5 self-center">
              <div class="row justify-around">
                <q-btn
                  flat
                  dense
                  icon="eva-trash-2-outline"
                  @click="
                    store.methods.removeTodo(
                      store.state.user.uid,
                      store.state.today,
                      todo.uid
                    )
                  "
                />

                <q-btn
                  flat
                  dense
                  :icon="
                    todo.isDone ? 'eva-refresh-outline' : 'eva-done-all-outline'
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
          <div class="q-mt-md text-caption">
            중요도 :
            <q-rating v-model="importance" size="2em" :max="3" color="red" />
          </div>
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
import { inject, ref, computed } from "vue";

export default {
  name: "Today",
  setup() {
    const store = inject("store");

    const text = ref("");
    const importance = ref(1);

    async function todoAdd() {
      store.methods.addTodo(
        store.state.user.uid,
        store.state.today,
        text.value,
        false,
        importance.value
      );
      text.value = "";
      importance.value = 1;
    }

    const achivement = computed(() => {
      let achive,
        done = 0;
      let temp = 0;

      let doneList = store.state.todoList.filter((e) => {
        return e.isDone != false;
      });

      for (let i = 0; i < store.state.todoList.length; i++) {
        temp = temp + store.state.todoList[i].importance;
      }

      for (let v = 0; v < doneList.length; v++) {
        done = done + doneList[v].importance;
      }

      achive = done / temp;
      return achive;
    });

    return {
      store,
      text,
      importance,
      todoAdd,
      achivement,
    };
  },
};
</script>

<style></style>
