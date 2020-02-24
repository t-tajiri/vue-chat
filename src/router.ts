import Vue from 'vue'
import { VueConstructor } from 'vue/types/umd'
import Router from 'vue-router'
import { RouteConfig } from 'vue-router/types/router'
import Home from '@/views/Home.vue'
import Chat from '@/views/Chat.vue'

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
    component: Chat
  }
]

export default new Router({
  routes
})
