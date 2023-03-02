import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import PathNotFound from '../views/auth/PageNotFound.vue'
import ProfileView from '../views/auth/ProfileView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // meta: {
    //   requiresAuth: true,
    // }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  { 
    path: '/:pathMatch(.*)*', 
    component: PathNotFound 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
  // if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
