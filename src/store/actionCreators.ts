import {
  INCREMENT,
  DECREMENT,
  ADD_NUMBER,
  SUB_NUMBER,
} from './constants'

const incAction = () => ({ type: INCREMENT })
const decAction = () => ({ type: DECREMENT })
const addAction = (num: number) => ({ type: ADD_NUMBER, num })
const subAction = (num: number) => ({ type: SUB_NUMBER, num })

export {
  incAction,
  decAction,
  addAction,
  subAction,
}
