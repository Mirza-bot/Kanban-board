<template>
  <div class="board">
    <div class="board_part todo">
      <h2>Todo</h2>
      <transition-group name="card">
        <standard-card
          :mode="modeSwitch"
          v-for="task in todoTasks"
          :key="task.id"
          @click="targetTask($event)"
          :draggable="true"
          @dragstart="startDrag($event.currentTarget), dragSwitch(true)"
          @dragend="dragSwitch(false)"
        >
          <template v-slot:header>{{ task.title }}</template>
          <template v-slot:description>{{ task.description }}</template>
          <template v-slot:deadline>{{ task.deadLine }}</template>
          <template v-slot:taskId> {{ task.id }} </template>
        </standard-card>
      </transition-group>
      <transition name="card">
        <standard-card
          mode="drop-spot"
          v-show="dragging"
          id="todo"
          @dragenter.prevent
          @dragover.prevent
          @drop="dropCard($event)"
        >
          <template v-slot:header><i class="fas fa-plus-circle"></i></template>
        </standard-card>
      </transition>
    </div>
    <div class="board_part">
      <h2>In Progress</h2>
      <transition-group name="card">
        <standard-card
          :mode="modeSwitch"
          v-for="task in inProgressTasks"
          :key="task.id"
          @click="targetTask($event)"
          :draggable="true"
          @dragstart="startDrag($event.currentTarget), dragSwitch(true)"
          @dragend="dragSwitch(false)"
        >
          <template v-slot:header>{{ task.title }}</template>
          <template v-slot:description>{{ task.description }}</template>
          <template v-slot:deadline>{{ task.deadLine }}</template>
          <template v-slot:taskId> {{ task.id }} </template>
        </standard-card>
      </transition-group>
      <transition name="card">
        <standard-card
          mode="drop-spot"
          v-show="dragging"
          id="inProgress"
          @dragenter.prevent
          @dragover.prevent
          @drop="dropCard($event)"
        >
          <template v-slot:header><i class="fas fa-plus-circle"></i></template>
        </standard-card>
      </transition>
    </div>
    <div class="board_part">
      <h2>Done</h2>
      <transition-group name="card">
        <standard-card
          :mode="modeSwitch"
          v-for="task in doneTasks"
          :key="task.id"
          @click="targetTask($event)"
          :draggable="true"
          @dragstart="startDrag($event.currentTarget), dragSwitch(true)"
          @dragend="dragSwitch(false)"
        >
          <template v-slot:header>{{ task.title }}</template>
          <template v-slot:description>{{ task.description }}</template>
          <template v-slot:deadline>{{ task.deadLine }}</template>
          <template v-slot:taskId> {{ task.id }} </template>
        </standard-card>
      </transition-group>
      <transition name="card">
        <standard-card
          mode="drop-spot"
          id="done"
          v-show="dragging"
          @dragenter.prevent
          @dragover.prevent
          @drop="dropCard($event)"
        >
          <template v-slot:header><i class="fas fa-plus-circle"></i></template>
        </standard-card>
      </transition>
    </div>
  </div>
</template>

<script>
import StandardCard from "../ui/StandardCard.vue";
export default {
  components: { StandardCard },
  data() {
    return {
      dragged: {
        id: null,
        title: null,
        description: null,
        deadLine: null,
      },
    };
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
    dragging() {
      return this.$store.getters.dragging;
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
      this.dragged = draggedCard;
      this.$store.commit("dragged", draggedCard);
    },
    dropCard(event) {
      const targetList = event.currentTarget.id;
      if (
        targetList === "todo" ||
        targetList === "inProgress" ||
        targetList === "done"
      ) {
        this.$store.commit("deleteTask", this.dragged.id);
        this.$store.commit("dropped", targetList);
      }
    },
    dragSwitch(boolean) {
      this.$store.commit("dragSwitch", boolean);
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
  min-height: 80vh;
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

.fas {
  text-shadow: -2px 2px 2px black;
  pointer-events: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.card-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.card-enter-active {
  transition: all 0.1s ease-out;
}

.card-enter-to {
  opacity: 1;
  transform: scale(1);
}

.card-leave-from {
  opacity: 1;
  transform: scale(1);
}

.card-leave-active {
  transition: all 0.1s ease-in;
}

.card-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
