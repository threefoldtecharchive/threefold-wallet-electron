import React, { Component } from 'react'
import { Header, Modal, Button, List, Icon } from 'semantic-ui-react'
import moment from 'moment-timezone'
const closeOnEscape = true

class ConfirmationModal extends Component {
  render () {
    const { open, closeModal, confirmTransaction, transactionType, selectedWallet, amount, owners, destination, signatureCount, timestamp, selectedWalletRecipient, selectedRecipientAddress, minimumMinerFee, description } = this.props
    return (
      <Modal open={open} closeOnEscape={closeOnEscape} onClose={closeModal}>
        <Modal.Header>Confirm transaction</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Do you wish to confirm this transaction?</Header>
            {renderModalBody(transactionType, selectedWallet, amount, owners, destination, signatureCount, timestamp, selectedWalletRecipient, selectedRecipientAddress, minimumMinerFee, description)}
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

function renderModalBody (transactionType, selectedWallet, amount, owners, destination, signatureCount, timestamp, selectedWalletRecipient, selectedRecipientAddress, minimumMinerFee, description) {
  if (!selectedWallet) {
    return null
  }

  let tz
  if (timestamp) {
    timestamp = moment(timestamp).format('MMMM Do YYYY, HH:mm')
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
            {minimumMinerFee.plus(amount).str({ unit: true })} (* including minerfee: {minimumMinerFee.str()})
          </List.Description>
        </List.Content>
      </List.Item>
      {description ? (
        <List.Item>
          <Icon name='right triangle' />
          <List.Content>
            <List.Header>Description: </List.Header>
            <List.Description>
              {description}
            </List.Description>
          </List.Content>
        </List.Item>
      ) : null}
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
