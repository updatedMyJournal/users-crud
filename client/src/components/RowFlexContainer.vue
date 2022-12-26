<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-flow: row nowrap;
    gap: 0.5rem;
  }
</style>
