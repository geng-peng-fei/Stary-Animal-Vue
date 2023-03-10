import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('../components/Index.vue')
      }, {
        path: 'pet',
        component: () => import('../components/Pet.vue')
      }, {
        path: 'active',
        component: () => import('../components/Active.vue')
      }, {
        path: 'about',
        component: () => import('../components/About.vue')
      }, {
        path: 'user',
        component: () => import('../components/User.vue')
      }, {
        path: 'userUpdate',
        component: () => import('../components/UserUpdate.vue')
      }, {
        path: 'userAdoptCenter',
        component: () => import('../components/UserAdoptCenter.vue')
      },
    ]
  }, {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  }, {
    path: '/top',
    name: 'top',
    component: () => import('../components/GoTop.vue') // 记得更改vue文件路径
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
