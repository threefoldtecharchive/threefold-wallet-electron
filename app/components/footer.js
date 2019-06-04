import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setChainConstants } from '../actions'
import moment from 'moment'
import momentTz from 'moment-timezone'

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
  render () {
    const { chainConstants } = this.props
    let error = false
    if (chainConstants.err) {
      error = true
    }
    const date = moment(chainConstants.chain_timestamp).format('MMMM Do , HH:mm')
    const tz = momentTz.tz.guess()

    return (
      <div style={{ position: 'absolute', height: 70, bottom: 0, width: '100%', background: '#131216', borderTopStyle: 'solid', borderTopWidth: 2, borderTopColor: '#1A253F', padding: 25 }}>
        {error || !chainConstants.chainNetwork
          ? <div>
            <Icon name='circle' style={{ color: 'red', marginLeft: 10 }} />
            <label>not connected</label>
          </div>
          : <div>
            <Icon name='circle' style={{ color: 'green', marginLeft: 10 }} />
            <label>connected to {chainConstants.chainNetwork}</label>
            <label style={{ position: 'absolute', right: 500 }}><Icon name='h square' /> {chainConstants.chainHeight} @ {date} {tz}</label>
            <label style={{ position: 'absolute', right: 50 }}>version 0.1.0</label>
          </div>
        }
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
