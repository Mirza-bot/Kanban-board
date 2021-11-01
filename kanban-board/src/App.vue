<template>
  <div>
    <the-header></the-header>
    <pop-up-window v-show="isCreatingTask"></pop-up-window>
    <the-board ></the-board>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheBoard from "./components/layout/TheBoard.vue";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  components: { TheHeader, TheBoard },
  setup() {
    const store = useStore()

    return {
      isCreatingTask: computed(() => store.getters.isCreatingTask)
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;800&display=swap");

body {
  margin: 0;
  font-family: "Open Sans", sans-serif;
}
</style>
