import { ADD_NUMBER, DECREMENT, INCREMENT, SUB_NUMBER } from './constants'

export const incAction = () => ({ type: INCREMENT })
export const decAction = () => ({ type: DECREMENT })
export const addAction = (num: number) => ({ type: ADD_NUMBER, num })
export const subAction = (num: number) => ({ type: SUB_NUMBER, num })
