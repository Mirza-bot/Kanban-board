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
        },
        {
          id: 4,
          title: "Learn React",
          description: "Hang in there and learn React properly!",
        },
      ],
      inProgress: [
        {
          id: 2,
          title: "Learn JavaScript",
          description: "Read Eloquent JavaScript!",
        },
      ],
      done: [
        {
          id: 3,
          title: "Learn HTML and CSS!",
          description: "pretty obivous!",
        },
      ],
      // global switches for turning global UI-functions on and off
      uiSwitches: {
        creatingTask: false,
        editingTask: false,
        deletingTask: false,
        draggableTasks: true,
      },
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
    isCreatingTask(state) {
      return state.uiSwitches.creatingTask;
    },
    isEditingTask(state) {
      return state.uiSwitches.editingTask;
    },
    isDeletingTask(state) {
      return state.uiSwitches.deletingTask;
    },
  },
  actions: {
    setNewTask(context, data) {
      const taskData = {
        taskId: new Date().toISOString(),
        title: data.title,
        description: data.description,
        deadLine: data.deadLine,
      };

      context.commit("saveNewTask", taskData);
    },
  },
  mutations: {
    saveNewTask(state, payload) {
      state.todo.push(payload);
    },
    creatingSwitch(state) {
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
  },
});

const app = createApp(App);

app.use(store);

app.component("standard-button", StandardButton);
app.component("standard-card", StandardCard);
app.component("pop-up-window", PopUpWindow);

app.mount("#app");
