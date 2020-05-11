import log from 'loglevel'

import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducers/*'

import { socketInstance as socket} from './socket-client'

import * as dispatchActions from './actions/messageActions'

const addSocketMiddleware = store => next => action => {
        next( { ...action, socket})
}

export function configureStore(preloadedState) {

    const rootReducer = combineReducers(reducers)

    const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(addSocketMiddleware)))
    
    log.trace("adding the dispatch event listener")
    socket.on('dispatch', ({dispatchFunction, payload}) => {
        log.trace(`Dispatching function ${dispatchFunction} to store`)
        store.dispatch(dispatchActions[dispatchFunction](payload))
    })

    return store
}

export const forUnitTesting = {
    addSocketMiddleware
}