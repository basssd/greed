<template>
  <div id='grid'>
    <div v-for="(row, ir) in fields" :key=ir>
      <span v-for="(column, ic) in row"
        :key=ic
        class="field"
        :style='{backgroundColor: backColor(column)}'
        @click='onClick(ir, ic)'
        @mouseover='onMouseover(ir, ic)'
      >
        {{ column.value }}
      </span>
    </div>
  </div>
</template>

<script>
const valueToColor = function(value) {
  switch(value) {
    case 0: return "Black"
    case 1: return "#33ff33"
    case 2: return "#9fff80"
    case 3: return "#ccff99"
    case 4: return "#c5ff80"
    case 5: return "#ffff80"
    case 6: return "#ffeb99"
    case 7: return "#ffbf80"
    case 8: return "#ffbbbb"
    case 9: return "#ff8888"
  }
  return "Black"
}

export default {
  name: 'Grid',
  computed: {
    fields() {
      return this.$store.state.fields
    },
    backColor() {
      const self = this
      return function(field) {
        if (field.isPosition) {
          return "Blue"
        }
        if (field.value == 0) {
          return "Black"
        }
        if (field.isPath) {
          return "Red"
        }
        if (field.reachableWeight) {
          return valueToColor(field.reachableWeight)
        }
        return "White"
      }
    }
  },
  methods: {
    onClick(row, column) {
      this.$store.commit('SET_PATH', {row, column})
    },
    onMouseover(row, column) {
      this.$store.commit('UPDATE_PATH', {row, column})
    },
  }
}
</script>

<style scoped>
#grid {
  margin: 7px;
}
.field {
  color: rgb(36, 25, 49);
  margin: 0px;
  padding-top: 1px;
  padding-right: 2px;
  padding-bottom: 4px;
  padding-left: 4px;
  text-align: center;
}
</style>