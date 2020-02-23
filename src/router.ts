import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import(/* webpackChunkName: "about" */ './views/Chat.vue')
  }
]

export default new Router({
  routes
})
