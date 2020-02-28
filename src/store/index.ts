import Vue from 'vue'
import Vuex, { MutationTree, ActionTree, GetterTree } from 'vuex'
import VuexPersistence from 'vuex-persist'
import Chatkit from '@/chatkit.js'
import { State, User, Room, Message } from '@/store/types'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

let state: State = {
  user: undefined,
  rooms: [],
  messages: [],
  activeRoom: undefined,
  reconnect: false
}

const getters: GetterTree<State, any> = {
  getUser (state: State) {
    return state.user
  },
  getRooms (state: State) {
    return state.rooms
  },
  getMessages (state: State) {
    return state.messages
  },
  getReconnect (state: State) {
    return state.reconnect
  }
}

const mutations: MutationTree<State> = {
  setUser (state, user: User) {
    state.user = user
  },
  setRooms (state, rooms: Array<Room>) {
    state.rooms = rooms
  },
  addMessage (state, message: Message) {
    state.messages.push(message)
  },
  setActiveRoom (state, activeRoom: Room) {
    state.activeRoom = activeRoom
  },
  setReconnect (state, reconnect) {
    state.reconnect = reconnect
  }
}

const actions: ActionTree<State, any> = {
  async login ({ commit, state }, id: string) {
    const currentUser = await Chatkit.connectUser(id)

    // TODO
    commit('setUser', { id: currentUser.id, name: currentUser.name } as User)

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
