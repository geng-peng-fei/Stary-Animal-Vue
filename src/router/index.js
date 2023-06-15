import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('@/views/HomeView.vue'),
        redirect: '/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/Index.vue')
            }, {
                path: 'pet',
                component: () => import('@/views/Pet.vue')
            }, {
                path: 'active',
                component: () => import('@/views/Active.vue')
            }, {
                path: 'about',
                component: () => import('@/views/About.vue')
            }, {
                path: 'user',
                component: () => import('@/views/User.vue')
            }, {
                path: 'userUpdate',
                component: () => import('@/views/UserUpdate.vue')
            }, {
                path: 'userAdoptCenter',
                component: () => import('@/views/UserAdoptCenter.vue')
            },
            {
                path: '/blogHome',
                component: () => import('@/views/blog/BlogHome.vue')
            },
            {
                path: '/blog/:blogId',
                component: () => import('@/views/blog/Blog.vue')
            },
            {
                path: '/editBlog',
                component: () => import('@/views/blog/components/EditBlog.vue')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/LoginView.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    base: process.env.BASE_URL,
    routes
})

export default router
