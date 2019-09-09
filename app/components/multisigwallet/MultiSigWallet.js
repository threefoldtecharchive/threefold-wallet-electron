// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Segment, Icon, Divider, List, Dimmer, Loader, Button } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import BalanceGrid from '../wallet/BalanceGrid'
import TransactionsList from '../wallet/TransactionList'
import { truncate, find } from 'lodash'
import { saveAccount, updateAccount } from '../../actions'
import UpdateContactModal from '../addressbook/UpdateContactModal'
import UpdateMultiSigContactModal from '../addressbook/UpdateMultiSigContactModal'
import { toast } from 'react-toastify'
import ExportToPdfModal from '../wallet/ExportToPdfModal'
import { shell } from 'electron'

const mapStateToProps = state => {
  if (!state.account.state) {
    return {
      routerLocations: state.routerLocations,
      account: null,
      is_loaded: false,
      walletLoadedCount: 0,
      walletCount: 0,
      intermezzoUpdateCount: 0
    }
  }
  return {
    routerLocations: state.routerLocations,
    account: state.account.state,
    is_loaded: state.account.state.is_loaded,
    walletLoadedCount: state.account.walletLoadedCount,
    walletCount: state.account.walletCount,
    intermezzoUpdateCount: state.account.intermezzoUpdateCount
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveAccount: (account) => {
    dispatch(saveAccount(account))
  },
  updateAccount: (account) => {
    dispatch(updateAccount(account))
  }
})

