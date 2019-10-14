import React, { Component } from 'react'
import { Header, Modal, Button, List, Icon } from 'semantic-ui-react'
import moment from 'moment-timezone'
const closeOnEscape = true

class ConfirmationModal extends Component {
  render () {
    const { open, closeModal, confirmTransaction } = this.props
    return (
      <Modal open={open} closeOnEscape={closeOnEscape} onClose={closeModal}>
        <Modal.Header>Confirm transaction</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Do you wish to confirm this transaction?</Header>
            {this.renderModalBody()}
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

  renderModalBody = () => {
    const {
      transactionType,
      selectedWallet,
      amount,
      owners,
      destination,
      signatureCount,
      selectedWalletRecipient,
      selectedRecipientAddress,
      minimumMinerFee,
      message,
      structured,
      messageType
    } = this.props

    let { timestamp } = this.props

    if (!selectedWallet) {
      return null
    }

    let tz
    if (timestamp) {
      timestamp = moment(timestamp).format('MMMM Do YYYY, HH:mm')
      tz = moment.tz.guess()
    }

    let custodyFeeToPay
    custodyFeeToPay = selectedWallet.custody_fees_to_pay_for(minimumMinerFee.plus(amount))
    if (custodyFeeToPay.equal_to(0)) {
      custodyFeeToPay = null
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
              {minimumMinerFee.plus(amount).str({ unit: true })} (* including minerfee: {minimumMinerFee.str({ unit: true })})
            </List.Description>
          </List.Content>
        </List.Item>
        {custodyFeeToPay ? (
          <List.Item>
            <Icon name='right triangle' />
            <List.Content>
              <List.Header>Estimated custody fee to pay: </List.Header>
              <List.Description>
                {custodyFeeToPay.str({ unit: true })}
              </List.Description>
            </List.Content>
          </List.Item>
        ) : null}
        {message && messageType !== 'structured' ? (
          <List.Item>
            <Icon name='right triangle' />
            <List.Content>
              <List.Header>Message: </List.Header>
              <List.Description>
                {message}
              </List.Description>
            </List.Content>
          </List.Item>
        ) : null}
        {messageType === 'structured' && structured && structured[0] && structured[1] && structured[2] ? (
          <List.Item>
            <Icon name='right triangle' />
            <List.Content>
              <List.Header>Message: </List.Header>
              <List.Description>
                {'+++' + structured.join('/') + '+++'}
              </List.Description>
            </List.Content>
          </List.Item>
        ) : null}
        {transactionType !== 'BURN' ? recipients : null}
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
}

export default ConfirmationModal
