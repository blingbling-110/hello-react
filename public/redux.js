const store = require('./store/index')
const {
  incAction,
  decAction,
  addAction,
  subAction,
} = require('./store/actionCreators')

store.subscribe(() => console.log('counter:', store.getState().counter))

function patchLogging (store) {
  const oriDispatch = store.dispatch
  store.dispatch = action => {
    console.log('dispatch前：', action)
    oriDispatch(action)
    console.log('dispatch前：', store.getState())
  }
}

// patchLogging(store)

function patchThunk (store) {
  const oriDispatch = store.dispatch
  store.dispatch = action => {
    if (typeof action === 'function') {
      action(store.dispatch, store.getState)
    } else {
      oriDispatch(action)
    }
  }
}

// patchThunk(store)

function applyMiddleware (...middlewares) {
  middlewares = [...middlewares]
  middlewares.forEach(middleware => middleware(store))
}

applyMiddleware(patchLogging, patchThunk)

store.dispatch(addAction(10))
store.dispatch(addAction(15))
store.dispatch(subAction(8))
store.dispatch(subAction(5))
store.dispatch(incAction())
store.dispatch(decAction())
// noinspection JSCheckFunctionSignatures
store.dispatch(dispatch => dispatch(subAction(10)))
