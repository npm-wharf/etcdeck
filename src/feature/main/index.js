import React, { Component } from 'react'
import './style.css'
import { connect } from 'react-redux'
import PrefixList from '../prefixList'
import KeySet from '../keySet'
import NewPrefix from '../newPrefix'
import { Route, Switch } from 'react-router-dom'

class Main extends Component {
  render () {
    return (
      <div className='main-container row'>
        <div className='col-xs-4 col-sm-3 col-md-3 col-lg-2'>
          <PrefixList />
        </div>
        <div className='col-xs-8 col-sm-9 col-md-9 col-lg-10 main-component'>
          <Switch>
            <Route path='/add-prefix' component={NewPrefix} />
            <Route path='/prefix' component={KeySet} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Main
