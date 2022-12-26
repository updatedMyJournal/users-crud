<script setup>
  defineProps(['text']);
</script>

<template>
  <div class="error">{{ text ?? `Can't be empty!` }}</div>
</template>

<style scoped lang="scss">
  .error {
    color: red;
    padding: 4px;
  }
</style>
