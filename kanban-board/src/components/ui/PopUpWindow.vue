<template>
  <div @mousemove="toEditData">
    <header>
      <h1 v-if="modeSwitch">create a new task</h1>
      <h1 v-else>edit this task</h1>
    </header>
    <ul>
      <li>
        <label for="taskTitle">Title</label>
      </li>
      <li>
        <p class="noTitle" v-show="noTitle">A task needs at least a Title!</p>
        <input
          type="text"
          name="Title"
          id="taskTitle"
          v-model="task.taskTitle"
          @input="noTitle = false"
        />
      </li>
      <li>
        <label for="taskDescription">Description</label>
      </li>
      <li>
        <textarea
          type="text"
          id="taskDescription"
          rows="6"
          cols="50"
          v-model="task.taskDescription"
        />
      </li>
      <li>
        <label for="deadline">Deadline</label>
      </li>
      <li>
        <input
          type="date"
          name="Deadline"
          id="deadLine"
          v-model="task.deadLine"
        />
      </li>
    </ul>
    <standard-button
      mode="style-accept"
      @click="
        setTaskData(
          task.taskTitle,
          task.taskDescription,
          task.deadLine,
          task.boardPath
        )
      "
      >Done</standard-button
    >
    <standard-button
      mode="style-cancle"
      @click="closeTaskCreation"
      v-show="modeSwitch"
      >Cancle</standard-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: {
        taskTitle: "",
        taskDescription: "",
        deadLine: "",
        boardPath: null,
      },
      noTitle: false,
    };
  },
  methods: {
    setTaskData(title, description, deadLine, boardPath) {
      if (title !== "" && this.$store.getters.isCreatingTask === true) {
        const newTask = {
          title: title,
          description: description,
          deadLine: deadLine,
          boardPath: boardPath,
        };
        this.$store.dispatch("setNewTask", newTask);
        this.$store.commit("creatingSwitch");
        setTimeout(() => {
          this.task.taskTitle = "";
          this.task.taskDescription = "";
          this.task.deadLine = "";
          this.task.boardPath = null;
        }, 200);
      } else {
        this.noTitle = true;
      }
    },
    closeTaskCreation() {
      if (this.$store.getters.isEditingTask === true) {
        this.$store.commit("editingSwitch");
      }
      this.$store.commit("creatingSwitch");
      setTimeout(() => {
        this.task.taskTitle = "";
        this.task.taskDescription = "";
        this.task.deadLine = "";
        this.noTitle = false;
      }, 200);
    },
  },
  computed: {
    modeSwitch() {
      if (this.$store.getters.isEditingTask === true) {
        const retrievedTaskData = this.$store.getters.getEditedTask;
        this.task.taskTitle = retrievedTaskData.title;
        this.task.taskDescription = retrievedTaskData.description;
        if (
          retrievedTaskData.deadLine !== null &&
          retrievedTaskData.deadLine !== "No deadline"
        ) {
          const newDeadLine = retrievedTaskData.deadLine.split(".");
          retrievedTaskData.deadLine =
            newDeadLine[2] + "-" + newDeadLine[1] + "-" + newDeadLine[0];
        }
        this.task.deadLine = retrievedTaskData.deadLine;
        this.task.boardPath = retrievedTaskData.boardPath;
        return false;
      } else return true;
    },
  },
};
</script>

<style scoped>
div {
  width: 60%;
  text-align: center;
  background: linear-gradient(rgb(14, 126, 190), rgb(5, 91, 141) 70%);
  color: white;
  text-shadow: -3px 2px 3px black;
  border: 3px solid white;
  border-radius: 15px;
  position: absolute;
  z-index: 1;
  opacity: 0.985;
  margin-left: auto;
  margin-right: auto;
  margin-top: -3vh;
  left: 0;
  right: 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

label {
  padding: 15px;
  font-size: 1.5rem;
}
li {
  margin-bottom: 1rem;
}

p {
  color: red;
}
</style>
