import log from 'loglevel'
import React from 'react'
import reactDom from 'react-dom'
import {Provider} from 'react-redux'

import { App } from './components/App'
import './style.css'

import {configureStore} from './configureStore'

log.setLevel('debug')

document.addEventListener('DOMContentLoaded', () => {
    reactDom.render( 
        < Provider store = { configureStore() } >
        < App />
        </Provider>,
        document.getElementById('app')
    )
})