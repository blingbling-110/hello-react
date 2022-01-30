const {
  INCREMENT,
  DECREMENT,
  ADD_NUMBER,
  SUB_NUMBER,
} = require('./constants')

const incAction = () => ({ type: INCREMENT })
const decAction = () => ({ type: DECREMENT })
const addAction = num => ({ type: ADD_NUMBER, num })
const subAction = num => ({ type: SUB_NUMBER, num })

module.exports = {
  incAction,
  decAction,
  addAction,
  subAction,
}
