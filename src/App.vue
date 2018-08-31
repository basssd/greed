<template>
  <div id="app">
    <Playground :rows=30 :columns=50 />
  </div>
</template>

<script>
import Playground from './components/Playground.vue'

export default {
  name: 'app',
  components: {
    Playground
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
