<script setup>
  import { ref, onMounted, inject } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { isEmpty, trimObjProps } from '../helpers/util';
  import usersService from '../services/users.service.js';

  import ErrorElem from './ErrorElem.vue';
  
  const route = useRoute();
  const router = useRouter();
  const user = ref({});
  const formElem = ref(null);
  const usersPerPage = inject('usersPerPage');

  if (route.query.size) {
    usersPerPage.value = route.query.size;
  }

  async function submit(e) {
    if (!isFormValid()) { 
      const invalidElem = getInvalidFormElem();

      invalidElem.focus();

      return;
    }
    
    try {
      const trimmedObj =  trimObjProps(user.value);

      await usersService.create(trimmedObj);

      router.push({ path: '/users', query: { size: usersPerPage.value }});
    } catch(err) {
      console.log('Error trying to save the User in vue!', err);
    }
  }

  function isFormValid() {
    if (formElem.value.querySelector('.invalid')) return false;

    return true;
  }

  function getInvalidFormElem() {
    return formElem.value.querySelector('.invalid');
  }

  onMounted(() => {
    formElem.value.firstName.focus();
  });
</script>

<template>
  <h1>Create user</h1>

  <form action="" id="form" ref="formElem" @submit.prevent="submit">
    <div class="input-container">
        <label for="firstName">First name</label>
        <input
          class="firstName"
          :class="{ invalid: isEmpty(user.firstName) }"
          id="firstName"
          name="firstName"
          v-model="user.firstName"
          required
        />
        <ErrorElem v-show="isEmpty(user.firstName)"/>
    </div>

    <div class="input-container">
        <label for="lastName">Last name</label>
        <input
          class="lastName"
          :class="{ invalid: isEmpty(user.lastName) }"
          id="lastName"
          name="lastName"
          v-model="user.lastName"
          required
        />
        <ErrorElem v-show="isEmpty(user.lastName)"/>
    </div>

    <div class="input-container">
        <label for="email">Email</label>
        <input
          type="email"
          class="email"
          :class="{ invalid: isEmpty(user.email) }"
          id="email"
          name="email"
          v-model="user.email"
          required
        />
        <ErrorElem v-show="isEmpty(user.email)"/>
    </div>

    <div class="input-container">
        <label for="phoneNumber">Phone number</label>
        <input
          type="tel"
          class="phoneNumber"
          :class="{ invalid: isEmpty(user.phoneNumber) }"
          id="phoneNumber"
          name="phoneNumber"
          v-model="user.phoneNumber"
          required
        />
        <ErrorElem v-show="isEmpty(user.phoneNumber)"/>
    </div>

    <button type="submit">Save</button>
  </form>
</template>
