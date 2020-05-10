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
    
    console.log("adding the dispatch event listener")
    socket.on('dispatch', ({dispatchFunction, payload}) => {
        console.log("Doing dispatch from socket")
        console.log(dispatchFunction)
        console.log(Object.keys(dispatchFunction))
        store.dispatch(dispatchActions[dispatchFunction](payload))
    })

    return store
}


