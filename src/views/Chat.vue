<template>
  <div>
    <div class="room">
      <ul>
        <li
          v-for="room in rooms"
          :key="room.name"
        >
          {{ room.name }}
        </li>
      </ul>
    </div>
    <div class="messages">
      <ul>
        <li
          v-for="(message, index) in messages"
          :key="index"
        >
          {{ message.date }} - {{ message.name }}@{{ message.username }} | {{ message.text }}
        </li>
      </ul>
    </div>
    <div class="form">
      <input v-model="message">
      <button @click="onSend">
        send
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { Room, User } from '@/store/types'
import { useStore } from '@/store'

export default defineComponent({
  setup (props, { root }) {
    const store = useStore()

    let rooms = ref<Array<Room>>()
    let messages = ref<Array<string>>()
    let message = ref<string>()

    messages.value = store.getters.getMessages
    rooms.value = store.getters.getRooms

    onMount()

    function onMount () {
      const loggedUser = store.getters.getUser
      window.addEventListener('beforeunload', function () { unload(loggedUser) })
      if (store.getters.getReconnect) {
        store.dispatch('login', loggedUser.id)
      }
    }

    function unload (loggedUser: User) {
      if (loggedUser) {
        store.commit('setReconnect', true)
      }
    }

    async function onSend () {
      const result = await store.dispatch('sendMessage', message.value)
      if (result) {
        message.value = ''
      }
    }

    return { rooms, messages, message, onSend }
  }
})
</script>
