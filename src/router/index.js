import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */'../components/auth/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../components/dashboard'),
  },
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "dashboard" */ '../components/dashboard'),
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: () => import(/* webpackChunkName: "usuarios" */ '../components/usuarios'),
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "notFound" */ '../layout/AppNotFound.vue'),
  }
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
