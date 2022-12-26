<script setup>
  import CustomButton from './CustomButton.vue';

  defineProps(['text', 'to']);
</script>

<template>
  <CustomButton class="wrapper">
    <router-link :to="to">{{ text }}</router-link>
  </CustomButton>
</template>

<style scoped lang="scss">
  .wrapper {
    background-color: rgb(202 255 204);

    &:hover {
      background-color: rgb(171 255 175);
    }
  }

  a {
    padding: 8px 16px;
    display: block;
    text-decoration: none;
    color: inherit;
  }
</style>
