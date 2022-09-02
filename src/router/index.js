import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Forgot from '../views/Forgot.vue'
import Reset from '../views/Resetpwd.vue'
import Verify from '../views/Verify.vue'
import Dashboard from '../views/Dashboard.vue'
import UsersList from '../views/UsersList.vue'
import Admin from '../views/Admin.vue'
import Singlepost from '../views/Singlepost.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      let check = localStorage.getItem('isConfirmed');
      if(check === 'true'){
        return  next()
      } 
      return next({name:'Login'})
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot
  },
  {
    path: '/reset',
    name: 'Reset',
    component: Reset,
    beforeEnter: (to, from, next) => {
      if(from.name !== 'Forgot'){
        return next({name: 'Forgot'})
      }
      next()
    }
  },
  {
    path: '/verify/:token',
    component: Verify,
    props: true
  },
  {
    path: '/admin/dashboard',
    component: Dashboard
  },
  {
    path: '/admin/userslist',
    component: UsersList
  },
  {
    path: '/admin/',
    component: Admin
  },
  {
    path: '/content/:id',
    name: 'singlepost',
    props: true,
    component: Singlepost
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
