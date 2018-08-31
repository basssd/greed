<template>
  <div id='playground'>
    <Grid />
    <panel />
  </div>
</template>

<script>
import Grid from './Grid.vue'
import Panel from './Panel.vue'

export default {
  name: 'Playground',
  props: {
    rows: {
      type: Number,
      default: 10,
      validator: function(value) {
        return value > 9
      }
    },
    columns: {
      type: Number,
      default: 40,
      validator: function(value) {
        return value > 9
      }
    }
  },
  components: {
    Grid, Panel
  },
  created: function() {
    this.$store.commit('INIT', {rows: this.rows, columns: this.columns})
  }

}
</script>