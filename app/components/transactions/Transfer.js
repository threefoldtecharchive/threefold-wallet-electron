// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Tab, Divider, Button } from 'semantic-ui-react'
import styles from '../home/Home.css'
import SingleTransaction from './SingleTransaction'
import MultisigTransaction from './MultisigTransaction'
import InternalTransaction from './InternalTransaction'
import BurnTransaction from './BurnTransaction'
import uuid from 'uuid'

const tabStyle = {
  background: '#131421',
  border: 'none',
  height: '100%',
  overflow: 'auto'
}

const mapStateToProps = state => ({
  account: state.account.state
})

class Transfer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allowMultisig: this.props.account.chain_type !== 'goldchain' && this.props.account.chain_type !== 'eurochain',
      allowBurnTx: this.props.account.chain_type === 'goldchain' && this.props.account.chain_type === 'eurochain'
    }
  }

  render () {
    const hasInternal = this.props.account.wallet_count <= 1
    let panes = [
      { menuItem: <Button key={uuid.v4()} className={'item'}>Single Transaction</Button>, render: () => <Tab.Pane style={tabStyle}><SingleTransaction /></Tab.Pane> },
      { menuItem: <Button key={uuid.v4()} disabled={hasInternal} className={hasInternal ? styles.disableTab : 'item'}>Internal Transaction</Button>, render: () => <Tab.Pane style={tabStyle}><InternalTransaction /></Tab.Pane> }
    ]

    if (this.state.allowMultisig) {
      panes.push({ menuItem: <Button key={uuid.v4()} className={'item'}>Multisig Transaction</Button>, render: () => <Tab.Pane style={tabStyle}><MultisigTransaction /></Tab.Pane> })
    }
    if (this.state.allowBurnTx) {
      panes.push({ menuItem: <Button key={uuid.v4()} className={'item'}>Burn Transaction</Button>, render: () => <Tab.Pane style={tabStyle}><BurnTransaction /></Tab.Pane> })
    }

    return (
      <div style={{ paddingBottom: 30 }}>
        <div className={styles.pageHeader}>
          <p className={styles.pageHeaderTitle}>Transfer </p>
          <p className={styles.pageHeaderSubtitle}>Transfer tokens to other wallets</p>
        </div>
        <Divider className={styles.pageDivider} />
        <div style={{ paddingBottom: 30 }}>
          <Tab menu={{ inverted: true, attached: true }} panes={panes} style={{ width: '90%', margin: 'auto', height: '100%' }} />
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(Transfer)
