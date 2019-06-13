import React from 'react'
import { Header, Modal, Button, List, Icon } from 'semantic-ui-react'
import moment from 'moment-timezone'

const closeOnEscape = true

const confirmationModal = ({ open, closeModal, transaction, confirmTransaction, multiSigTransaction, selectedWallet, amount, owners, destination, signatureCount, datelock, timelock }) => (
  <Modal open={open} closeOnEscape={closeOnEscape} onClose={closeModal}>
    <Modal.Header>Confirm transaction</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Do you wish to confirm this transaction?</Header>
        {renderModalBody(multiSigTransaction, selectedWallet, amount, owners, destination, signatureCount, timelock, datelock)}
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

function renderModalBody (multiSigTransaction, selectedWallet, amount, owners, destination, signatureCount, timelock, datelock) {
  if (!selectedWallet) {
    return null
  }
  let timestamp
  if (datelock !== '') {
    const concatDate = datelock + ' ' + timelock
    const dateLockDate = new Date(concatDate)
    const dateLockTimeZone = dateLockDate.getTimezoneOffset()
    timestamp = moment(dateLockDate).utcOffset(dateLockTimeZone).toString()
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
  if (multiSigTransaction) {
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
              {timestamp}
            </List.Description>
          </List.Content>
        </List.Item>
      ) : (null)}
    </List>
  )
}

export default confirmationModal
