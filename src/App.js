import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Main from './feature/main'
import About from './feature/about'
import Notifications from './feature/notification'
import NavBar from './feature/navbar'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <div className='header'>
          <h2>etcdeck</h2>
        </div>
        <Notifications />
        <NavBar />
        <div className='main container-fluid'>
          <Switch>
            <Route exact path='/about' component={About} />
            <Route path='/' component={Main} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
