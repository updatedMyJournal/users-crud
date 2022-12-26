<script setup>
  import { ref, provide } from 'vue';
  import { useRoute } from 'vue-router'

  const route = useRoute();
  const usersPerPage = ref(10);
  const eventsPerPage = ref(10);

  provide('usersPerPage', usersPerPage);
  provide('eventsPerPage', eventsPerPage);
</script>

<template>
  <nav>
    <router-link :to="`/users?size=${usersPerPage}`">Main page</router-link>
  </nav>
  <router-view :key="route.fullPath" />
</template>

<style lang="scss">
  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    max-width: 90rem;
    margin: auto;
    position: relative;
  }

  nav {
    display: flex;
    justify-content: center;

    position: sticky;
    top: 0;

    width: 100%;
    padding: 8px;
    background-color: rgb(235 233 233);
  }

  table {
    width: 100%;
    font-family: arial, sans-serif;
    border-collapse: collapse;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  th:hover {
    cursor: pointer;
    background: rgb(229, 255, 211);
  }

  tr:nth-child(even) {
    background-color: #f3f3f3;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    min-width: 16rem;
  }

  .input-container {
    display: flex;
    flex-flow: column nowrap;
    gap: 0.2rem;
  }

  input {
    padding: 4px;
  }

  textarea {
    resize: vertical;
  }

  button[type="submit"] {
    padding: 4px;
    cursor: pointer;
  }

  .invalid {
    border: 2px solid red;
  }
</style>
