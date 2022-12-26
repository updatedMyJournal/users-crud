<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .wrapper {
    min-width: 5rem;
    text-align: center;
    border: 1px solid black;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
