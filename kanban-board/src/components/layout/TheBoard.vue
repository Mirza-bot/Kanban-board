<template>
  <div class="board">
    <div class="board_part todo">
      <h2>Todo</h2>
    </div>
    <div class="board_part in-progress">
      <h2>In Progress</h2>
    </div>
    <div class="board_part done">
      <h2>Done</h2>
    </div>
  </div>
</template>

<style scoped>
.board {
  background: linear-gradient(rgb(14, 126, 190), rgb(5, 91, 141) 70%);
  width: 90vw;
  margin: auto;
  border-radius: 10px;
  padding: 10px;
  overflow: auto;
}

.board_part {
  width: 33.3%;
  margin: auto;
  float: left;
  text-align: center;
  color: white;
  text-shadow: -3px 2px 3px black;
}
</style>
