import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setChainConstants } from '../actions'
import moment from 'moment'

const mapStateToProps = state => ({
  account: state.account,
  chainConstants: state.chainConstants
})

const mapDispatchToProps = (dispatch) => ({
  setChainConstants: (constants) => {
    dispatch(setChainConstants(constants))
  }
})

class Footer extends Component {
  componentDidMount () {
    this.getChainInfo()
    this.interval = setInterval(() => { this.getChainInfo() }, 60000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  getChainInfo = () => {
    if (this.props.account.chain_info_get) {
      this.props.account.chain_info_get().then(info => {

        const chainInfo = {
          chainHeight: info._chain_height,
          chainName: info._chain_name,
          chainNetwork: info._chain_network,
          chainTimestamp: info._chain_timestamp,
          chainVersion: info._chain_version
        }
        this.props.setChainConstants(chainInfo)
      })

    }
  }

  render () {
    const { chainConstants } = this.props
    const date = moment(chainConstants.chain_timestamp).format('MMMM Do , HH:mm')

    return (
      <div style={{ position: 'absolute', height: 70, bottom: 35, width: '100%', background: '#131216', borderTopStyle: 'solid', borderTopWidth: 2, borderTopColor: '#1A253F', padding: 25 }}>
        <Icon name='circle' style={{ color: 'green', marginLeft: 10 }} />
        <label>connected to {chainConstants.chainNetwork}</label>
        <label style={{ position: 'absolute', right: 500 }}><Icon name='h square'/> {chainConstants.chainHeight} @ {date}</label>
        <label style={{ position: 'absolute', right: 50 }}>version 0.1.0</label>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
