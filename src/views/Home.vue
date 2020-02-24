<template>
  <div class="home">
    <Login />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Login from '@/components/Login.vue'

export default defineComponent({
  components: { Login }
})
</script>
