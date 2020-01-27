<template>
  <div class="home">
    <Login />
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import Login from '@/components/Login.vue'

export default createComponent({
  components: { Login }
})
</script>
