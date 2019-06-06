// @flow
import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
// import HomePage from '../components/home/Home'

export default class App extends Component {
  render () {
    const { children } = this.props
    return (
      <React.Fragment>
        {children}
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      </React.Fragment>
    )
  }
}
