<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Login msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import Login from '@/components/Login.vue'

export default createComponent({
  components: { Login }
})
</script>
