<template>
  <div>
    <the-header></the-header>
    <the-board></the-board>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheBoard from "./components/layout/TheBoard.vue";
export default {
  components: { TheHeader, TheBoard },
  setup() {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;800&display=swap");

body {
  margin: 0;
  font-family: "Open Sans", sans-serif;
}
</style>