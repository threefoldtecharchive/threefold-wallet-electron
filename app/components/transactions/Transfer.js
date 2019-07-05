// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Tab, Divider, Button } from 'semantic-ui-react'
import styles from '../home/Home.css'
import SingleTransaction from './SingleTransaction'
import MultisigTransaction from './MultisigTransaction'
import InternalTransaction from './InternalTransaction'

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
  render () {
    const hasInternal = this.props.account.wallet_count <= 1
    const panes = [
      { menuItem: <Button className={'item'}>Single Transaction</Button>, render: () => <Tab.Pane style={tabStyle}><SingleTransaction /></Tab.Pane> },
      { menuItem: <Button disabled={hasInternal} className={hasInternal ? styles.disableTab : 'item'}>Internal Transaction</Button>, render: () => <Tab.Pane style={tabStyle}><InternalTransaction /></Tab.Pane> },
      { menuItem: <Button className={'item'}>Multisig Transaction</Button>, render: () => <Tab.Pane style={tabStyle}><MultisigTransaction /></Tab.Pane> }
    ]

    return (
      <div>
        <div className={styles.pageHeader}>
          <p className={styles.pageHeaderTitle}>Transfer </p>
          <p className={styles.pageHeaderSubtitle}>Transfer tokens to other wallets</p>
        </div>
        <Divider className={styles.pageDivider} />
        <div style={{ height: '80vh', paddingBottom: 100 }}>
          <Tab menu={{ color: 'white', inverted: true, attached: true }} panes={panes} style={{ width: '90%', margin: 'auto', height: '100%' }} />
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(Transfer)
