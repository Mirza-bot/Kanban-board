import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import StandardButton from "./components/ui/StandardButton.vue";
import StandardCard from "./components/ui/StandardCard.vue";
import PopUpWindow from "./components/ui/PopUpWindow.vue";
import LoadingSpinner from "./components/ui/LoadingSpinner.vue";
import ErrorMessage from "./components/ui/ErrorMessage.vue";

const store = createStore({
  state() {
    return {
      userData: {
        token: null,
        id: null,
        tokenExpiration: null,
      },
      todo: [
        {
          id: 1,
          title: "Learn Vue.js",
          description: "Hang in there and learn Vue properly!",
          deadLine: "13.04.2021",
        },
        {
          id: 4,
          title: "Drag Me!",
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
          title: "Drag Me!",
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
        authenticating: false,
        isLoading: false,
        errorOccurrence: false,
      },
      // temporary Store for the last edited Task
      editedTask: {
        id: null,
        title: null,
        description: null,
        deadLine: null,
        boardPath: null,
      },
      // temporary Store for the last dragged Task
      draggedTask: {
        id: null,
        title: null,
        description: null,
        deadLine: null,
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
    isAuthenticating(state) {
      return state.uiSwitches.authenticating;
    },
    isLoading(state) {
      return state.uiSwitches.isLoading;
    },
    errorOccurred(state) {
      return state.uiSwitches.errorOccurrence;
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
        boardPath: data.boardPath,
      };

      context.commit("saveNewTask", taskData);
    },
    async signup(context, payload) {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAueLlzB1u8Od9Ra0Wms0OtxDjQiegUOU8",
        {
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(response.message || "Failed to authenticate.");
        context.commit("clearError", true);
        throw error;
      }
      console.log(responseData);
      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
    },
    async login(context, payload) {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAueLlzB1u8Od9Ra0Wms0OtxDjQiegUOU8",
        {
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(response.message || "Failed to authenticate.");
        context.commit("clearError", true);
        throw error;
      }
      console.log(responseData);
      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
    },
  },
  mutations: {
    setUser(state, payload) {
      state.userData.token = payload.token;
      state.userData.id = payload.userId;
      state.userData.tokenExpiration = payload.tokenExpiration;
      console.log(state.userData)
    },
    loading(state) {
      state.uiSwitches.isLoading = !state.uiSwitches.isLoading;
    },
    saveNewTask(state, payload) {
      const path = payload.boardPath;
      if (path !== null) {
        state[path].push(payload);
      } else state.todo.push(payload);
    },
    creatingSwitch(state) {
      state.uiSwitches.deletingTask = false;
      state.uiSwitches.creatingTask = !state.uiSwitches.creatingTask;
      setTimeout(() => {
        state.uiSwitches.editingTask = false;
      }, 200);
    },
    editingSwitch(state) {
      state.uiSwitches.deletingTask = false;
      state.uiSwitches.editingTask = !state.uiSwitches.editingTask;
    },
    deletingSwitch(state) {
      state.uiSwitches.editingTask = false;
      state.uiSwitches.deletingTask = !state.uiSwitches.deletingTask;
    },
    autenticatingSwitch(state) {
      state.uiSwitches.isEditingTask = false;
      state.uiSwitches.isCreatingTask = false;
      state.uiSwitches.isDeletingTask = false;
      state.uiSwitches.authenticating = !state.uiSwitches.authenticating;
    },
    dragSwitch(state, payload) {
      state.uiSwitches.isDragging = payload;
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
          state.editedTask = payload;
        }
      });
      state.inProgress.forEach((element) => {
        if (element["id"].toString() === payload.id) {
          state.uiSwitches.creatingTask = !state.uiSwitches.creatingTask;
          const indexOfElement = state.inProgress.indexOf(element);
          state.inProgress.splice(indexOfElement, 1);
          state.editedTask = payload;
        }
      });
      state.done.forEach((element) => {
        if (element["id"].toString() === payload.id) {
          state.uiSwitches.creatingTask = !state.uiSwitches.creatingTask;
          const indexOfElement = state.done.indexOf(element);
          state.done.splice(indexOfElement, 1);
          state.editedTask = payload;
        }
      });
    },
    dragged(state, payload) {
      state.draggedTask = payload;
    },
    dropped(state, target) {
      state[target].push(state.draggedTask);
    },
    clearError(state, payload) {
      state.uiSwitches.errorOccurrence = payload;
    },
  },
});

const app = createApp(App);

app.use(store);

app.component("standard-button", StandardButton);
app.component("standard-card", StandardCard);
app.component("pop-up-window", PopUpWindow);
app.component("loading-spinner", LoadingSpinner);
app.component("error-message", ErrorMessage);

app.mount("#app");
