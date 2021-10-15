import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/Registr'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/Help'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('../views/Messages'),
    meta: {
      layout: 'main',
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth

  if (requireAuth && store.getters["auth/isAuthenticated"]) {
    next()
  } else if (requireAuth && !store.getters["auth/isAuthenticated"]) {
    next('/login?message=auth')
  } else {
    next()
  }
})

export default router
