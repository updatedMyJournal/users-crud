<script setup>
  import CustomButton from './CustomButton.vue';

  defineProps(['text']);
</script>

<template>
  <CustomButton class="wrapper">
    <div class="text"> {{ text }} </div>
  </CustomButton>
</template>

<style scoped lang="scss">
  .wrapper {
    background-color: rgb(232 232 232);

    &:hover {
      background-color: rgb(212 212 212);
    }
  }

  .text {
    padding: 8px 16px;
  }
</style>
