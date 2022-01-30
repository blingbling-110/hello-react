import {
  INCREMENT,
  DECREMENT,
  ADD_NUMBER,
  SUB_NUMBER,
} from './constants'

const defState = {
  counter: 0,
}

function reducer (state = defState, action: { type: any; num?: number }) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + 1 }
    case DECREMENT:
      return { ...state, counter: state.counter - 1 }
    case ADD_NUMBER:
      return { ...state, counter: state.counter + (action.num??0) }
    case SUB_NUMBER:
      return { ...state, counter: state.counter - (action.num??0) }
    default:
      return state
  }
}

export default reducer
