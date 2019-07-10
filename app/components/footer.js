import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import moment from 'moment'
import momentTz from 'moment-timezone'
const { shell } = require('electron')
const pjson = require('../../package.json')

const mapStateToProps = state => {
  if (!state.account.state) {
    return {
      account: null,
      is_loaded: false,
      walletLoadedCount: 0,
      walletCount: 0,
      intermezzoUpdateCount: 0
    }
  }
  return {
    account: state.account.state,
    is_loaded: state.account.state.is_loaded,
    walletLoadedCount: state.account.walletLoadedCount,
    walletCount: state.account.walletCount,
    intermezzoUpdateCount: state.account.intermezzoUpdateCount
  }
}

class Footer extends Component {
  render () {
    if (!this.props.is_loaded) {
      return (
        <div style={{ position: 'absolute', height: 70, bottom: 0, width: '100%', background: '#26242d', borderTopStyle: 'solid', borderTopWidth: 2, borderTopColor: '#1A253F', padding: 25 }} />
      )
    }

    const { account } = this.props
    const { chain_info: chainConstants } = account
    let error = false
    if (chainConstants.err) {
      error = true
    }
    const date = moment(chainConstants.chain_timestamp * 1000).format('MMMM Do , HH:mm')
    const tz = momentTz.tz.guess()

    return (
      <div style={{ zIndex: 999, position: 'fixed', height: 70, bottom: 0, width: '100%', background: '#0C0C14', padding: 25 }}>
        {error || !chainConstants.chain_network
          ? <div>
            <Icon name='circle' style={{ color: 'red', marginLeft: 10 }} />
            <label>not connected</label>
          </div>
          : <div>
            <Icon name='circle' style={{ color: 'green', marginLeft: 10 }} />
            <label><a onClick={() => shell.openExternal(`${chainConstants.explorer_address}`)}>connected to {chainConstants.chain_network}</a></label>
            <label style={{ position: 'absolute', right: 450 }}><a onClick={() => shell.openExternal(`${chainConstants.explorer_address}/block.html?height=${chainConstants.chain_height}`)}><Icon name='h square' /> {chainConstants.chain_height} @ {date} {tz}</a></label>
            <label style={{ position: 'absolute', right: 50 }}>version {pjson.version}</label>
          </div>
        }
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(Footer)
