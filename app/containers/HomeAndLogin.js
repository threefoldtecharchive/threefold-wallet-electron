// @flow
import React, { Component } from 'react'

export default class HomeAndLogin extends Component {
  render () {
    const { children } = this.props
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  }
}
