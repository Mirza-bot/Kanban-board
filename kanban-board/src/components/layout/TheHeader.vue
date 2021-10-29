<template>
    <header>
      <ul>
          <li><standard-button mode="style-delete">Delete Task</standard-button></li>
          <li><standard-button mode="style-edit">Edit Task</standard-button></li>
          <li class="float-left"><standard-button mode="style-create">Create Task</standard-button></li>
      </ul>
    </header>
</template>


<style lang="css" scoped>

header {
    background: linear-gradient( rgb(14, 126, 190), rgb(5, 91, 141) 70%) ;
    margin: 0 0 5vh 0;
    height: 10vh
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