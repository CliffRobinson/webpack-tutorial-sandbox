// import { addEl } from "./DOMscript";
//import { addLodashEl, addGallia } from "./LodashDomScript";

// document.body.appendChild(addEl());
//document.body.appendChild(addLodashEl());
// document.body.appendChild(addGallia());

import React from 'react'
import reactDom from 'react-dom'

import {App} from './components/App'
import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    reactDom.render(
      <App />,
      document.getElementById('app')
    )
  })