import React from 'react'
import { Modal, Button, Form, Input, Icon, Message } from 'semantic-ui-react'
import SearchableAddress from '../common/SearchableAddress'

const closeOnEscape = true

const AddModal = ({ openUpdateMultisigModal, closeUpdateMultisigModal, contactName, handleContactNameChange, ownerAddresses, handleAddressOwnerChange, removeOwnerAddress, updateMultiSigContact, addOwnerAddress, signatureCount, handleSignatureCountChange, signatureCountError, editAddressess }) => (
  <Modal open={openUpdateMultisigModal} closeOnEscape={closeOnEscape} onClose={closeUpdateMultisigModal} basic size='small'>
    <Modal.Header>Add a contact</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Form style={{ width: '100%', margin: 'auto', marginTop: 10 }}>
          <Form.Field>
            <label style={{ color: 'white' }}>Contact Name</label>
            <Input value={contactName} onChange={handleContactNameChange} placeholder='name' />
          </Form.Field>
          <Form.Field>
            {renderOwnerInputFields(ownerAddresses, handleAddressOwnerChange, removeOwnerAddress, editAddressess)}
            <Icon name='plus circle' style={{ fontSize: 30, marginTop: 20, cursor: 'pointer' }} onClick={() => addOwnerAddress()} />
          </Form.Field>
          <Form.Field>
            <label style={{ color: 'white' }}>Signature count</label>
            <Input type='number' value={signatureCount} onChange={handleSignatureCountChange} placeholder='signature count' disabled={!editAddressess} />
            {renderSignatureCountError(signatureCountError)}
          </Form.Field>
        </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={closeUpdateMultisigModal} negative>
        Cancel
      </Button>
      <Button
        onClick={updateMultiSigContact}
        positive
        labelPosition='right'
        icon='checkmark'
        content='Yes'
      />
    </Modal.Actions>
  </Modal>
)

function renderOwnerInputFields (ownerAddresses, handleAddressOwnerChange, removeOwnerAddress, editAddressess) {
  return ownerAddresses.map((owner, index) => {
    return (
      <div key={index} >
        <Form.Field style={{ marginTop: 20 }}>
          <SearchableAddress
            setSearchValue={(v) => handleAddressOwnerChange(v, index)}
            icon='user'
            value={ownerAddresses[index]}
            disabled={editAddressess}
          />
          {ownerAddresses.length > 2
            ? (<Icon name='trash' onClick={() => removeOwnerAddress(index)} style={{ fontSize: 20, position: 'relative', float: 'right', top: -30, right: -30, marginLeft: 20, cursor: 'pointer' }} />)
            : (null)}
        </Form.Field>
      </div>
    )
  })
}

function renderSignatureCountError (signatureCountError) {
  if (signatureCountError) {
    return (
      <Message negative>
        <p style={{ fontSize: 12 }}>Signature count must be less than or equal to the number of owners.</p>
      </Message>
    )
  }
}

export default AddModal
