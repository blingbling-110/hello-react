const {
  INCREMENT,
  DECREMENT,
  ADD_NUMBER,
  SUB_NUMBER,
} = require('./constants')

const defState = {
  counter: 0,
}

function reducer (state = defState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + 1 }
    case DECREMENT:
      return { ...state, counter: state.counter - 1 }
    case ADD_NUMBER:
      return { ...state, counter: state.counter + action.num }
    case SUB_NUMBER:
      return { ...state, counter: state.counter - action.num }
    default:
      return state
  }
}

module.exports = reducer
