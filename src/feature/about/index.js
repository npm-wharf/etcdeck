import React from 'react'
import './style.css'

const About = () => (
  <div className='container-fluid'>
    <h2>About</h2>
    <div className='row'>
      <div className='col-md-5 about-section'>
        <h3>What</h3>
        <p>
        This is a single page web application that allows you to create, manage and view etcd namespaces and keys in the style of <a href='https://www.npmjs.com/package/furthermore'>furthermore</a>.
        </p>
        <p>
        It will attempt to establish a socket.io connection with the browser and watch keyspaces so that it can update keys on changes made outside of your session.
        </p>
      </div>
      <div className='col-md-5 about-section'>
        <h3>How</h3>
        <p>
        Most of the React and express implementation is straight-forward.
        deftly was used to implement the server-side API on express and socket.io with a simple wrapper around node-etcd.
        create-react-app helped bootstrap the client-side and I used redux, react-router and their glue libraries to make all that work together.
        </p>
        <b>Notable tech used in this app:</b>
        <h4>Client</h4>
        <p>
          React, create-react-app, react-router, redux, redux-thunk, Webpack, Bootstrap, Font Awesome.
        </p>
        <h4>Server</h4>
        <p>
          deftly, express, node-etcd
        </p>
      </div>
    </div>
  </div>
)

export default About
