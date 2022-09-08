import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Test'
    }
  },
  {
    path: '/scroll',
    name: 'Scroll',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/scrollTable.vue')
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
      import(/* webpackChunkName: "about" */ '@/components/ScrollList.vue')
  },
  {
    path: '/dialog',
    name: 'Dialog',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Dialog.vue')
  },
  {
    path: '/tree',
    name: 'Tree',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Tree.vue')
  },
  {
    path: '/collapse',
    name: 'Collapse',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Collapse.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Test.vue')
  },
  {
    path: '/lubo',
    name: 'LuBo',
    component: () =>
      import(/* webpackChunkName: "LuBo" */ '../views/LunBoTu.vue')
  },
  {
    path: '/sign',
    name: 'Ensign',
    component: () =>
      import(/* webpackChunkName: "Ensign" */ '../views/Sign.vue')
  },
  {
    path: '/seal',
    name: 'EnSeal',
    component: () =>
      import(/* webpackChunkName: "EnSeal" */ '../views/E-Seal.vue')
  },
  {
    path: '/pdf',
    name: 'pdf',
    component: () =>
      import(/* webpackChunkName: "EnSeal" */ '../components/pdfView.vue')
  },
  {
    path: '/huanHang',
    name: 'huanHang',
    component: () =>
      import(/* webpackChunkName: "EnSeal" */ '../views/huanHang.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
