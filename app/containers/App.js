// @flow
import * as React from 'react'
import { ToastContainer, toast } from 'react-toastify'

export default class App extends React.Component {
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
