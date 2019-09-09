import React from 'react'
import { Dimmer, Loader, List, Icon, Label } from 'semantic-ui-react'
import uuid from 'uuid'
import moment from 'moment'
import { differenceWith, flatten, isEqual, find } from 'lodash'
import styles from '../home/Home.css'
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
  color: 'white'
}

const listDescriptionStyle = {
  color: '#d3d3d3'
}

const hashFont = {
  fontFamily: 'Menlo-Regular',
  fontSize: 12
}

const TransactionList = ({ loader, transactions, chainInfo, account, addContact }) => {
  if (loader) {
    return (
      <Dimmer active={loader} >
        <Loader />
      </Dimmer>
    )
  }

  if (transactions && transactions.length > 0) {
    const { explorer_address: explorerAddress, chain_timestamp: chainTimestamp } = chainInfo
    const accountAddresses = account.addresses
    return (
      <div>
        <Dimmer active={loader} >
          <Loader />
        </Dimmer>
        <h3 style={{ color: 'white', marginTop: 0 }}>Transactions</h3>
        {// TODO: added paddingBottom of 120, there must be a better way than this hack (needed it for multisig wallet transaction lists)
        }
        <List style={{ overflow: 'auto', color: 'white', paddingBottom: 20 }} divided relaxed>
          {transactions.map(tx => {
            return (
              <List.Item key={uuid.v4()} style={{ borderBottom: '1px solid grey' }}>
                <List.Content>
                  {renderTransactionHeader(tx, explorerAddress, accountAddresses)}
                  {renderTransactionBody(tx, explorerAddress, chainTimestamp, account, addContact)}
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

function renderTransactionBody (tx, explorerAddress, chainTimestamp, account, addContact) {
  if (tx.inputs.length > 0) {
    return tx.inputs.map(input => {
      return (
        <div key={uuid.v4()} style={{ marginTop: 5, marginBottom: 5 }}>
          <List.Description style={listDescriptionStyle}>
            Amount: <span style={{ color: '#77dd77' }}>+ {input.amount.str({
              unit: true
            })}</span>
            {renderLockedValue(input.lock, input.lock_is_timestamp, chainTimestamp)}
          </List.Description>
          <List.Description style={listDescriptionStyle}>
            {input.senders.map(sender => {
              return (
                <div key={tx.identifier + '_in_' + sender} style={{ display: 'flex', marginTop: 5 }}>
                  From:
                  <p style={{ fontSize: 14, marginBottom: 0, fontFamily: 'Lucida Typewriter', position: 'relative', left: 19 }}>
                    {_addressDisplayElement(sender, account, explorerAddress, addContact)}
                  </p>
                </div>
              )
            })}
          </List.Description>
          <List.Description style={{ color: 'white', display: 'flex', marginTop: 3 }}>
            <div key={tx.identifier + '_in_' + input.recipient} style={{ display: 'flex', marginTop: 5 }}>
              To:
              <p style={{ fontSize: 14, marginBottom: 0, fontFamily: 'Lucida Typewriter', position: 'relative', left: 37 }}>
                {_addressDisplayElement(input.recipient, account, explorerAddress, addContact)}
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
          <List.Description style={listDescriptionStyle}>
            Amount: <span style={{ color: '#ff6961' }}>- {out.amount.str({
              unit: true
            })}</span>
            {out.is_fee ? (<span style={{ marginLeft: 3 }}>(fee)</span>) : null}
            {renderLockedValue(out.lock, out.lock_is_timestamp, chainTimestamp)}
          </List.Description>
          <List.Description style={listDescriptionStyle}>
            {out.senders.map(sender => {
              return (
                <div key={tx.identifier + '_out_' + sender} style={{ display: 'flex', marginTop: 5 }}>
                  From:
                  <p style={{ fontSize: 14, marginBottom: 0, fontFamily: 'Lucida Typewriter', position: 'relative', left: 19 }}>
                    {_addressDisplayElement(sender, account, explorerAddress, addContact)}
                  </p>
                </div>
              )
            })}
          </List.Description>
          <List.Description style={{ color: 'white', display: 'flex', marginTop: 3 }}>
            <div key={tx.identifier + '_out_' + out.recipient} style={{ display: 'flex', marginTop: 5 }}>
              To:
              <p style={{ fontSize: 14, marginBottom: 0, fontFamily: 'Lucida Typewriter', position: 'relative', left: 37 }}>
                {_addressDisplayElement(out.recipient, account, explorerAddress, addContact)}
              </p>
            </div>
          </List.Description>
        </div>
      )
    })
  }
}

function _addressDisplayElement (address, account, explorerAddress, addContact) {
  const openExplorerIcon = (<Icon style={{ cursor: 'pointer', marginLeft: 10, marginRight: 10 }} name='external alternate' onClick={() => shell.openExternal(`${explorerAddress}/hash.html?hash=${address}`)} />)
  let addressElement = (<span style={hashFont}>{address}</span>)

  // default add single sig contact (pass address as a single string)
  let onClick = () => addContact(address)
  const wallet = account.wallet_for_address(address)
  if (wallet) {
    // if there is a wallet associated with the address than pass recipient (can be single string or array in case of multisig)
    onClick = () => addContact(wallet.recipient_get())
  }

  let contactOrWallet = (<Label onClick={onClick} className={styles.tinyAcceptButton} as='a'>
    <Icon name='plus' />
  Add to contacts
  </Label>)

  const { address_book: addressBook } = account
  const { contacts } = addressBook

  // Filter out multisig contacts
  const singleContacts = contacts.filter(contact => !(contact.recipient instanceof Array))
  // Check if address to display is a contact from addressboek
  const contact = find(singleContacts, contact => contact.recipient === address)

  // Single sig contact
  if (contact) {
    addressElement = (<span style={hashFont}>{contact.recipient}</span>)
    contactOrWallet = (<span>(contact: {contact.contact_name})</span>)
  }

  // Single sig wallet
  if (wallet && wallet.wallet_name) {
    addressElement = (<span style={hashFont}>{address}</span>)
    contactOrWallet = (<span>(wallet {`${wallet.wallet_name}`})</span>)
  }

  // If nothing above and there is a ms wallet connected to the recipients, show ms wallet contact
  if (wallet && wallet.is_multisig) {
    const msContacts = contacts.filter(contact => contact.recipient instanceof Array)
    const msContact = find(msContacts, contact => isEqual(contact.recipient[1], wallet.authorized_owners))
    if (msContact) {
      addressElement = (<React.Fragment><span style={hashFont}>{address}</span></React.Fragment>)
      contactOrWallet = (<span>(contact: {msContact.contact_name})</span>)
    }
  }

  return (
    <React.Fragment>
      {addressElement}
      {openExplorerIcon}
      {contactOrWallet}
    </React.Fragment>
  )
}

// TODO: this should be above each transaction as we see transactions,
//       meaning above every input->output relationship,
//       this way we can fix the algorithm. Currently it is not 100% correct
function renderTransactionHeader (tx, explorerAddress, accountAddresses) {
  const inputSenders = flatten(tx.inputs.map(input => input.senders))
  const inputReceivers = flatten(tx.inputs.map(input => input.recipient))
  const outputSenders = flatten(tx.outputs.map(output => output.senders))
  const outputReceivers = flatten(tx.outputs.map(output => output.recipient))

  let listHeaderColor = { color: '#d3d3d3' }
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
      <List.Header style={{ color: 'white' + '!important', display: 'flex', justifyContent: 'space-between' }}>
        <span style={listHeaderColor}>TXID {tx.identifier}: <Icon style={{ cursor: 'pointer', marginLeft: 5 }} name='external alternate' onClick={() => shell.openExternal(`${explorerAddress}/hash.html?hash=${tx.identifier}`)} /></span>
        {tx.confirmed
          ? (<p style={confirmedStyle}>
            Confirmed at {moment.unix(tx.timestamp).format('MMMM Do YYYY, HH:mm')}
          </p>)
          : (<p style={confirmedStyle}>Unconfirmed</p>)}
      </List.Header>
      {listItemDesc}
      <div style={{ display: 'flex', margin: 1, marginRight: 10, justifyContent: 'space-between', marginLeft: 'auto' }}>
        <List.Description style={listDescriptionStyle}>
          <p style={{ fontSize: 14 }}>
            {tx.sender ? (
              <span>Sender Info: {tx.sender}</span>
            ) : null }
          </p>
        </List.Description>
        <List.Description style={listDescriptionStyle}>
          <p style={{ fontSize: 14 }}>
            {tx.message ? (
              <span>Message: {tx.message}</span>
            ) : null }
          </p>
        </List.Description>
      </div>
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
