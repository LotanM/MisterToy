<template>
  <div class="container">
    <app-header/>
    <router-view/>
  </div>
</template>

<script> 
import appHeader from './cmps/app-header.vue'
export default {
  components: {
    appHeader
  }
}
</script>

<style scoped>
.container {
  height: 100%;
}
</style>