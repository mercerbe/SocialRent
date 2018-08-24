//standard dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
//router
import { BrowserRouter } from 'react-router-dom'
//semantic ui css
import 'semantic-ui-css/semantic.min.css'
import './images/favicon.png'

ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
