import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

import reducers from './reducers/*'

export function configureStore(preloadedState) {

    const rootReducer = combineReducers(reducers)

    return createStore(rootReducer, preloadedState, devToolsEnhancer())
}
