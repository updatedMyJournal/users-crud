<script setup>
  import { ref, onMounted, watch, inject } from 'vue';
  import { useRoute, useRouter } from 'vue-router'
  import { formatDate } from '../helpers/util';
  import usersService from '../services/users.service.js';
  import userEventsService from '../services/userEvents.service';

  import ItemsPerPageSelector from './ItemsPerPageSelector.vue';
  import CreateButton from './CreateButton.vue';
  import RowFlexContainer from './RowFlexContainer.vue';
  import PageButton from './PageButton.vue';
  
  const router = useRouter();
  const route = useRoute();
  const user = ref({});
  const events = ref([]);
  const paginationParams = ref({});
  const eventsPerPage = inject('eventsPerPage');
  const loading = ref(false);
  const sortedbyASC = ref(true);

  if (route.query.size) {
    eventsPerPage.value = route.query.size;
  }

  async function getUser() {
    loading.value = true;
  
    const response = await usersService.get(route.params.id);

    user.value = response.data.user;
    loading.value = false;
  }

  async function getUserEvents(queryObj) {
    loading.value = true;
  
    const response = await userEventsService
      .getAllUserEvents(route.params.id, queryObj);

    paginationParams.value = {...response.data};
    events.value = response.data.userEvents;
    loading.value = false;
  }

  function sortBy(prop) {
    if (sortedbyASC.value) {
      events.value.sort((x, y) => (x[prop] > y[prop] ? -1 : 1));
      sortedbyASC.value = false;
    } else {
      events.value.sort((x, y) => (x[prop] < y[prop] ? -1 : 1));
      sortedbyASC.value = true;
    }
  }

  async function onNextPage() {
    if (!paginationParams.value.hasNextPage) return;

    const queries = {
      page: paginationParams.value.nextPage - 1,
      size: eventsPerPage.value
    };

    router.push({ path: `/users/${user.value.id}`, query: queries });

    await getUserEvents(queries);
  }

  async function onPrevPage() {
    if (!paginationParams.value.hasPrevPage) return;

    const queries = {
      page: paginationParams.value.prevPage - 1,
      size: eventsPerPage.value
    };

    router.push({ path: `/users/${user.value.id}`, query: queries });

    await getUserEvents(queries);
  }

  watch(eventsPerPage, async (neweventsPerPage) => {
    const queries = { 
      page: 0,
      size: neweventsPerPage 
    };

    router.push({ path: `/users/${user.value.id}`, query: queries });

    await getUserEvents(queries);
  });
  
  onMounted(async () => {
    await Promise.all([getUser(), getUserEvents(route.query)]);
  });
</script>

<template>
  <h1>User Profile</h1>

  <RowFlexContainer>
    <CreateButton 
      :to="`/users/${route.params.id}/add?size=${eventsPerPage}`" 
      text="Create event"/>
    <ItemsPerPageSelector v-model="eventsPerPage"/>
  </RowFlexContainer>

  <h2>User info</h2>

  <table>
    <tr>
      <th>User name</th>
      <th>Email</th>
      <th>Phone number</th>
      <th>Events count</th>
      <th>Next event date</th>
    </tr>
    <tr>
      <td>{{ user.fullName }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.phoneNumber }}</td>
      <td>{{ user.eventsCount }}</td>
      <td>{{ formatDate(user.nextEventDate) }}</td>
    </tr>
  </table>

  <h2>Events</h2>

  <table>
    <tr>
      <th @click="sortBy('title')">Title</th>
      <th @click="sortBy('description')">Description</th>
      <th @click="sortBy('startDate')">Start date</th>
      <th @click="sortBy('endDate')">End date</th>
    </tr>

    <template v-for="event in events" :key="event.id" v-if="!loading">
      <tr>
        <td>{{ event.title }}</td>
        <td>{{ event.description }}</td>
        <td>{{ formatDate(event.startDate) }}</td>
        <td>{{ formatDate(event.endDate) }}</td>
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
