import { ADD_NUMBER, DECREMENT, INCREMENT, SUB_NUMBER } from './constants'

export interface ICounterState {
  counter: number
}

export interface ICounterAction {
  type: any,
  num?: number
}

const defCounterInfo = {
  counter: 0,
}

export default function counterReducer (counterInfo: ICounterState = defCounterInfo, action: ICounterAction) {
  switch (action.type) {
    case INCREMENT:
      return { ...counterInfo, counter: counterInfo.counter + 1 }
    case DECREMENT:
      return { ...counterInfo, counter: counterInfo.counter - 1 }
    case ADD_NUMBER:
      return { ...counterInfo, counter: counterInfo.counter + (action.num ?? 0) }
    case SUB_NUMBER:
      return { ...counterInfo, counter: counterInfo.counter - (action.num ?? 0) }
    default:
      return counterInfo
  }
}
