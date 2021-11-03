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
      <li class="float-left">
        <h2>KANBAN</h2>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  methods: {
    toggleCreationWindow() {
      this.$store.commit("creatingSwitch");
    },
    toggleEditSwitch() {
      this.$store.commit("editingSwitch");
    },
    toggleDeleteSwitch() {
      this.$store.commit("deletingSwitch");
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
</style>
