import React from 'react'
import { Dimmer, Loader, List } from 'semantic-ui-react'
import uuid from 'uuid'
import moment from 'moment'
import { differenceWith, flatten, isEqual } from 'lodash'
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
  fontFamily: 'Menlo-Regular',
  fontSize: 12
}

const TransactionList = ({ loader, transactions, chainInfo, account }) => {
  if (loader) {
    return (
      <Dimmer active={loader} >
        <Loader />
      </Dimmer>
    )
  }

  const { explorerAddress, chainTimestamp } = chainInfo
  const accountAddresses = account.addresses
  if (transactions.length > 0) {
    return (
      <div>
        <Dimmer active={loader} >
          <Loader />
        </Dimmer>
        <h3 style={{ color: 'white', marginTop: 0 }}>Transactions</h3>
        {// TODO: added paddingBottom of 120, there must be a better way than this hack (needed it for multisig wallet transaction lists)
        }
        <List style={{ marginLeft: 50, overflow: 'auto', color: 'white', paddingBottom: 120 }} divided relaxed>
          {transactions.map(tx => {
            return (
              <List.Item key={uuid.v4()} style={{ borderBottom: '1px solid grey' }}>
                <List.Content>
                  {renderTransactionHeader(tx, explorerAddress, accountAddresses)}
                  {renderTransactionBody(tx, explorerAddress, chainTimestamp, account)}
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

function renderTransactionBody (tx, explorerAddress, chainTimestamp, account) {
  if (tx.inputs.length > 0) {
    return tx.inputs.map(input => {
      return (
        <div key={uuid.v4()} style={{ marginTop: 5, marginBottom: 5 }}>
          <List.Description style={listDescriptionStyle} as='a'>
            Amount: <span style={{ color: '#77dd77' }}>+ {input.amount.str({
              unit: true
            })}</span>
            {renderLockedValue(input.lock, input.lock_is_timestamp, chainTimestamp)}
          </List.Description>
          <List.Description style={listDescriptionStyle} as='a'>
            {input.senders.map(sender => {
              return (
                <div key={tx.identifier + '_in_' + sender} style={{ display: 'flex', marginTop: 5 }} onClick={() => shell.openExternal(`${explorerAddress}/hash.html?hash=${sender}`)}>
                  From:
                  <p style={{ fontSize: 14, marginBottom: 0, fontFamily: 'Lucida Typewriter', position: 'relative', left: 19 }}>
                    {_addressDisplayElement(sender, account)}
                  </p>
                </div>
              )
            })}
          </List.Description>
          <List.Description style={{ color: 'white', display: 'flex', marginTop: 3 }} as='a'>
            <div key={tx.identifier + '_in_' + input.recipient} style={{ display: 'flex', marginTop: 5 }} onClick={() => shell.openExternal(`${explorerAddress}/hash.html?hash=${input.recipient}`)}>
              To:
              <p style={{ fontSize: 14, marginBottom: 0, fontFamily: 'Lucida Typewriter', position: 'relative', left: 37 }}>
                {_addressDisplayElement(input.recipient, account)}
              </p>
            </div>
          </List.Description>
        </div>
      )
    })
  } else if (tx.outputs.length > 0) {
    return tx.outputs.map(out => {
      return (
        <div key={uuid.v4()} style={{ marginTop: 5, marginBottom: 5 }}>
          <List.Description style={listDescriptionStyle} as='a'>
            Amount: <span style={{ color: '#ff6961' }}>- {out.amount.str({
              unit: true
            })}</span>
            {out.is_fee ? (<span style={{ marginLeft: 3 }}>(fee)</span>) : null}
            {renderLockedValue(out.lock, out.lock_is_timestamp, chainTimestamp)}
          </List.Description>
          <List.Description style={listDescriptionStyle} as='a'>
            {out.senders.map(sender => {
              return (
                <div key={tx.identifier + '_out_' + sender} style={{ display: 'flex', marginTop: 5 }} onClick={() => shell.openExternal(`${explorerAddress}/hash.html?hash=${sender}`)}>
                  From:
                  <p style={{ fontSize: 14, marginBottom: 0, fontFamily: 'Lucida Typewriter', position: 'relative', left: 19 }}>
                    {_addressDisplayElement(sender, account)}
                  </p>
                </div>
              )
            })}
          </List.Description>
          <List.Description style={{ color: 'white', display: 'flex', marginTop: 3 }} as='a'>
            <div key={tx.identifier + '_out_' + out.recipient} style={{ display: 'flex', marginTop: 5 }} onClick={() => shell.openExternal(`${explorerAddress}/hash.html?hash=${out.recipient}`)}>
              To:
              <p style={{ fontSize: 14, marginBottom: 0, fontFamily: 'Lucida Typewriter', position: 'relative', left: 37 }}>
                {_addressDisplayElement(out.recipient, account)}
              </p>
            </div>
          </List.Description>
        </div>
      )
    })
  }
}

function _addressDisplayElement (address, account) {
  const walletName = account.wallet_name_for_address(address)
  if (walletName) {
    return <span><span style={hashFont}>{address}</span> (wallet {`${walletName}`})</span>
  }
  return <span><span style={hashFont}>{address}</span></span>
}

// TODO: this should be above each transaction as we see transactions,
//       meaning above every input->output relationship,
//       this way we can fix the algorithm. Currently it is not 100% correct
function renderTransactionHeader (tx, explorerAddress, accountAddresses) {
  const inputSenders = flatten(tx.inputs.map(input => input.senders))
  const inputReceivers = flatten(tx.inputs.map(input => input.recipient))
  const outputSenders = flatten(tx.outputs.map(output => output.senders))
  const outputReceivers = flatten(tx.outputs.map(output => output.recipient))

  let listHeaderColor = { color: '#4B38BE' }
  let listItemDesc = (<span>Internal transaction</span>)
  if (inputSenders.length > 0) {
    const receivedFromOwnWallet = differenceWith(accountAddresses, inputSenders, isEqual).length === accountAddresses.length
    const receivedToOwnWallet = differenceWith(accountAddresses, inputReceivers, isEqual).length === accountAddresses.length
    if (receivedToOwnWallet || receivedFromOwnWallet) {
      listItemDesc = (null)
    }
  }

  if (outputSenders.length > 0) {
    const sentFromOwnWallet = differenceWith(accountAddresses, outputSenders, isEqual).length === accountAddresses.length
    const sentToOwnWallet = differenceWith(accountAddresses, outputReceivers, isEqual).length === accountAddresses.length
    if (sentToOwnWallet || sentFromOwnWallet) {
      listItemDesc = (null)
    }
  }

  return (
    <div>
      <List.Header as='a' style={{ color: 'white' + '!important', display: 'flex' }} onClick={() => shell.openExternal(`${explorerAddress}/hash.html?hash=${tx.identifier}`)}>
        <span style={listHeaderColor}>TXID {tx.identifier}:</span>
        {tx.confirmed
          ? (<p style={confirmedStyle}>
            Confirmed at {moment.unix(tx.timestamp).format('MMMM Do YYYY, HH:mm')}
          </p>)
          : (<p style={confirmedStyle}>Unconfirmed</p>)}
      </List.Header>
      {listItemDesc}
    </div>
  )
}

function renderLockedValue (lockValue, isTimestamp, chainTimestamp) {
  if (lockValue) {
    if (isTimestamp) {
      const lockDate = new Date(lockValue * 1000)
      const momentLockDate = moment(lockValue)
      const momentChainDate = moment(chainTimestamp)
      const formattedDate = moment(lockDate).format('MMMM Do YYYY, HH:mm z')
      return (
        <span style={{ marginLeft: 30 }}>
          {momentLockDate > momentChainDate
            ? (<span>Locked until {formattedDate}</span>)
            : (<span>Unlocked since {formattedDate}</span>)
          }
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
