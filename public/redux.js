const store = require('./store/index')
const {
  incAction,
  decAction,
  addAction,
  subAction,
} = require('./store/actionCreators')

store.subscribe(() => console.log('counter:', store.getState().counter))

store.dispatch(addAction(10))
store.dispatch(addAction(15))
store.dispatch(subAction(8))
store.dispatch(subAction(5))
store.dispatch(incAction())
store.dispatch(decAction())
