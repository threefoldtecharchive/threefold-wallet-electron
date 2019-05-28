import React from 'react'
import { Dimmer, Loader, List } from 'semantic-ui-react'
import uuid from 'uuid'
import moment from 'moment'

const confirmedStyle = {
  fontSize: 14,
  marginLeft: 80
}

const TransactionList = ({ loader, transactions }) => {
  if (loader) {
    return (
      <Dimmer active={loader} >
        <Loader />
      </Dimmer>
    )
  }

  if (transactions.length > 0) {
    return (
      <div>
        <Dimmer active={loader} >
          <Loader />
        </Dimmer>
        <h3 style={{ color: 'white', marginTop: 0 }}>Transactions</h3>
        <List style={{ marginLeft: 50, overflow: 'auto', color: 'white' }} divided relaxed>
          {transactions.map(tx => {
            return (
              <List.Item key={uuid.v4()} style={{ borderBottom: '1px solid grey' }}>
                <List.Content>
                  <List.Header as='a' style={{ color: '#6647fe', display: 'flex' }}>
                    TXID: {tx.identifier}
                    {tx.confirmed
                      ? (<p style={confirmedStyle}>
                        Confirmed at {moment.unix(tx.timestamp).format('MMMM Do , HH:mm')}
                      </p>)
                      : (<p style={confirmedStyle}>Unconfirmed</p>)}
                  </List.Header>
                  {renderTransactionBody(tx)}
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      </div>
    )
  } else {
    return (
      <h3 style={{ textAlign: 'center', position: 'relative', left: '45%', top: '45%', display: 'inline-block' }}>
        No transactions yet!
      </h3>
    )
  }
}

function renderTransactionBody (tx) {
  if (tx.inputs.length > 0) {
    return tx.inputs.map(input => {
      return (
        <div key={uuid.v4()} style={{ marginTop: 5, marginBottom: 5 }}>
          <List.Description style={{ color: 'white' }} as='a'>{input.senders.map(sender => { return (<p key={tx.identifier} style={{ fontSize: 14, marginBottom: 0 }}>From: {sender} </p>) })}</List.Description>
          <List.Description style={{ color: 'white' }} as='a'>Amount: <span style={{ color: 'green' }}>+ {input.amount.str()}</span> TFT</List.Description>
          <List.Description style={{ color: 'white' }} as='a'>To: {input.recipient}</List.Description>
        </div>
      )
    })
  } else if (tx.outputs.length > 0) {
    return tx.outputs.map(out => {
      return (
        <div key={uuid.v4()} style={{ marginTop: 5, marginBottom: 5 }}>
          <List.Description style={{ color: 'white' }} as='a'>To: {out.recipient}</List.Description>
          <List.Description style={{ color: 'white' }} as='a'>Amount: <span style={{ color: 'red' }}>- {out.amount.str()}</span> TFT</List.Description>
        </div>
      )
    })
  }
}

export default TransactionList
