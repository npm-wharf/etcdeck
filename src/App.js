import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Main from './feature/main'
import About from './feature/about'
import NavBar from './feature/navbar'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>etcdeck</h2>
        </div>
        <NavBar />
        <div className="App-main">
          <Switch>
            <Route exact path="/about" component={About} />
            <Route path="/" component={Main} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
