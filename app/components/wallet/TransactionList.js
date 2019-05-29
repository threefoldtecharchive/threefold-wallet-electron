import React from 'react'
import { Dimmer, Loader, List } from 'semantic-ui-react'
import uuid from 'uuid'
import moment from 'moment'
const { shell } = require('electron')

const confirmedStyle = {
  fontSize: 14,
  marginLeft: 80,
  fontFamily: 'SF UI Text Light',
  position: 'relative',
  top: 0,
  right: 10,
  textAlign: 'right',
  float: 'right',
  color: '#5E49F0'
}

const listDescriptionStyle = {
  color: 'white'
}

const hashFont = {
  fontFamily: 'Lucida Typewriter',
  fontSize: 14,
  marginLeft: 5,
  position: 'relative',
  left: 32
}

const TransactionList = ({ loader, transactions, chainInfo }) => {
  if (loader) {
    return (
      <Dimmer active={loader} >
        <Loader />
      </Dimmer>
    )
  }

  const explorerAddress = chainInfo.explorerAddress

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
                  <List.Header as='a' style={{ color: 'white' + '!important', display: 'flex' }} onClick={() => shell.openExternal(`${explorerAddress}/hash.html?hash=${tx.identifier}`)}>
                    <span style={{ color: '#4B38BE' }}>TXID {tx.identifier}:</span>
                    {tx.confirmed
                      ? (<p style={confirmedStyle}>
                        Confirmed at {moment.unix(tx.timestamp).format('MMMM Do YYYY, HH:mm')}
                      </p>)
                      : (<p style={confirmedStyle}>Unconfirmed</p>)}
                  </List.Header>
                  {renderTransactionBody(tx, explorerAddress)}
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

function renderTransactionBody (tx, explorerAddress) {
  if (tx.inputs.length > 0) {
    return tx.inputs.map(input => {
      return (
        <div key={uuid.v4()} style={{ marginTop: 5, marginBottom: 5 }}>
          <List.Description style={listDescriptionStyle} as='a'>
            Amount: <span style={{ color: '#77dd77' }}>+ {input.amount.str(true)}</span>
            {renderLockedValue(input.lock, input.lock_is_timestamp)}
          </List.Description>
          <List.Description style={listDescriptionStyle} as='a'>
            {input.senders.map(sender => {
              return (
                <div key={tx.identifier} style={{ display: 'flex', marginTop: 5 }} onClick={() => shell.openExternal(`${explorerAddress}/hash.html?hash=${sender}`)}>
                  From:
                  <p style={{ fontSize: 14, marginBottom: 0, fontFamily: 'Lucida Typewriter', position: 'relative', left: 19 }}>
                    {sender}
                  </p>
                </div>
              )
            })}
          </List.Description>
          <List.Description style={{ color: 'white', display: 'flex', marginTop: 3 }} as='a'>
            {input.recipients.map(recipient => {
              return (
                <div key={tx.identifier} style={{ display: 'flex', marginTop: 5 }} onClick={() => shell.openExternal(`${explorerAddress}/hash.html?hash=${recipient}`)}>
                  To:
                  <p style={{ fontSize: 14, marginBottom: 0, fontFamily: 'Lucida Typewriter', position: 'relative', left: 19 }}>
                    {recipient}
                  </p>
                </div>
              )
            })}
          </List.Description>
        </div>
      )
    })
  } else if (tx.outputs.length > 0) {
    return tx.outputs.map(out => {
      return (
        <div key={uuid.v4()} style={{ marginTop: 5, marginBottom: 5 }}>
          <List.Description style={listDescriptionStyle} as='a'>
            Amount: <span style={{ color: '#ff6961' }}>- {out.amount.str(true)}</span>
            {renderLockedValue(out.lock, out.lock_is_timestamp)}
          </List.Description>
          <List.Description style={listDescriptionStyle} as='a'>
            {out.senders.map(sender => {
              return (
                <div key={tx.identifier} style={{ display: 'flex', marginTop: 5 }} onClick={() => shell.openExternal(`${explorerAddress}/hash.html?hash=${sender}`)}>
                  From:
                  <p style={{ fontSize: 14, marginBottom: 0, fontFamily: 'Lucida Typewriter', position: 'relative', left: 19 }}>
                    {sender}
                  </p>
                </div>
              )
            })}
          </List.Description>
          <List.Description style={{ color: 'white', display: 'flex', marginTop: 3 }} as='a'>
            {out.recipients.map(recipient => {
              return (
                <div key={tx.identifier} style={{ display: 'flex', marginTop: 5 }} onClick={() => shell.openExternal(`${explorerAddress}/hash.html?hash=${recipient}`)}>
                  To:
                  <p style={hashFont}>{recipient}</p>
                </div>
              )
            })}
          </List.Description>
        </div>
      )
    })
  }
}

function renderLockedValue (lockValue, isTimestamp) {
  if (lockValue) {
    if (isTimestamp) {
      const lockDate = new Date(lockValue * 1000)
      const formattedDate = moment(lockDate).format('MMMM Do YYYY, HH:mm z')
      return (
        <span style={{ marginLeft: 30 }}>
          Locked until {formattedDate}
        </span>
      )
    } else {
      return (
        <span style={{ marginLeft: 30 }}>
          Locked until block {lockValue}
        </span>
      )
    }
  }
}

export default TransactionList
