<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <p><slot name="description"></slot></p>
  </div>
</template>

<style scoped>
div {
  background-color: white;
  color: black;
  text-shadow: 3px -1px 2px white;
  border: 5px black;
  border-radius: 5px;
  width: 90%;
  margin: auto;
}

header {
  font-size: 1.5rem;
  padding: 15px 0 0 0;
}

p {
  padding: 0 10px 15px 10px;
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