class Wallet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactions: [],
      intervalId: undefined,
      loader: false,
      contactName: '',
      contactAddress: '',
      openAddModal: false,
      ownerAddresses: ['', ''],
      signatureCount: 2
    }
  }

  // implement goBack ourselfs, if a user has made a transaction and he presses go back then he should route to account
  // instead of going back to transfer (default behaviour of react router 'goBack' function)
  goBack = () => {
    const { routerLocations } = this.props
    const previousLocation = routerLocations[routerLocations.length - 1]
    switch (previousLocation) {
      case '/transfer':
        return this.props.history.push(routes.ACCOUNT)
      default:
        return this.props.history.push(routes.ACCOUNT)
    }
  }

  renderWalletBalanceGrid = () => {
    // TODO: activate again once a decent MultiSig wallet receive page is made.
    // const routeToReceive = () => this.props.history.push(routes.WALLET_MULTI_RECEIVE)
    const routeToTransfer = () => this.props.history.push(routes.TRANSFER)
    const routeToSign = () => this.props.history.push(routes.SIGN_TRANSACTIONS)
    const walletBalance = this.props.account.selected_wallet

    return (
      <BalanceGrid
        loader={this.state.loader}
        walletBalance={walletBalance.balance}
        routeToReceive={null} // routeToReceive}
        routeToTransfer={routeToTransfer}
        routeToSign={routeToSign}
      />
    )
  }

  renderOwnerList = () => {
    const wallet = this.props.account.selected_wallet
    const { owners, address } = wallet
    if (owners.length === 0 || !owners) {
      return null
    }
    const ownerList = owners.map((owner, index) => {
      return (
        <List.Description key={owner + ` ${index}`}>
          <p style={{ color: 'white', fontSize: 14 }}><span style={{ color: 'white', fontSize: 12, fontFamily: 'Menlo-Regular' }}>{index + 1}</span>: {_addressDisplayElement(owner, this.props.account)}</p>
        </List.Description>
      )
    })
    return (
      <div>
        <div style={{ marginLeft: 20, overflow: 'auto', color: 'white' }}>
          <div style={{ marginBottom: 10 }}>
            <p style={{ fontSize: 18 }}>MultiSig Address <span style={{ fontSize: 12 }}>({wallet.signatures_required > 1 ? 'Signatures ' : 'Signature '} required: {wallet.signatures_required})</span></p>
          </div>
          <div>
            <p style={{ color: 'white', fontSize: 14 }}>{_addressDisplayElement(address, this.props.account)}</p>
          </div>
        </div>

        <List style={{ marginLeft: 20, overflow: 'auto', color: 'white' }} divided relaxed>
          <List.Header style={{ marginBottom: 10 }}>
            Owners
          </List.Header>
          {ownerList}
        </List>
      </div>
    )
  }

  openAddModal = (contactAddress) => {
    if (contactAddress instanceof Array) {
      const [signatureCount, ownerAddresses] = contactAddress
      const open = !this.state.openAddMultisigModal
      return this.setState({ openAddMultisigModal: open, contactName: '', ownerAddresses, signatureCount })
    }
    const open = !this.state.openAddModal
    this.setState({ openAddModal: open, contactAddress, contactName: '' })
  }

  closeAddModal = () => {
    this.setState({ openAddModal: false })
  }

  addContact = () => {
    const { contactAddress, contactName } = this.state
    const { account } = this.props
    const { address_book: addressBook } = account
    try {
      addressBook.contact_new(contactName, contactAddress)
      this.setState({ openAddModal: false })
      toast.success('Added contact')
      this.props.saveAccount(account)
    } catch (error) {
      console.log(error)
      this.setState({ openAddModal: false })
      toast.error('Adding contact failed')
    }
  }

  handleAddressChange = (value) => {
    this.setState({ contactAddress: value })
  }

  handleContactNameChange = ({ target }) => (
    this.setState({ contactName: target.value })
  )

  closeAddMultisigModal = () => {
    this.setState({ openAddMultisigModal: false })
  }

  addMultiSigContact = () => {
    const { contactName, ownerAddresses, signatureCount } = this.state
    const { account } = this.props
    const { address_book: addressBook } = account
    try {
      addressBook.contact_new(contactName, [ownerAddresses, signatureCount])
      this.setState({ openAddMultisigModal: false })
      toast.success('Added multisig contact')
      this.props.saveAccount(account)
    } catch (error) {
      this.setState({ openAddMultisigModal: false })
      toast.error('Adding multisig contact failed')
    }
  }

  changeStateExportModel = () => {
    this.setState({ openExportModal: !this.state.openExportModal })
  }

  render () {
    const { contactName, contactAddress, openAddModal, ownerAddresses, signatureCount, openAddMultisigModal, openExportModal } = this.state

    if (this.state.openAddModal) {
      return (
        <UpdateContactModal
          contactName={contactName}
          handleContactNameChange={this.handleContactNameChange}
          contactAddress={contactAddress}
          handleAddressChange={this.handleAddressChange}
          openUpdateModal={openAddModal}
          closeUpdateModal={this.closeAddModal}
          updateContact={this.addContact}
        />
      )
    }

    if (this.state.openAddMultisigModal) {
      return (
        <UpdateMultiSigContactModal
          editAddressess={false}
          contactName={contactName}
          handleContactNameChange={this.handleContactNameChange}
          ownerAddresses={ownerAddresses}
          openUpdateMultisigModal={openAddMultisigModal}
          closeUpdateMultisigModal={this.closeAddMultisigModal}
          updateMultiSigContact={this.addMultiSigContact}
          signatureCount={signatureCount}
        />
      )
    }

    const { account } = this.props
    const { chain_info: chainConstants } = account

    const wallet = this.props.account.selected_wallet
    const active = true
    const transactions = wallet.balance.transactions
    const hasConfirmedTx = find(transactions, { confirmed: true })

    return (
      <div>
        {openExportModal && <ExportToPdfModal
          openExportModal={openExportModal}
          closeExportModal={this.changeStateExportModel}
        />}
        <UpdateContactModal
          contactName={contactName}
          handleContactNameChange={this.handleContactNameChange}
          contactAddress={contactAddress}
          handleAddressChange={this.handleAddressChange}
          openUpdateModal={openAddModal}
          closeUpdateModal={this.closeAddModal}
          updateContact={this.addContact}
        />
        <UpdateMultiSigContactModal
          editAddressess={false}
          contactName={contactName}
          handleContactNameChange={this.handleContactNameChange}
          ownerAddresses={ownerAddresses}
          openUpdateMultisigModal={openAddMultisigModal}
          closeUpdateMultisigModal={this.closeAddMultisigModal}
          updateMultiSigContact={this.addMultiSigContact}
          signatureCount={signatureCount}
        />
        {!wallet ? (
          <Dimmer >
            <Loader active={active} content='Loading wallet transaction' />
          </Dimmer>
        )
          : (
            <div>
              <div className={styles.pageHeader}>
                <p className={styles.pageHeaderTitle}>Wallet {wallet.wallet_name || truncate(wallet.address, { length: 14 })}</p>
                <p className={styles.pageHeaderSubtitle}>Multisig balance and transactions</p>
              </div>
              <Divider className={styles.pageDivider} />
              <div>
                <div className={styles.pageGoBack}>
                  <Icon onClick={() => this.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 5, cursor: 'pointer', zIndex: 5 }} name='chevron circle left' />
                  <span onClick={() => this.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
                </div>
                <div style={{ paddingBottom: 20, marginTop: 10 }}>
                  {this.renderWalletBalanceGrid()}
                  <Segment style={{ width: '90%', height: '100%', overflow: 'auto', overflowY: 'scroll', margin: 'auto', background: '#29272E', marginTop: 20 }}>
                    {this.renderOwnerList()}
                  </Segment>
                  <Segment style={{ width: '90%', height: '40vh', overflow: 'auto', overflowY: 'scroll', margin: 'auto', background: '#29272E', marginTop: 20 }}>
                    {hasConfirmedTx && <Button size='tiny' style={{ float: 'right' }} className={styles.tinyAcceptButton} onClick={() => this.changeStateExportModel()}>Export to PDF</Button>}
                    <TransactionsList account={this.props.account} loader={this.state.loader} transactions={wallet.balance.transactions} chainInfo={chainConstants} addContact={this.openAddModal} />
                  </Segment>
                </div>
              </div>
            </div>
          )}
      </div>
    )
  }
}

