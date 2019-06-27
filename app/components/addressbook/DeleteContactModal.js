import React from 'react'
import { Modal, Button } from 'semantic-ui-react'

const closeOnEscape = true

const DeleteModal = ({ openDeleteModal, closeModal, contactName, contactAddress, deleteContact }) => (
  <Modal open={openDeleteModal} closeOnEscape={closeOnEscape} onClose={closeModal} basic size='small'>
    <Modal.Header>Delete this contact?</Modal.Header>
    <Modal.Content image>
      {contactAddress instanceof Array ? (
        <Modal.Description>
          Name: {contactName}
          {contactAddress[1].map(address => {
            return (<p style={{ fontSize: 16 }}>{address}</p>)
          })}
        </Modal.Description>
      ) : (
        <Modal.Description>
          {contactName} : {contactAddress}
        </Modal.Description>
      )}
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={closeModal} negative>
        No
      </Button>
      <Button
        onClick={deleteContact}
        positive
        labelPosition='right'
        icon='checkmark'
        content='Yes'
      />
    </Modal.Actions>
  </Modal>
)

export default DeleteModal
