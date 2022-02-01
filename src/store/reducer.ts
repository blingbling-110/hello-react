import counterReducer from './counter/reducer'
import homeReducer from './home/reducer'
import { combineReducers } from 'redux'

// interface IState {
//   counterInfo?: ICounterState,
//   homeInfo?: IHomeState
// }

// function reducer (state: IState = {}, action: ICounterAction | IHomeAction) {
//   return {
//     counterInfo: counterReducer(state.counterInfo, action),
//     homeInfo: homeReducer(state.homeInfo, action),
//   }
// }

const reducer = combineReducers({
  counterInfo: counterReducer,
  homeInfo: homeReducer,
})

export default reducer
