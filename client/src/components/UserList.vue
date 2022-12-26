<script setup>
  import { ref, onMounted, watch, inject } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { formatDate } from '../helpers/util';
  import usersService from '../services/users.service.js';

  import ItemsPerPageSelector from './ItemsPerPageSelector.vue';
  import CreateButton from './CreateButton.vue';
  import RowFlexContainer from './RowFlexContainer.vue';
  import PageButton from './PageButton.vue';

  const router = useRouter();
  const route = useRoute();
  const users = ref([]);
  const paginationParams = ref({});
  const loading = ref(false);
  const sortedbyASC = ref(true);
  const usersPerPage = inject('usersPerPage');
  const eventsPerPage = inject('eventsPerPage');

  if (route.query.size) {
    usersPerPage.value = route.query.size;
  }
  
  async function getUsers(queryObj) {
    loading.value = true;

    const response = await usersService.getAll(queryObj);

    paginationParams.value = {...response.data};
    users.value = response.data.users;

    loading.value = false;
  }

  function sortBy(prop) {
    if (sortedbyASC.value) {
      users.value.sort((x, y) => (x[prop] > y[prop] ? -1 : 1));
      sortedbyASC.value = false;
    } else {
      users.value.sort((x, y) => (x[prop] < y[prop] ? -1 : 1));
      sortedbyASC.value = true;
    }
  }

  async function onNextPage() {
    if (!paginationParams.value.hasNextPage) return;

    const queries = {
      page: paginationParams.value.nextPage - 1,
      size: usersPerPage.value
    };

    router.push({ path: 'users', query: queries });

    await getUsers(queries);
  }

  async function onPrevPage() {
    if (!paginationParams.value.hasPrevPage) return;

    const queries = {
      page: paginationParams.value.prevPage - 1,
      size: usersPerPage.value
    };

    router.push({ path: 'users', query: queries });

    await getUsers(queries);
  }

  watch(usersPerPage, async (newusersPerPage) => {
    const queries = { 
      page: 0,
      size: newusersPerPage 
    };

    router.push({ path: 'users', query: queries });

    await getUsers(queries);
  });
  
  onMounted(async () => {
    await getUsers(route.query);
  });
</script>

<template>
  <h1>Main page</h1>

  <RowFlexContainer>
      <CreateButton :to="`/users/add?size=${usersPerPage}`" text="Create user"/>
      <ItemsPerPageSelector v-model="usersPerPage"/>
  </RowFlexContainer>

  <table>
    <tr>
      <th @click="sortBy('fullName')">User Name</th>
      <th @click="sortBy('email')">Email</th>
      <th @click="sortBy('phoneNumber')">Phone Number</th>
      <th @click="sortBy('eventsCount')">Events Count</th>
      <th @click="sortBy('nextEventDate')">Next Event Date</th>
    </tr>
    
    <template v-for="user in users" :key="user.id" v-if="!loading">
      <tr>
        <td>
          <router-link 
            :to="`/users/${user.id}?size=${eventsPerPage}`" 
            class="userLink"
          >
            {{ user.fullName }}
          </router-link>
        </td>
        <td>{{ user.email }}</td>
        <td>{{ user.phoneNumber }}</td>
        <td>{{ user.eventsCount }}</td>
        <td>{{ formatDate(user.nextEventDate) }}</td>
      </tr>
    </template>
    <template v-else>
      <tr>
        <td>Loading...</td>
      </tr>
    </template>
  </table>
  
  <RowFlexContainer>
    <PageButton 
      @click="onPrevPage" 
      v-show="paginationParams.hasPrevPage" 
      text="Prev page">
    </PageButton>
    <PageButton 
      @click="onNextPage" 
      v-show="paginationParams.hasNextPage" 
      text="Next page">Next page
    </PageButton>
  </RowFlexContainer>
</template>

<style lang="scss">
  .userLink {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
