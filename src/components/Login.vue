<template>
  <div>
    <input v-model="username" placeholder="username" data-test="username">
    <button @click="onSubmit" data-test="login">Login</button>
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

function validate (username: string) {
  return username != null && username.length > 1 && /^[A-Za-z0-9]*$/.test(username)
}
</script>
