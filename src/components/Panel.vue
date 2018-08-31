<template>
  <div id='panel'>
    <div v-if='isRunning'>
      Rows: {{rows}} Columns: {{columns}}
      <h3>Turn {{ turn }}</h3>
    </div>
    <div v-else> 
      Rows: <input type="number" v-model.number='newRows' min='9' max='70'/>
      Columns: <input type="number" v-model.number='newColumns' min='9' max='70'/>
      <button @click="init()">Start</button>
      <h3>GAME OVER</h3>
    </div>
    <div>
       <b>{{ percentCovered.toFixed(2) }}%</b> ({{ fieldsCovered }} of {{ rows*columns}}) fields covered
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  data() {
    return {
      newRows: this.$store.getters.rows,
      newColumns: this.$store.getters.columns
    }
  },
  computed: {
    rows() {
      return this.$store.getters.rows
    },
    columns() {
      return this.$store.getters.columns
    },
    fieldsCovered() {
      return this.$store.state.fieldsCovered
    },
    percentCovered() {
      return this.$store.getters.percentCovered
    },
    turn() {
      return this.$store.state.turn
    },
    isRunning() {
      return this.$store.state.reachable.length > 0
    }
  },
  methods: {
    init() {
      this.$store.commit('INIT', {rows: this.newRows, columns: this.newColumns})
    },
  }
}
</script>
