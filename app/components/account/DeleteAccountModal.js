import React from 'react'
import { Header, Modal, Button, Form, Message } from 'semantic-ui-react'

const closeOnEscape = true

const DeleteModal = ({ open, closeModal, name, handleDeleteAccountNameChange, deleteNameError, deleteAccount }) => (
  <Modal open={open} closeOnEscape={closeOnEscape} onClose={closeModal}>
    <Modal.Header>Delete this account?</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>If you want to delete this account enter the name of this account and click delete.</Header>
        <Form error style={{ width: '50%', margin: 'auto', marginTop: 60 }} onKeyDown={(e) => onKeyDown(e, deleteAccount)}>
          <Form.Field>
            <label style={{ float: 'left' }}>Name</label>
            <input placeholder='account name here' value={name} onChange={handleDeleteAccountNameChange} />
            {renderDeleteNameError(deleteNameError)}
          </Form.Field>
        </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={closeModal} negative>
              Cancel
      </Button>
      <Button
        onClick={deleteAccount}
        positive
        labelPosition='right'
        icon='checkmark'
        content='Delete'
      />
    </Modal.Actions>
  </Modal>
)

function onKeyDown (e, deleteAccount) {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.stopPropagation()
    deleteAccount()
  }
}

function renderDeleteNameError (err) {
  if (err) {
    return (
      <Message
        error
        header='Name does not equal your account name'
      />
    )
  }
}

export default DeleteModal
