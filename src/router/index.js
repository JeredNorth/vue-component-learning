import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Reviews from '../pages/Reviews.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: Reviews,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
