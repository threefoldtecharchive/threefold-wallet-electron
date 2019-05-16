import React from 'react'
import { Header, Modal, Button, Form, Message } from 'semantic-ui-react'

const closeOnEscape = true

const SeedModal = ({ open, closeModal, seedConfirmation, handleSeedWordsChange, seedError, createAccount }) => (
  <Modal open={open} closeOnEscape={closeOnEscape} onClose={closeModal}>
    <Modal.Header>Create account</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Enter 3 random words from your generated seed</Header>
        <Form error style={{ width: '50%', margin: 'auto', marginTop: 60 }}>
          <Form.Field>
            <label style={{ float: 'left' }}>Words</label>
            <input placeholder='provide 3 random words here' value={seedConfirmation} onChange={handleSeedWordsChange} />
            {renderDeleteNameError(seedError)}
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

export default SeedModal
