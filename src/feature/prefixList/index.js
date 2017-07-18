import './style.css'
import React from 'react'
import _ from 'lodash'
import Prefix from '../prefix'
import { connect } from 'react-redux'
import { getKeySet, listPrefixes } from './actions'

const handle = _.debounce((getKeys, prefix) => getKeys(prefix), 200, {leading: true})
const PrefixListView = ({ prefixes, location, history, getList, getKeys }) => {
  if (!prefixes.length) {
    getList()
  }
  history.listen((location, action) => {
    const prefix = location.pathname.split('/')[2]
    if (prefix) {
      handle(getKeys, prefix)
    }
  })
  const list = prefixes.map(prefix =>
    <Prefix name={prefix} location={location} key={prefix} />
  )
  return (
    <div className='horizontal-list'>
      <ul className='nav nav-pills flex-column'>
        {list}
      </ul>
    </div>)
}

const mapStateToProps = (state, ownProps) => {
  return {
    prefixes: state.prefixes.list,
    location: state.routing.location,
    history: state.nav.history
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getList: () => dispatch(listPrefixes()),
    getKeys: (prefix) => dispatch(getKeySet(prefix))
  }
}

const PrefixList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrefixListView)

export default PrefixList
