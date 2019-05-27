import React from 'react'
import { Modal, Button, Header, Label, Icon } from 'semantic-ui-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

const closeOnEscape = true

const ShowSeedModal = ({ open, closeModal, seed }) => (
  <Modal open={open} closeOnEscape={closeOnEscape} onClose={closeModal}>
    <Modal.Header>Account Seed</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>{seed}</Header>
        <CopyToClipboard text={seed} onCopy={() => console.log('copied')}>
          <Label onClick={() => toast('Seed copied to clipboard')} style={{ display: 'block', margin: 'auto', width: 200, cursor: 'pointer' }}><Icon name='clipboard' /> copy seed to clipboard</Label>
        </CopyToClipboard>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={closeModal} negative>Close</Button>
    </Modal.Actions>
  </Modal>
)

export default ShowSeedModal
