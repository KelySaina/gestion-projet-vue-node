import { createRouter, createWebHistory } from 'vue-router';
import HomeUser from '../views/HomeUser.vue';
import Login from '../views/Login.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import Forbidden from '../views/Forbidden.vue';
import UserManagement from '../components/admin/UserManagement.vue';
import TaskManagement from '../components/admin/TaskManagement.vue';
import { useAuthStore } from '../store';
import AdminLanding from '../components/admin/AdminLanding.vue';

const routes = [
  {
    path: '/user',
    name: 'Home',
    component: HomeUser,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'users',
        component: UserManagement,
      },
      {
        path: 'tasks',
        component: TaskManagement,
      },
      {
        path: 'landing',
        component: AdminLanding,
      },
    ]
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: Forbidden,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.loadSession(); // Load session from cookies

  // Redirect to login if not authenticated
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.token) {
      return next({ path: '/', query: { redirect: to.fullPath } });
    } else if (to.matched.some(record => record.meta.requiresAdmin) && authStore.user.role !== 'admin') {
      return next({ path: '/forbidden' });
    }
  }
  next();
});

export default router;
