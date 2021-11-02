<template>
  <div class="board">
    <div class="board_part todo">
      <h2>Todo</h2>
      <standard-card
        :mode="modeSwitch"
        v-for="task in todoTasks"
        :key="task.id"
        @click="targetTask($event)"
      >
        <template v-slot:header>{{ task.title }}</template>
        <template v-slot:description>{{ task.description }}</template>
        <template v-slot:taskId> {{ task.id }} </template>
      </standard-card>
    </div>
    <div class="board_part in-progress">
      <h2>In Progress</h2>
      <standard-card
        :mode="modeSwitch"
        v-for="task in inProgressTasks"
        :key="task.id"
        @click="targetTask($event)"
      >
        <template v-slot:header>{{ task.title }}</template>
        <template v-slot:description>{{ task.description }}</template>
        <template v-slot:taskId> {{ task.id }} </template>
      </standard-card>
    </div>
    <div class="board_part done">
      <h2>Done</h2>
      <standard-card
        :mode="modeSwitch"
        v-for="task in doneTasks"
        :key="task.id"
        @click="targetTask($event)"
      >
        <template v-slot:header>{{ task.title }}</template>
        <template v-slot:description>{{ task.description }}</template>
        <template v-slot:taskId> {{ task.id }} </template>
      </standard-card>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    todoTasks() {
      return this.$store.getters.getTodoTasks;
    },
    inProgressTasks() {
      return this.$store.getters.getInProgressTasks;
    },
    doneTasks() {
      return this.$store.getters.getDoneTasks;
    },
    modeSwitch() {
      if (
        this.$store.getters.isDeletingTask === true &&
        this.$store.getters.isEditingTask === false
      ) {
        return "delete-style";
      } else if (
        this.$store.getters.isEditingTask === true &&
        this.$store.getters.isDeletingTask === false
      ) {
        return "edit-style";
      } else return "default-style";
    },
  },
  methods: {
    targetTask(event) {
      const cardId = event.currentTarget.lastChild.innerText;
      if (this.$store.getters.isDeletingTask === true) {
        this.$store.commit("deleteTask", cardId);
      } else if (this.$store.getters.isEditingTask === true) {
        this.$store.commit("editTask", cardId)
      } else return
    },
  },
};
</script>

<style scoped>
.board {
  background: linear-gradient(rgb(14, 126, 190), rgb(5, 91, 141) 70%);
  width: 90vw;
  margin: auto;
  border-radius: 10px;
  padding: 10px;
  overflow: auto;
}

.board_part {
  width: 33.3%;
  min-height: 15%;
  margin: auto;
  float: left;
  text-align: center;
  color: white;
  text-shadow: -3px 2px 3px black;
}

h2 {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
