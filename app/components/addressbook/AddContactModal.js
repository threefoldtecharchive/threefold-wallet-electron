import React from 'react'
import { Modal, Button, Form, Input } from 'semantic-ui-react'
import SearchableAddress from '../common/SearchableAddress'

const closeOnEscape = true

const AddModal = ({ openAddModal, closeAddModal, contactName, handleContactNameChange, contactAddress, handleAddressChange, addContact }) => (
  <Modal open={openAddModal} closeOnEscape={closeOnEscape} onClose={closeAddModal} basic size='small'>
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
            />
          </Form.Field>
        </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={closeAddModal} negative>
        Cancel
      </Button>
      <Button
        onClick={addContact}
        positive
        labelPosition='right'
        icon='checkmark'
        content='Create'
      />
    </Modal.Actions>
  </Modal>
)

export default AddModal
