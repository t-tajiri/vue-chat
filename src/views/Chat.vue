<template>
  <div>
    <ul>
      <li
        v-for="room in rooms"
        :key="room.name"
      >
        {{ room.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { Room } from '@/store/types'

export default defineComponent({
  setup (props, { root }) {
    let rooms = ref<Array<Room>>()
    rooms = root.$store.getters.getRooms

    return { rooms }
  }
})
</script>