// NOTE: should we also link to wallet (when we have wallet name)??!?!
function _addressDisplayElement (address, account) {
  const chainInfo = account.chain_info

  const { address_book: addressBook } = account
  const { contacts } = addressBook

  const wallet = account.wallet_for_address(address)
  if (wallet && wallet.wallet_name) {
    return <span><span style={{ color: 'white', fontSize: 12, fontFamily: 'Menlo-Regular' }}>{address}</span><Icon style={{ cursor: 'pointer', marginLeft: 5 }} name='external alternate' onClick={() => shell.openExternal(`${chainInfo.explorer_address}/hash.html?hash=${address}`)} /> (wallet {`${wallet.wallet_name}`})</span>
  }

  // Filter out multisig contacts
  const singleContacts = contacts.filter(contact => !(contact.recipient instanceof Array))
  // Check if address to display is a contact from addressboek
  const contact = find(singleContacts, contact => contact.recipient === address)
  if (contact) {
    return <span><span style={{ color: 'white', fontSize: 12, fontFamily: 'Menlo-Regular' }}>{address}</span><Icon style={{ cursor: 'pointer', marginLeft: 5 }} name='external alternate' onClick={() => shell.openExternal(`${chainInfo.explorer_address}/hash.html?hash=${address}`)} /> (contact {`${contact.contact_name}`})</span>
  }

  return <span><span style={{ color: 'white', fontSize: 12, fontFamily: 'Menlo-Regular' }}>{address}</span><Icon style={{ cursor: 'pointer', marginLeft: 5 }} name='external alternate' onClick={() => shell.openExternal(`${chainInfo.explorer_address}/hash.html?hash=${address}`)} /></span>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet)
