<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
button {
  font-size: 1.5rem;
  padding: 10px;
  text-shadow: -3px 2px 3px black;
  border: 1px solid;
  border-radius: 5px;
  box-shadow: -5px 5px 5px black;
  opacity: 0.9;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

button:hover {
  transform: scale(1.02);
  opacity: 1;
}

button:active {
  transform: scale(0.99);
  border-style: inset;
}

.style-delete {
  background-color: rgb(179, 11, 11);
  color: white;
}

.style-create {
  background-color: rgb(0, 179, 74);
  color: white;
}

.style-edit {
  background-color: rgb(202, 202, 15);
  color: white;
}

.style-accept {
  background-color: rgb(14, 126, 190);
  margin: 0 2rem 1rem 2rem;
  color: white;
}

.style-cancel {
  background-color: rgb(11, 80, 121);
  color: white;
  margin: 0 2rem 1rem 2rem;
}
</style>
