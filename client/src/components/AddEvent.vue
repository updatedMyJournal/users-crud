<script setup>
  import { ref, onMounted, inject } from 'vue';
  import { useRoute, useRouter } from 'vue-router'
  import { isEmpty, trimObjProps } from '../helpers/util';
  import { isEqual } from 'date-fns';
  import usersService from '../services/users.service.js';
  import userEventsService from '../services/userEvents.service.js';

  import ErrorElem from './ErrorElem.vue';
  
  const route = useRoute();
  const router = useRouter();
  const event = ref({});
  const oldEvents = ref([]);
  const formElem = ref(null);
  const eventsPerPage = inject('eventsPerPage');

  if (route.query.size) {
    eventsPerPage.value = route.query.size;
  }

  async function submit(e) {
    if (!isFormValid()) { 
      const invalidElem = getInvalidFormElem();

      invalidElem.focus();

      return;
    }

    if (!isDateAvailable(event.value.startDate)) {
      return;
    }

    try {
      const trimmedObj = trimObjProps(event.value);

      await userEventsService.create(route.params.id, trimmedObj);

      router.push({ 
        path: `/users/${route.params.id}`,
        query: { size: eventsPerPage.value }
      });
    } catch(err) {
      console.log('Error trying to save the User Event in vue!', err);
    }
  }

  function isFormValid() {
    if (formElem.value.querySelector('.invalid')) return false;

    return true;
  }

  function getInvalidFormElem() {
    return formElem.value.querySelector('.invalid');
  }

  function isDateAvailable(newStartDate) {
    const doesDateAlreadyExist =  oldEvents
      .value
      .some(({ startDate }) => {
        return isEqual(new Date(newStartDate), new Date(startDate));
      });

    return !doesDateAlreadyExist;
  }

  async function getUserEvents() {
    const response = await usersService.get(route.params.id);

    oldEvents.value = response.data.user.events;
  }

  onMounted(async () => {
    formElem.value.title.focus();
    await getUserEvents();
  });
</script>

<template>
  <h1>AddEvent</h1>

  <form action="" id="form" ref="formElem" @submit.prevent="submit">
    <div class="input-container">
        <label for="title">Title</label>
        <input
          class="title"
          :class="{ invalid: isEmpty(event.title) }"
          id="title"
          name="title"
          v-model="event.title"
          required
        />
        <ErrorElem v-show="isEmpty(event.title)"/>
    </div>

    <div class="input-container">
        <label for="description">Description</label>
        <textarea
          rows="4"
          class="description"
          :class="{ invalid: isEmpty(event.description) }"
          id="description"
          name="description"
          v-model="event.description"
          required
        ></textarea>
        <ErrorElem v-show="isEmpty(event.description)"/>
    </div>

    <div class="input-container">
        <label for="startDate">Start date</label>
        <input
          type="date"
          class="startDate"
          id="startDate"
          name="startDate"
          v-model="event.startDate"
          required
        />
        <ErrorElem 
          v-show="!isDateAvailable(event.startDate)"
          text="You can’t create event for this time!"
        />
    </div>

    <div class="input-container">
        <label for="endDate">End date</label>
        <input
          type="date"
          class="endDate"
          id="endDate"
          name="endDate"
          v-model="event.endDate"
          required
        />
    </div>
    <button type="submit">Submit</button>
  </form>
</template>
