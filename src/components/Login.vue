<template>
  <div>
    <input
      v-model="username"
      placeholder="username"
      data-test="username"
    >
    <button
      @click="onSubmit"
      data-test="login"
    >
      Login
    </button>
    <p v-if="invalid">
      input valid username.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useStore } from '@/store'

export default defineComponent({
  setup (props, { root }) {
    const store = useStore()

    let username = ref<string>()
    let invalid = ref<Boolean>(false)

    onMount()

    function onMount () {
      if (store.getters.getUser) {
        root.$router.push('chat')
      }
    }

    function onSubmit () {
      if (!validate(username.value)) {
        invalid.value = true
        return
      }

      store.dispatch('login', username.value)
      root.$router.push('chat')
    }

    return { username, invalid, onSubmit }
  }
})

function validate (username: string | undefined) {
  return username != null && username.length > 1 && /^[A-Za-z0-9]*$/.test(username)
}
</script>
