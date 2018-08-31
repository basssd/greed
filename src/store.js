import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  fields: [[], []],
  position: {},
  turn:0 ,
  fieldsCovered: 0,
  direction: {
    dc: 0, dr: 0
  },
  reachable: [],
  path: []
}

const getters = {
  percentCovered: state => (state.fieldsCovered * 100) / ((state.fields.length - 2) * (state.fields[0].length - 2)),
  rows: state => state.fields.length - 2,
  columns: state => state.fields[0].length - 2
}

const mutations = {
  INIT(state, { rows, columns }) {
    let fields = [];
    for (let row = 0; row < rows + 2; row++) {
      fields[row] = []
      for (let column = 0; column < columns + 2; column++) {
        fields[row][column] = {
          reachableWeight: 0,
          isPath: false,
          isPosition: false,
          row, column,
          value: (row === 0 || column === 0 || row === rows + 1 || column === columns + 1) ? 0 : Math.floor(Math.random() * 9 + 1)
        }
      }
    }
    state.fields = fields
    state.position = state.fields[Math.floor(Math.random() * rows + 1)][Math.floor(Math.random() * columns + 1)]
    state.position.isPosition = true
    state.position.value = 0
    state.turn =0
    state.fieldsCovered = 1
    state.reachable = []
    state.path = []
    state.direction.dc = 0
    state.direction.dr = 0
    this.commit('UPDATE_REACHABLES')
  },
  SET_PATH(state, { row, column }) {
    if (state.path.length <1) {
      return
    }
    if (state.position) {
      state.position.isPosition = false
    }
    let pos;
    for (let i=0; i<state.path.length; i++) {
      pos = state.path[i];
      pos.value = 0
      state.fieldsCovered++
    }
    state.position = pos
    state.position.isPosition = true
    state.turn += 1
    this.commit('UPDATE_REACHABLES')
    this.commit('UPDATE_PATH', { row, column })
  },
  UPDATE_PATH(state, { row, column }) {
    const dr = Math.sign(row - state.position.row)
    const dc = Math.sign(column - state.position.column)
    if (dr === state.direction.dr && dc === state.direction.dc)
      return
    state.direction.dr = dr
    state.direction.dc = dc
    state.path.forEach(x => x.isPath = false)
    state.path = state.reachable.filter(x => (Math.sign(x.row - state.position.row) === dr && Math.sign(x.column - state.position.column) === dc))    
    state.path.forEach(x => x.isPath = true)
  },
  UPDATE_REACHABLES(state) {
    state.reachable.forEach(x => x.reachableWeight = 0)
    let reachable = []
    for (let dr = -1; dr < 2; dr++) {
      for (let dc = -1; dc < 2; dc++) {
        if (dr === 0 && dc === 0) {
          continue
        }
        let newPosition = { row: state.position.row + dr, column: state.position.column + dc }
        let steps = state.fields[newPosition.row][newPosition.column].value
        const weight = steps
        let path = []
        while (state.fields[newPosition.row][newPosition.column].value !== 0 && --steps >= 0) {
          path.push(state.fields[newPosition.row][newPosition.column])
          newPosition.row += dr
          newPosition.column += dc
        }
        if (steps <= 0) {
          path.forEach(x => x.reachableWeight = weight)
          reachable = reachable.concat(path);
        }
      }
    }
    state.reachable = reachable
  }
}

const actions = {
  
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
