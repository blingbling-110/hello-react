import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import mySaga from './saga'

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose
const sagaMiddleware = createSagaMiddleware()
const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware))
const store = createStore(reducer, enhancer)
sagaMiddleware.run(mySaga)

export default store
