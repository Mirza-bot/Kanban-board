<template>
  <div :class="mode">
    <header>
      <slot name="header"></slot>
    </header>
    <p><slot name="description"></slot></p>
    <span>
      <slot name="deadline"></slot>
    </span>
    <span v-show="false">
      <slot name="taskId"></slot>
    </span>
  </div>
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
div {
  color: black;
  text-shadow: 3px -1px 2px white;
  border: 5px black;
  border-radius: 5px;
  width: 90%;
  margin: 10px auto 10px auto;
  box-shadow: -5px 5px 5px black;
}

header {
  font-size: 1.5rem;
  padding: 15px 0 0 0;
}

p {
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

span {
  font-size: 0.8rem;
  text-shadow: none;
}

.default-style {
  background-color: white;
}

.default-style:hover {
  cursor: grab;
}

.delete-style {
  background-color: rgb(80, 6, 6);
  color: white;
  text-shadow: 3px -1px 2px black;
  border: 2px solid white;
}

.delete-style:hover {
  background-color: rgb(172, 7, 7);
  cursor: pointer;
}

.delete-style:active {
  transform: scale(0.985);
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.edit-style {
  background-color: silver;
}

.edit-style:hover {
  background-color: white;
  cursor: pointer;
}

.edit-style:active {
  transform: scale(0.985);
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

div.drop-spot {
  box-sizing: border-box;
  border: 2px solid rgb(19, 119, 177);
  border-style: inset;
  border-radius: 10px;
  background: linear-gradient(
    45deg,
    rgb(1, 28, 44),
    rgb(12, 99, 149) 45%,
    rgb(9, 86, 131) 60%,
    rgb(1, 41, 65) 98%
  );
  color: white;
  text-shadow: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.drop-spot > header {
  font-size: 2rem;
}
</style>
