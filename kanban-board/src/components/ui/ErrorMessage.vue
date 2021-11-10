<template>
  <div>
    <ul>
      <li>
        <h2>Failed to authenticate</h2>
      </li>
      <li>
        <p>Please check your Login-Data and try again.</p>
      </li>
      <li>
        <standard-button mode="style-accept" @click="clearError">OK</standard-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    methods: {
        clearError() {
            this.$store.commit("clearError", false)
        }
    }
}
</script>

<style scoped>
div {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  background-color: rgb(14, 126, 190);
  width: 30vw;
  border: 3px solid white;
  border-radius: 10px;
  color: white;
  text-shadow: -3px 2px 2px black;
  z-index: 1;
}

h2 {
  text-align: center;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  display: flex;
  justify-content: center;
}
</style>
