<template>
  <div>
    <the-header></the-header>
    <transition name="popup">
      <pop-up-window v-show="isCreatingTask"></pop-up-window>
    </transition>
    <transition name="popup">
      <login-window v-show="isLoggingIn"></login-window>
    </transition>
    <the-board :class="blurEffect()"></the-board>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheBoard from "./components/layout/TheBoard.vue";
import LoginWindow from "./components/ui/LoginWindow.vue";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  components: { TheHeader, TheBoard, LoginWindow },
  setup() {
    const store = useStore();

    function blurEffect() {
      if (store.getters.isCreatingTask === true || store.getters.isAuthenticating) {
        return "background-blur";
      } else return "default";
    }

    return {
      isCreatingTask: computed(() => store.getters.isCreatingTask),
      isLoggingIn: computed(() => store.getters.isAuthenticating),
      blurEffect,
    };
  },
};
</script>

<style scoped>
div.background-blur {
  animation-name: blur_on;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  pointer-events: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

div.default {
  animation-name: blur_off;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

@keyframes blur_on {
  from {
    filter: none;
  }
  to {
    filter: grayscale(0.5) blur(10px)
  }
}

@keyframes blur_off {
  from {
    filter: grayscale(0.5) blur(10px)
  }
  to {
    filter: none;
  }
}

.popup-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.popup-enter-active {
  transition: all 0.2s ease-out;
}

.popup-enter-to {
  opacity: 1;
  transform: scale(1);
}

.popup-leave-from {
  opacity: 1;
  transform: scale(1);
}

.popup-leave-active {
  transition: all 0.2s ease-in;
}

.popup-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;800&display=swap");

body {
  margin: 0;
  font-family: "Open Sans", sans-serif;
}
</style>
