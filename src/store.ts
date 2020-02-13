import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Chatkit from './chatkit.js'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    async login ({ commit }, userId) {
      const currentUser = await Chatkit.connectUser(userId)
    }
  },
  plugins: [vuexLocal.plugin]
})
