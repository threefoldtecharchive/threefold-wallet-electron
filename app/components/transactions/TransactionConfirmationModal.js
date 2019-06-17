import React, { Component } from 'react'
import { Header, Modal, Button, List, Icon } from 'semantic-ui-react'
import moment from 'moment-timezone'
const closeOnEscape = true

class ConfirmationModal extends Component {
  componentDidMount () {
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      this.props.confirmTransaction()
    }
  }

  render () {
    const { open, closeModal, confirmTransaction, transactionType, selectedWallet, amount, owners, destination, signatureCount, datelock, timelock, selectedWalletRecipient, selectedRecipientAddress } = this.props
    return (
      <Modal open={open} closeOnEscape={closeOnEscape} onClose={closeModal}>
        <Modal.Header>Confirm transaction</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Do you wish to confirm this transaction?</Header>
            {renderModalBody(transactionType, selectedWallet, amount, owners, destination, signatureCount, timelock, datelock, selectedWalletRecipient, selectedRecipientAddress)}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal} negative>
        Cancel
          </Button>
          <Button
            onClick={confirmTransaction}
            positive
            labelPosition='right'
            icon='checkmark'
            content='Confirm'
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ConfirmationModal

function renderModalBody (transactionType, selectedWallet, amount, owners, destination, signatureCount, timelock, datelock, selectedWalletRecipient, selectedRecipientAddress) {
  if (!selectedWallet) {
    return null
  }
  let timestamp
  let tz
  if (datelock !== '') {
    const concatDate = datelock + ' ' + timelock
    const dateLockDate = new Date(concatDate).valueOf()
    timestamp = moment(dateLockDate).format('MMMM Do YYYY, HH:mm')
    tz = moment.tz.guess()
  }

  // single recipient if single sig transaction
  let recipients = (
    <List.Item>
      <Icon name='right triangle' />
      <List.Content>
        <List.Header>To: </List.Header>
        <List.Description>
          <span style={{ fontSize: 12, fontFamily: 'Menlo-Regular' }}>{destination}</span>
        </List.Description>
      </List.Content>
    </List.Item>
  )
  if (transactionType === 'MULTISIG') {
    // multiple recipients if multi sig transaction
    recipients = (
      <React.Fragment>
        <List.Item>
          <Icon name='right triangle' />
          <List.Content>
            <List.Header>To: </List.Header>
            {owners.map((owner, index) => {
              return (
                <List.Description key={owner + ' ' + index}>
                  <span style={{ fontSize: 12, fontFamily: 'Menlo-Regular' }}>{index + 1}</span>: <span style={{ fontSize: 12, fontFamily: 'Menlo-Regular' }}>{owner}</span>
                </List.Description>
              )
            })}
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon name='right triangle' />
          <List.Content>
            <List.Header>SignatureCount: </List.Header>
            <List.Description>
              {signatureCount}
            </List.Description>
          </List.Content>
        </List.Item>
      </React.Fragment>
    )
  } else if (transactionType === 'INTERNAL') {
    recipients = (<List.Item>
      <Icon name='right triangle' />
      <List.Content>
        <List.Header>To: </List.Header>
        <List.Description>
          wallet {selectedWalletRecipient.wallet_name}, address: <span style={{ fontSize: 12, fontFamily: 'Menlo-Regular' }}>{selectedRecipientAddress}</span>
        </List.Description>
      </List.Content>
    </List.Item>)
  }

  return (
    <List style={{ color: 'black' }}>
      <List.Item>
        <Icon name='right triangle' />
        <List.Content>
          <List.Header>From</List.Header>
          <List.Description>
            { selectedWallet.wallet_name ? (
              <span>{selectedWallet.wallet_name}</span>
            ) : (
              <span style={{ fontSize: 12, fontFamily: 'Menlo-Regular' }}>{selectedWallet.address}</span>
            )}
          </List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <Icon name='right triangle' />
        <List.Content>
          <List.Header>Amount: </List.Header>
          <List.Description>
            {amount} TFT
          </List.Description>
        </List.Content>
      </List.Item>
      {recipients}
      {timestamp ? (
        <List.Item>
          <Icon name='right triangle' />
          <List.Content>
            <List.Header>Timestamp: </List.Header>
            <List.Description>
              {timestamp} - {tz}
            </List.Description>
          </List.Content>
        </List.Item>
      ) : (null)}
    </List>
  )
}
