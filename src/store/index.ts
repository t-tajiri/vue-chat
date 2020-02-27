import Vue from 'vue'
import Vuex, { MutationTree, ActionTree, GetterTree } from 'vuex'
import VuexPersistence from 'vuex-persist'
import Chatkit from '@/chatkit.js'
import { State, Room, Message } from '@/store/types'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

let state: State = {
  username: '',
  name: '',
  rooms: [],
  messages: [],
  activeRoom: null
}

const getters: GetterTree<State, any> = {
  getUser (state: State) {
    return state.username
  },
  getRooms (state: State) {
    return state.rooms
  },
  getMessages (state: State) {
    return state.messages
  }
}

const mutations: MutationTree<State> = {
  setUser (state, { username, name }: State) {
    state.username = username
    state.name = name
  },
  setRooms (state, rooms: Array<Room>) {
    state.rooms = rooms
  },
  addMessage (state, message: Message) {
    state.messages.push(message)
  },
  setActiveRoom (state, activeRoom: Room) {
    state.activeRoom = activeRoom
  }
}

const actions: ActionTree<State, any> = {
  async login ({ commit, state }, userId: string) {
    const currentUser = await Chatkit.connectUser(userId)

    commit('setUser', { username: currentUser.name, name: currentUser.name })

    // list of user rooms
    const rooms = currentUser.rooms.map((room: Room) => ({
      id: room.id,
      name: room.name
    }))
    commit('setRooms', rooms)

    const activeRoom = state.activeRoom || rooms[0]

    await Chatkit.subscribeToRoom(activeRoom.id)
  },
  async sendMessage (ctx, message: string) {
    const messageId = await Chatkit.sendMessage(message)
    return messageId
  }
}

// never refered by other, so define as any.
const plugins: any = [vuexLocal.plugin]

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins
})

export function useStore () {
  return store
}
