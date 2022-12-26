import { createWebHistory, createRouter } from 'vue-router';

const routes =  [
  {
    path: '/',
    alias: '/users',
    name: 'users',
    component: () => import('./components/UserList.vue')
  },
  {
    path: '/users/:id',
    alias: '/users/:id/events',
    name: 'user-profile',
    component: () => import('./components/UserProfile.vue')
  },
  {
    path: '/add',
    alias: '/users/add',
    name: 'add-user',
    component: () => import('./components/AddUser.vue')
  },
  {
    path: '/users/:id/add',
    alias: '/users/:id/add/events',
    name: 'add-event',
    component: () => import('./components/AddEvent.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
