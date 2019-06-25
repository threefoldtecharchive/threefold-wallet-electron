import React from 'react'
import { Modal, Button, Form, Input } from 'semantic-ui-react'
import SearchableAddress from '../common/SearchableAddress'

const closeOnEscape = true

const UpdateModal = ({ openUpdateModal, closeUpdateModal, contactName, handleContactNameChange, contactAddress, handleAddressChange, updateContact }) => (
  <Modal open={openUpdateModal} closeOnEscape={closeOnEscape} onClose={closeUpdateModal} basic size='small'>
    <Modal.Header>Add a contact</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Form>
          <Form.Field>
            <label style={{ color: 'white' }}>Contact Name</label>
            <Input value={contactName} onChange={handleContactNameChange} placeholder='name' />
          </Form.Field>
          <Form.Field>
            <label style={{ color: 'white' }}>Contact address</label>
            <SearchableAddress
              setSearchValue={handleAddressChange}
              icon='user'
              value={contactAddress}
            />
          </Form.Field>
        </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={closeUpdateModal} negative>
        Cancel
      </Button>
      <Button
        onClick={() => updateContact(contactName, contactAddress)}
        positive
        labelPosition='right'
        icon='checkmark'
        content='Yes'
      />
    </Modal.Actions>
  </Modal>
)

export default UpdateModal
