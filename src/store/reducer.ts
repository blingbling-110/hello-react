import {
  INCREMENT,
  DECREMENT,
  ADD_NUMBER,
  SUB_NUMBER, CHANGE_BANNER, CHANGE_RECOMMEND,
} from './constants'

const defState = {
  counter: 0,
  banner: [],
  recommend: [],
}

interface IAction {
  type: any,
  num?: number,
  banner?: any
  recommend?: any
}

function reducer (state = defState, action: IAction) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + 1 }
    case DECREMENT:
      return { ...state, counter: state.counter - 1 }
    case ADD_NUMBER:
      return { ...state, counter: state.counter + (action.num ?? 0) }
    case SUB_NUMBER:
      return { ...state, counter: state.counter - (action.num ?? 0) }
    case CHANGE_BANNER:
      return { ...state, banner: action.banner }
    case CHANGE_RECOMMEND:
      return { ...state, recommend: action.recommend }
    default:
      return state
  }
}

export default reducer
