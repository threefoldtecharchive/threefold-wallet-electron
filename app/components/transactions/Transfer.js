// @flow
import React, { Component } from 'react'
import { Tab, Divider } from 'semantic-ui-react'
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

class Transfer extends Component {
  render () {
    const panes = [
      { menuItem: 'Single Transaction', render: () => <Tab.Pane style={tabStyle}><SingleTransaction /></Tab.Pane> },
      { menuItem: 'Internal Transaction', render: () => <Tab.Pane style={tabStyle}><InternalTransaction /></Tab.Pane> },
      { menuItem: 'Multisig Transaction', render: () => <Tab.Pane style={tabStyle}><MultisigTransaction /></Tab.Pane> }
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

export default Transfer
