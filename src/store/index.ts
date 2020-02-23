import Vue from 'vue'
import Vuex, { MutationTree, ActionTree, GetterTree } from 'vuex'
import VuexPersistence from 'vuex-persist'
import Chatkit from '@/chatkit.js'
import { State, Room } from '@/store/types'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

let state: State = {
  username: '',
  name: '',
  rooms: [{ id: '', name: '' }]
}

const getters: GetterTree<State, any> = {
  getUser (state: State) {
    return state.username
  },
  getRooms (state: State) {
    return state.rooms
  }
}

const mutations: MutationTree<State> = {
  setUser (state, { username, name }: State) {
    state.username = username
    state.name = name
  },
  setRooms (state, rooms: Array<Room>) {
    state.rooms = rooms
  }
}

const actions: ActionTree<State, any> = {
  async login ({ commit }, userId: string) {
    const currentUser = await Chatkit.connectUser(userId)

    commit('setUser', { username: currentUser.name, name: currentUser.name })

    // list of user rooms
    const rooms = currentUser.rooms.map((room: Room) => ({
      id: room.id,
      name: room.name
    }))

    commit('setRooms', rooms)
  }
}

// never refered by other, so define as any.
const plugins: any = [vuexLocal.plugin]

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins
})
