import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    count: 100
  },
  mutations: {

  },
  actions: {
    login ({ commit }) {

    }
  },
  plugins: [vuexLocal.plugin]
})
