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

  if (!multiSigTransaction) {
    return (
      <List style={{ color: 'black' }}>
        <List.Item>
          <Icon name='right triangle' />
          <List.Content>
            <List.Header>From</List.Header>
            <List.Description>
              {selectedWallet.wallet_name || selectedWallet.address}
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
        <List.Item>
          <Icon name='right triangle' />
          <List.Content>
            <List.Header>To: </List.Header>
            <List.Description>
              {destination}
            </List.Description>
          </List.Content>
        </List.Item>
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
  } else {
    return (
      <List style={{ color: 'black' }}>
        <List.Item>
          <Icon name='right triangle' />
          <List.Content>
            <List.Header>From</List.Header>
            <List.Description>
              {selectedWallet.wallet_name || selectedWallet.address}
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
        <List.Item>
          <Icon name='right triangle' />
          <List.Content>
            <List.Header>To: </List.Header>
            {owners.map((owner, index) => {
              return (
                <List.Description key={owner + ' ' + index}>
                  {index + 1}: {owner}
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
}

export default confirmationModal
