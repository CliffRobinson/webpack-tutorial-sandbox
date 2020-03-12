// import { addEl } from "./DOMscript";
//import { addLodashEl, addGallia } from "./LodashDomScript";

// document.body.appendChild(addEl());
//document.body.appendChild(addLodashEl());
// document.body.appendChild(addGallia());

import React from 'react'
import reactDom from 'react-dom'
import {Provider} from 'react-redux'

import { App } from './components/App'
import './style.css'

import {configureStore} from './configureStore'

document.addEventListener('DOMContentLoaded', () => {
    reactDom.render( 
        < Provider store = { configureStore() } >
        < App />
        </Provider>,
        document.getElementById('app')
    )
})