import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import moment from 'moment'
import momentTz from 'moment-timezone'
const pjson = require('../../package.json')

const mapStateToProps = state => ({
  account: state.account.state,
  is_loaded: state.account.state.is_loaded
})

class Footer extends Component {
  render () {
    const { account } = this.props
    const { chain_info: chainConstants } = account
    let error = false
    if (chainConstants.err) {
      error = true
    }
    const date = moment(chainConstants.chain_timestamp * 1000).format('MMMM Do , HH:mm')
    const tz = momentTz.tz.guess()

    if (!this.props.is_loaded) {
      return (
        <div style={{ position: 'absolute', height: 70, bottom: 0, width: '100%', background: '#131216', borderTopStyle: 'solid', borderTopWidth: 2, borderTopColor: '#1A253F', padding: 25 }} />
      )
    }

    return (
      <div style={{ position: 'absolute', height: 70, bottom: 0, width: '100%', background: '#131216', borderTopStyle: 'solid', borderTopWidth: 2, borderTopColor: '#1A253F', padding: 25 }}>
        {error || !chainConstants.chain_network
          ? <div>
            <Icon name='circle' style={{ color: 'red', marginLeft: 10 }} />
            <label>not connected</label>
          </div>
          : <div>
            <Icon name='circle' style={{ color: 'green', marginLeft: 10 }} />
            <label>connected to {chainConstants.chain_network}</label>
            <label style={{ position: 'absolute', right: 450 }}><Icon name='h square' /> {chainConstants.chain_height} @ {date} {tz}</label>
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
