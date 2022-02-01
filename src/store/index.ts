import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import thunkMiddleware from 'redux-thunk'

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose
const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware))
export default createStore(reducer, enhancer)
