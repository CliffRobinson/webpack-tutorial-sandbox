import React from 'react'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'

import messages from '../reducers/messages'
import reducersObj from '../reducers'
//console.log(reducersObj)
const store = createStore(combineReducers({messages}))

export function App() {
    return <div> I am rendered from React!!!!</div>
}