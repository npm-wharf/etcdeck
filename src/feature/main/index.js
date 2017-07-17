import React from 'react'
import './style.css'

// import { changeAddress, processAddress } from "./actions";
import { connect } from 'react-redux'
import PrefixList from '../prefixList'
import KeySet from '../keySet'
import { Route, Switch } from 'react-router-dom'

// import Links from "../links/component";

const MainView = ( {  } ) => {
  return (
    <div className="main-container">
      <div className="row">
        <div className="col-xs-4 col-sm-2 col-md-2 col-lg-1">
          <PrefixList />
        </div>
        <div className="col-xs-8 col-sm-10 col-md-10 col-lg-11">
          <Switch>
            <Route path="/prefix" component={KeySet} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ( state, ownProps ) => {
  return {
    
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    
  }
}

const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)( MainView );

export default Main;