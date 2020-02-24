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
import { Room } from '@/store/types'

export default defineComponent({
  setup (props, { root }) {
    let rooms = ref<Array<Room>>()
    let messages = ref<Array<string>>()
    let message = ''

    messages.value = root.$store.getters.getMessages
    rooms.value = root.$store.getters.getRooms

    async function onSend () {
      const result = await root.$store.dispatch('sendMessage', message)
      if (result) {
        message = ''
      }
    }

    return { rooms, messages, message, onSend }
  }
})
</script>
