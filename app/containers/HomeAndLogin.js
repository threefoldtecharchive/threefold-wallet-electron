// @flow
import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

export default class HomeAndLogin extends Component {
  render () {
    const { children } = this.props
    return (
      <Scrollbars style={{ height: '100vh' }} renderThumbVertical={props => <div {...props} style={{ backgroundColor: 'grey' }} />}>
        {children}
      </Scrollbars>
    )
  }
}
