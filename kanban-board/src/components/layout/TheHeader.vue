<template>
  <header>
    <ul>
      <li>
        <standard-button mode="style-delete" @click="toggleDeleteSwitch"
          >Delete Task</standard-button
        >
      </li>
      <li>
        <standard-button mode="style-edit" @click="toggleEditSwitch"
          >Edit Task</standard-button
        >
      </li>
      <li>
        <standard-button mode="style-create" @click="toggleCreationWindow"
          >Create Task</standard-button
        >
      </li>
      <li>
        <transition-group name="buttons">
          <standard-button
            key="save"
            mode="style-accept"
            @click="saveData"
            v-show="loginStatus"
            >Save</standard-button
          >
          <standard-button
            key="log_in"
            mode="style-accept"
            @click="toggleLoginWindow"
            v-if="!loginStatus"
            >Log in</standard-button
          >
          <standard-button
            mode="style-cancel"
            key="log_out"
            @click="logOut"
            v-else
            >Log out</standard-button
          >
        </transition-group>
      </li>
      <li>
        <transition name="save-notification">
          <p class="save_notification" v-show="showNotification">Data saved</p>
        </transition>
      </li>
      <li class="float-left">
        <h2>KANBAN</h2>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showNotification: false,
    };
  },
  methods: {
    saveData() {
      this.$store.dispatch("saveBoardData");
      this.saveNotification();
    },
    saveNotification() {
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 2000);
    },
    async logOut() {
      this.$store.commit("logOut");
      this.$store.commit("loading");
      await this.$store.dispatch("loadBoardData");
      this.$store.commit("loading");
    },
    toggleCreationWindow() {
      this.$store.commit("creatingSwitch");
    },
    toggleEditSwitch() {
      if (this.$store.getters.isCreatingTask !== true) {
        this.$store.commit("editingSwitch");
      }
    },
    toggleDeleteSwitch() {
      this.$store.commit("deletingSwitch");
    },
    toggleLoginWindow() {
      this.$store.commit("autenticatingSwitch");
    },
  },
  computed: {
    loginStatus() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style lang="css" scoped>
header {
  background: linear-gradient(rgb(14, 126, 190), rgb(5, 91, 141) 70%);
  margin: 0 0 5vh 0;
  height: 10vh;
}

h2 {
  margin: -5px 0 0 -5px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

ul {
  margin: 0;
  list-style-type: none;
}

li {
  color: white;
  font-size: 2rem;
  float: right;
  margin: 1rem;
}

li.float-left {
  float: left;
}

p.save_notification {
  float: left;
  font-size: 1rem;
}

.save-notification-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.save-notification-enter-active {
  transition: all 0.1s ease-out;
}
.save-notification-enter-to {
  opacity: 1;
  transform: scale(1);
}

.save-notification-leave-from {
  opacity: 1;
  transform: scale(1);
}
.save-notification-leave-active {
  transition: all 0.1s ease-out;
}
.save-notification-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.buttons-enter-from {
  transform: scale(0.6);
}

.buttons-enter-active {
  transition: all 0.1s ease-out;
}

.buttons-enter-to {
  transform: scale(1);
}

</style>
