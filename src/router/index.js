import Vue from 'vue'
import VueRouter from 'vue-router'
import PersonalCenter from '../components/PersonalCenter.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/users/Welcome.vue'
import PersonalMessage from '../components/users/PersonalMessage.vue'
import PurchasedCourse from '../components/users/PurchasedCourse.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/PersonalCenter', component: PersonalCenter },
  { path: '/PersonalMessage', component: PersonalMessage },
  {
    path: '/Home',
    component: Home,
    redirect: '/Welcome',
    children: [
      { path: '/Welcome', component: Welcome },
      { path: '/PersonalMessage', component: PersonalMessage },
      { path: '/PurchasedCourse', component: PurchasedCourse }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
