import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import StandardButton from "./components/ui/StandardButton.vue";
import StandardCard from "./components/ui/StandardCard.vue";
import PopUpWindow from "./components/ui/PopUpWindow.vue";

const store = createStore({
  state() {
    return {
      todo: [
        {
          id: 1,
          title: "Learn Vue.js",
          description: "Hang in there and learn Vue properly!",
          deadLine: "13.04.2021",
        },
        {
          id: 4,
          title: "Learn React",
          description: "Hang in there and learn React properly!",
          deadLine: "28.01.2020",
        },
      ],
      inProgress: [
        {
          id: 2,
          title: "Learn JavaScript",
          description: "Read Eloquent JavaScript!",
          deadLine: "19.09.2019",
        },
      ],
      done: [
        {
          id: 3,
          title: "Learn HTML and CSS!",
          description: "pretty obivous!",
          deadLine: "28.01.2020",
        },
      ],
      // global switches for turning global UI-functions on and off
      uiSwitches: {
        creatingTask: false,
        editingTask: false,
        deletingTask: false,
        isDragging: false,
      },
      // temporary Store for the last edited Task
      editedTask: {
        id: null,
        title: null,
        description: null,
        deadLine: null,
      },
      draggedTask: {
          id: null,
          title: null,
          description: null,
          deadLine: null
      }
    };
  },
  getters: {
    getTodoTasks(state) {
      return state.todo;
    },
    getInProgressTasks(state) {
      return state.inProgress;
    },
    getDoneTasks(state) {
      return state.done;
    },
    getEditedTask(state) {
      return state.editedTask;
    },
    isCreatingTask(state) {
      return state.uiSwitches.creatingTask;
    },
    isEditingTask(state) {
      return state.uiSwitches.editingTask;
    },
    isDeletingTask(state) {
      return state.uiSwitches.deletingTask;
    },
    dragging(state) {
      return state.uiSwitches.isDragging;
    },
  },
  actions: {
    setNewTask(context, data) {
      let date = "";
      if (data.deadLine === "") {
        date = "No deadline";
      } else if (data.deadLine.includes("-") === true) {
        date = data.deadLine.split("-");
        date = date[2] + "." + date[1] + "." + date[0];
      } else date = data.deadLine;
      const taskData = {
        id: new Date().toISOString(),
        title: data.title,
        description: data.description,
        deadLine: date,
      };

      context.commit("saveNewTask", taskData);
    },
  },
  mutations: {
    saveNewTask(state, payload) {
      state.todo.push(payload);
    },
    creatingSwitch(state) {
      state.uiSwitches.editingTask = false;
      state.uiSwitches.creatingTask = !state.uiSwitches.creatingTask;
    },
    editingSwitch(state) {
      state.uiSwitches.deletingTask = false;
      state.uiSwitches.editingTask = !state.uiSwitches.editingTask;
    },
    deletingSwitch(state) {
      state.uiSwitches.editingTask = false;
      state.uiSwitches.deletingTask = !state.uiSwitches.deletingTask;
    },
    dragSwitch(state, payload) {
        state.uiSwitches.isDragging = payload
    },
    deleteTask(state, payload) {
      const newTodo = state.todo.filter(
        (task) => task["id"].toString() !== payload
      );
      state.todo = newTodo;
      const newProgress = state.inProgress.filter(
        (task) => task["id"].toString() !== payload
      );
      state.inProgress = newProgress;
      const newDone = state.done.filter(
        (task) => task["id"].toString() !== payload
      );
      state.done = newDone;
    },
    editTask(state, payload) {
      state.todo.forEach((element) => {
        if (element["id"].toString() === payload.id) {
          state.uiSwitches.creatingTask = !state.uiSwitches.creatingTask;
          const indexOfElement = state.todo.indexOf(element);
          state.todo.splice(indexOfElement, 1);
          state.editedTask = element;
        }
      });
      state.inProgress.forEach((element) => {
        if (element["id"].toString() === payload.id) {
          state.uiSwitches.creatingTask = !state.uiSwitches.creatingTask;
          const indexOfElement = state.inProgress.indexOf(element);
          state.inProgress.splice(indexOfElement, 1);
          state.editedTask = element;
        }
      });
      state.done.forEach((element) => {
        if (element["id"].toString() === payload.id) {
          state.uiSwitches.creatingTask = !state.uiSwitches.creatingTask;
          const indexOfElement = state.done.indexOf(element);
          state.done.splice(indexOfElement, 1);
          state.editedTask = element;
        }
      });
    },
    dragged(state, payload) {
        state.draggedTask = payload
    },
    dropped(state, target) {
        state[target].push(state.draggedTask)
    }
  },
});

const app = createApp(App);

app.use(store);

app.component("standard-button", StandardButton);
app.component("standard-card", StandardCard);
app.component("pop-up-window", PopUpWindow);

app.mount("#app");
