import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap-theme.css'
import 'font-awesome/css/font-awesome.css'
import './index.css'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 
  'react-router-redux'
import Reducer from './reducer'
import routes from './routes'

import registerServiceWorker from './registerServiceWorker'

const history = createHistory()
const reducer = Reducer(history)
const createStoreWithMiddleware = applyMiddleware(thunk, routerMiddleware(history))(createStore)
const store = createStoreWithMiddleware(reducer)

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store} >
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
  </Provider>,
  rootElement
)


registerServiceWorker()
