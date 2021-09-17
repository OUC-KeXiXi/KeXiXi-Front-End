import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  },
  {
    path: '/sellercenter',
    name: 'SellerCenter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/SellerCenter.vue')
  },
  // {
  //   path: "*",
  //   redirect: "/404"
  // }
  {
    path: '/UserCenter',
    name: '/UserCenter',
    component: () => import('../components/UserCenter/UserCenter.vue'),
    redirect: '/UserMessage',
    children: [
      { path: '/UserMessage', component: () => import('../components/UserCenter/UserMessage.vue') },
      { path: '/PurchasedCourses', component: () => import('../components/UserCenter/PurchasedCourses.vue') }
    ]
  },
  {
    path: '/Font',
    name: 'Font',
    component: () => import('../views/Font.vue'),
  },
  {
    path: '/CourseDetail',
    name: '/CourseDetail',
    component: () => import('../views/CourseDetail.vue'),
  },
  {
    path: '/SnapshotDetail',
    name: '/SnapshotDetail',
    component: () => import('../views/SnapshotDetail.vue'),
  },
    {
    path: '/ShoppingCart',
    name: '/ShoppingCart',
    component: () => import('../views/ShoppingCart.vue'),
  },
  {
    path: '/OrderComfirm',
    name: '/OrderComfirm',
    component: () => import('../views/OrderComfirm.vue'),
  },
  {
    path: '/OrderDetail',
    name: '/OrderDetail',
    component: () => import('../views/OrderDetail.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
