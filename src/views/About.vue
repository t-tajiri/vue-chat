<template>
  <div class="about">
    <h1>This is an about page</h1>
    <span>{{ count }}</span>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

export default createComponent({
  setup (props, { root }) {
    let count = root.$store.state

    return { count }
  }
})
</script>
