import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'grape'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/HomeView.vue')
  },
  {
    path: '/grape',
    name: 'grape',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Grape.vue')
  },
  {
    path: '/drag',
    name: 'drag',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Drag.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Form.vue')
  },
  {
    path: '/scroll',
    name: 'scroll',
    component: () =>
      import(/* webpackChunkName: "about" */ '../components/ScrollList.vue')
  },
  {
    path: '/collapse',
    name: 'collapse',
    component: () =>
      import(/* webpackChunkName: "about" */ '../components/Collapse.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
