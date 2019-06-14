import React from 'react'
import { Header, Modal, Button, Form, Message } from 'semantic-ui-react'

const closeOnEscape = true

const DeleteModal = ({ open, closeModal, name, handleDeleteWalletNameChange, deleteNameError, deleteWalletNameErrorMessage, deleteWallet }) => (
  <Modal open={open} closeOnEscape={closeOnEscape} onClose={closeModal}>
    <Modal.Header>Delete this wallet?</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>If you want to delete this wallet enter the name of this wallet and click delete.</Header>
        <Form error style={{ width: '50%', margin: 'auto', marginTop: 60 }}>
          <Form.Field>
            <label style={{ float: 'left' }}>Name</label>
            <input placeholder='wallet name here' value={name} onChange={handleDeleteWalletNameChange} />
            {renderDeleteNameError(deleteNameError, deleteWalletNameErrorMessage)}
          </Form.Field>
        </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={closeModal} negative>
              No
      </Button>
      <Button
        onClick={deleteWallet}
        positive
        labelPosition='right'
        icon='checkmark'
        content='Yes'
      />
    </Modal.Actions>
  </Modal>
)

function renderDeleteNameError (err, message) {
  if (err) {
    if (message) {
      return (
        <Message
          error
          header={message}
        />
      )
    }
    return (
      <Message
        error
        header='Name does not equal your wallet name'
      />
    )
  }
}

export default DeleteModal
