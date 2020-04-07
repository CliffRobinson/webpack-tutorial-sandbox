import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import "regenerator-runtime/runtime"

import reducers from './reducers/*'

import {rootSaga} from './sagas'

const sagaMiddleware = createSagaMiddleware()



export function configureStore(preloadedState) {

    const rootReducer = combineReducers(reducers)

    const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(sagaMiddleware)))
    sagaMiddleware.run(rootSaga)
    return store
}


