<template>
  <div class="board">
    <div
      class="board_part todo"
      @dragenter.prevent
      @dragover.prevent
      @drop="stopDrag($event, item)"
    >
      <h2>Todo</h2>
      <standard-card
        :mode="modeSwitch"
        v-for="task in todoTasks"
        :key="task.id"
        @click="targetTask($event)"
        :draggable="isDraggable"
        @dragstart="startDrag($event.currentTarget)"
      >
        <template v-slot:header>{{ task.title }}</template>
        <template v-slot:description>{{ task.description }}</template>
        <template v-slot:deadline>{{ task.deadLine }}</template>
        <template v-slot:taskId> {{ task.id }} </template>
      </standard-card>
    </div>
    <div
      class="board_part inProgress"
      @dragenter.prevent
      @dragover.prevent
      @drop="stopDrag($event)"
    >
      <h2>In Progress</h2>
      <standard-card
        :mode="modeSwitch"
        v-for="task in inProgressTasks"
        :key="task.id"
        @click="targetTask($event)"
        :draggable="isDraggable"
        @dragstart="startDrag($event.currentTarget)"
      >
        <template v-slot:header>{{ task.title }}</template>
        <template v-slot:description>{{ task.description }}</template>
        <template v-slot:deadline>{{ task.deadLine }}</template>
        <template v-slot:taskId> {{ task.id }} </template>
      </standard-card>
    </div>
    <div
      class="board_part done"
      @dragenter.prevent
      @dragover.prevent
      @drop="stopDrag($event)"
    >
      <h2>Done</h2>
      <standard-card
        :mode="modeSwitch"
        v-for="task in doneTasks"
        :key="task.id"
        @click="targetTask($event)"
        :draggable="isDraggable"
        @dragstart="startDrag($event.currentTarget)"
      >
        <template v-slot:header>{{ task.title }}</template>
        <template v-slot:description>{{ task.description }}</template>
        <template v-slot:deadline>{{ task.deadLine }}</template>
        <template v-slot:taskId> {{ task.id }} </template>
      </standard-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dragged: {
        id: null,
        title: null,
        description: null,
        deadLine: null
      }
    }
  },
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
    isDraggable() {
      return this.$store.getters.isDraggable;
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
      if (this.$store.getters.isDeletingTask === true) {
        const cardId = event.currentTarget.lastChild.innerText;
        this.$store.commit("deleteTask", cardId);
      } else if (this.$store.getters.isEditingTask === true) {
        const cardData = {
          id: event.currentTarget.lastChild.innerText,
          title: event.currentTarget.firstChild.innerText,
          description: event.currentTarget.firstChild.nextSibling.innerText,
          deadLine:
            event.currentTarget.firstChild.nextSibling.nextSibling.innerText,
        };
        this.$store.commit("editTask", cardData);
      } else return;
    },
    startDrag(card) {
      const draggedCard = {
        id: card.lastChild.innerText,
        title: card.firstChild.innerText,
        description: card.firstChild.nextSibling.innerText,
        deadLine: card.firstChild.nextSibling.nextSibling.innerText,
      };
      this.dragged = draggedCard
      this.$store.commit("dragged", draggedCard);
    },
    stopDrag(event) {
      const targetList = event.srcElement.classList[1];
      this.$store.commit("deleteTask", this.dragged.id);
      this.$store.commit("dropped", targetList);
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
  padding-bottom: 120px;
}

h2 {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
