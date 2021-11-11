import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import StandardButton from "./components/ui/StandardButton.vue";
import StandardCard from "./components/ui/StandardCard.vue";
import PopUpWindow from "./components/ui/PopUpWindow.vue";
import LoadingSpinner from "./components/ui/LoadingSpinner.vue";
import ErrorMessage from "./components/ui/ErrorMessage.vue";

let timer;

const store = createStore({
  state() {
    return {
      userData: {
        token: null,
        id: null,
        tokenExpiration: null,
      },
      boardData: {},
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
    getBoardData(state) {
      return state.boardData;
    },
    getUserId(state) {
      return state.userData.id;
    },
    getUserToken(state) {
      return state.userData.token;
    },
    getTodoTasks(state) {
      const todos = state.boardData.todo.slice(1);
      return todos;
    },
    getInProgressTasks(state) {
      const progress = state.boardData.inProgress.slice(1);
      return progress;
    },
    getDoneTasks(state) {
      const dones = state.boardData.done.slice(1);
      return dones;
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
    isLoggedIn(state) {
      if (state.userData.token !== null) {
        return true;
      } else return false;
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

      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("tokenExpiration", expirationDate);

      timer = setTimeout(() => {
        context.dispatch("logOut");
      }, expiresIn);

      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });

      const token = context.getters.getUserToken;

      const sendBoardData = await fetch(
        `https://kanban-board-91d98-default-rtdb.europe-west1.firebasedatabase.app/${context.getters.getUserId}.json?auth=` +
          token,
        {
          method: "PUT",
          body: JSON.stringify(context.getters.getBoardData),
        }
      );

      const responseBoardData = await sendBoardData.json();

      if (!response.ok) {
        const error = new Error(
          responseBoardData.message || "Failed to send data!"
        );
        context.commit("clearError", true);
        throw error;
      }
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
        const error = new Error(
          responseData.message || "Failed to authenticate."
        );
        context.commit("clearError", true);
        throw error;
      }

      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      timer = setTimeout(() => {
        context.commit("logOut");
      }, expiresIn);

      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("tokenExpiration", expirationDate);

      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });

      context.dispatch("loadBoardData");
    },
    async loadBoardData(context) {
      const token = context.getters.getUserToken;

      if (token === null) {
        context.commit("setBoardData", {
          todo: [
            { id: "todo" },
            {
              id: 1,
              title: "Placeholder",
              description: "Try it out. Drag me!",
              deadLine: "13.04.2021",
            },
          ],
          inProgress: [
            { id: "inProgress" },
          ],
          done: [
            { id: "done" },
          ],
        })
        return;
      }
      const response = await fetch(
        `https://kanban-board-91d98-default-rtdb.europe-west1.firebasedatabase.app/${context.getters.getUserId}.json?auth=` +
          token
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(response.message || "Failed load data.");
        context.commit("clearError", true);
        throw error;
      }
      context.commit("setBoardData", responseData);
    },
    async saveBoardData(context) {
      const token = context.getters.getUserToken;
      const response = await fetch(
        `https://kanban-board-91d98-default-rtdb.europe-west1.firebasedatabase.app/${context.getters.getUserId}.json?auth=` +
          token,
        {
          method: "PUT",
          body: JSON.stringify(context.getters.getBoardData),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed save data.");
        context.commit("clearError", true);
        throw error;
      }
    },
    autoLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      timer = setTimeout(() => {
        context.commit("logOut");
      }, expiresIn);

      if (token && userId) {
        context.commit("setUser", {
          token: token,
          userId: userId,
          tokenExpiration: tokenExpiration,
        });
      }
    },
  },
  mutations: {
    setUser(state, payload) {
      state.userData.token = payload.token;
      state.userData.id = payload.userId;
      state.userData.tokenExpiration = payload.tokenExpiration;
    },
    setBoardData(state, payload) {
      state.boardData = payload;
    },
    loading(state) {
      state.uiSwitches.isLoading = !state.uiSwitches.isLoading;
    },
    logOut(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenExpiration");

      clearTimeout(timer);

      state.userData.token = null;
      state.userData.id = null;
      state.userData.tokenExpiration = null;
    },
    saveNewTask(state, payload) {
      const path = payload.boardPath;
      if (path !== null) {
        state.boardData[path].push(payload);
      } else state.boardData.todo.push(payload);
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
      const newTodo = state.boardData.todo.filter(
        (task) => task["id"].toString() !== payload
      );
      state.boardData.todo = newTodo;
      const newProgress = state.boardData.inProgress.filter(
        (task) => task["id"].toString() !== payload
      );
      state.boardData.inProgress = newProgress;
      const newDone = state.boardData.done.filter(
        (task) => task["id"].toString() !== payload
      );
      state.boardData.done = newDone;
    },
    editTask(state, payload) {
      state.boardData.todo.forEach((element) => {
        if (element["id"].toString() === payload.id) {
          state.uiSwitches.creatingTask = !state.uiSwitches.creatingTask;
          const indexOfElement = state.boardData.todo.indexOf(element);
          state.boardData.todo.splice(indexOfElement, 1);
          state.editedTask = payload;
        }
      });
      state.boardData.inProgress.forEach((element) => {
        if (element["id"].toString() === payload.id) {
          state.uiSwitches.creatingTask = !state.uiSwitches.creatingTask;
          const indexOfElement = state.boardData.inProgress.indexOf(element);
          state.boardData.inProgress.splice(indexOfElement, 1);
          state.editedTask = payload;
        }
      });
      state.boardData.done.forEach((element) => {
        if (element["id"].toString() === payload.id) {
          state.uiSwitches.creatingTask = !state.uiSwitches.creatingTask;
          const indexOfElement = state.boardData.done.indexOf(element);
          state.boardData.done.splice(indexOfElement, 1);
          state.editedTask = payload;
        }
      });
    },
    dragged(state, payload) {
      state.draggedTask = payload;
    },
    dropped(state, target) {
      state.boardData[target].push(state.draggedTask);
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
