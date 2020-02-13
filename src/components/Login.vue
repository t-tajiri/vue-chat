<template>
  <div>
    <input v-model="username" placeholder="username">
    <button @click="onSubmit">Login</button>
    <p v-if="invalid">
      input valid username.
    </p>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

export default createComponent({
  setup (props, { root }) {
    let username = ref<string>()
    let invalid = ref<Boolean>(false)

    function onSubmit () {
      if (!validate(username.value)) {
        invalid.value = true
        return
      }

      root.$store.dispatch('login', username.value)
      root.$router.push('about')
    }

    return { username, invalid, onSubmit }
  }
})

function validate (username: string | undefined) {
  return !(username == null || username.length > 1 || username.match(/^[A-Za-z0-9]*$/))
}
</script>
