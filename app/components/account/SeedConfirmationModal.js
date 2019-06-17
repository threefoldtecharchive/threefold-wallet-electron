import React from 'react'
import { Header, Modal, Button, Form, Message } from 'semantic-ui-react'

const closeOnEscape = true

const SeedModal = ({ open, closeModal, seedConfirmation, handleSeedWordsChange, seedError, createAccount, accountCreationError, accountCreationErrorMessage }) => (
  <Modal open={open} closeOnEscape={closeOnEscape} onClose={closeModal}>
    <Modal.Header>Create account</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Enter 3 random words from your generated seed</Header>
        <Form error style={{ width: '50%', margin: 'auto', marginTop: 60 }} onKeyDown={(e) => onKeyDown(e, createAccount)}>
          <Form.Field>
            <label style={{ float: 'left' }}>Words</label>
            <input placeholder='provide 3 random words here' value={seedConfirmation} onChange={handleSeedWordsChange} />
            {renderDeleteNameError(seedError)}
            {renderAccountCreationError(accountCreationError, accountCreationErrorMessage)}
          </Form.Field>
        </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={closeModal} negative>
              Cancel
      </Button>
      <Button
        onClick={createAccount}
        positive
        labelPosition='right'
        icon='checkmark'
        content='Create'
      />
    </Modal.Actions>
  </Modal>
)

function onKeyDown (e, createAccount) {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.stopPropagation()
    createAccount()
  }
}

function renderDeleteNameError (err) {
  if (err) {
    return (
      <Message
        error
        header='Seed words are not correct'
      />
    )
  }
}

function renderAccountCreationError (accountCreationError, accountCreationErrorMessage) {
  if (accountCreationError) {
    if (accountCreationErrorMessage !== '') {
      return (
        <Message negative>
          <Message.Header>Error occured</Message.Header>
          {accountCreationErrorMessage.__args__.length > 1 ? accountCreationErrorMessage.__args__.map(arg => <p style={{ fontSize: 12 }}>{arg}</p>) : <p style={{ fontSize: 12 }}>{accountCreationErrorMessage}</p>}
        </Message>
      )
    } else {
      return (
        <Message negative>
          <Message.Header>Error occured</Message.Header>
          <p style={{ fontSize: 12 }}>Some error occured, press cancel and try other values.</p>
        </Message>
      )
    }
  }
}

export default SeedModal
