<template>
  <div>
    <input v-model="username" placeholder="username">
    <button @click="onSubmit">Login</button>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

export default createComponent({
  setup (props, { root }) {
    let username = ref<string>()

    function onSubmit () {
      root.$store.state.count++
    }

    return { username, onSubmit }
  }
})
</script>
