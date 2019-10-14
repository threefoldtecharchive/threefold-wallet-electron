// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Segment, Icon, Divider, Button, Message } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import BalanceGrid from './BalanceGrid'
import TransactionsList from './TransactionList'
import { saveAccount, updateAccount } from '../../actions'
import UpdateContactModal from '../addressbook/UpdateContactModal'
import UpdateMultiSigContactModal from '../addressbook/UpdateMultiSigContactModal'
import { find, filter } from 'lodash'
import ExportToPdfModal from './ExportToPdfModal'
import { toast } from 'react-toastify'

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
      signatureCount: 2,
      hasConfirmedTx: false,
      showError: true,
      authorized: filter(this.props.account.coin_auth_status_for_wallet_get({ name: this.props.account.selected_wallet.wallet_name }), x => x === false).length === 0,
      addressesRequireAuth: this.props.account.chain_type === 'goldchain' || this.props.account.chain_type === 'eurochain'
    }
  }

  componentDidMount () {
    const wallet = this.props.account.selected_wallet
    const transactions = wallet.balance.transactions

    const hasConfirmedTx = find(transactions, { confirmed: true })
    this.setState({ hasConfirmedTx })
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
    const routeToReceive = () => this.props.history.push(routes.WALLET_RECEIVE)
    const routeToTransfer = () => this.props.history.push(routes.TRANSFER)
    const routeToSign = () => this.props.history.push(routes.SIGN_TRANSACTIONS)
    const walletBalance = this.props.account.selected_wallet.balance

    return (
      <BalanceGrid
        loader={this.state.loader}
        walletBalance={walletBalance}
        routeToReceive={routeToReceive}
        routeToTransfer={routeToTransfer}
        routeToSign={routeToSign}
      />
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

  handleContactNameChange = ({ target }) => {
    this.setState({ contactName: target.value })
  }

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

  renderThumb ({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: '#8a8a92'
    }
    return (
      <div
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    )
  }

  dismissError = () => {
    this.setState({ showError: false })
  }

  render () {
    const { contactName, contactAddress, openAddModal, ownerAddresses, signatureCount, openAddMultisigModal, openExportModal, hasConfirmedTx, addressesRequireAuth, authorized } = this.state

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
    const { chain_info: chainConstants, selected_wallet: selectedWallet } = account
    const { transactions } = selectedWallet.balance

    let authorizedText = (
      <p style={{ position: 'fixed', right: '4%' }} className={[styles.pageHeaderAuthorized]}>Unauthorized</p>
    )
    if (authorized) {
      authorizedText = (<p style={{ position: 'fixed', right: '4%' }} className={[styles.pageHeaderAuthorized]}>Authorized</p>)
    }

    return (
      <div>
        {openExportModal && <ExportToPdfModal
          openExportModal={openExportModal}
          closeExportModal={this.changeStateExportModel}
        />}
        <div className={styles.pageHeader}>
          <div style={{ display: 'flex' }}>
            <p className={styles.pageHeaderTitle}>Wallet {selectedWallet.wallet_name}</p>
            {addressesRequireAuth ? (
              authorizedText
            ) : (null)}
          </div>
          <p className={styles.pageHeaderSubtitle}>Wallet balance and transactions</p>
        </div>
        <Divider className={styles.pageDivider} />
        <div>
          <div className={styles.pageGoBack}>
            <Icon onClick={() => this.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 5, cursor: 'pointer', zIndex: 5 }} name='chevron circle left' />
            <span onClick={() => this.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
          </div>
          {!this.state.authorized && this.state.showError && addressesRequireAuth && <Message style={{ width: '90%', margin: 'auto', marginTop: 10, marginBottom: 10 }} error onDismiss={this.dismissError}>
            <Message.Header>Not all addresses are authorized</Message.Header>
            <p style={{ fontSize: 13, cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => this.props.history.push('/walletreceive')}>Show me Unauthorized addresses</p>
          </Message>}
          <div style={{ paddingBottom: 20, marginTop: 10 }}>
            {this.renderWalletBalanceGrid()}
            <Segment style={{ width: '90%', height: '45vh', overflow: 'auto', overflowY: 'scroll', margin: 'auto', background: '#29272E', marginTop: 20 }}>
              {(hasConfirmedTx && <Button size='tiny' style={{ float: 'right' }} className={styles.tinyAcceptButton} onClick={() => this.changeStateExportModel()}>Export to PDF</Button>)}
              <TransactionsList account={this.props.account} loader={this.state.loader} transactions={transactions} chainInfo={chainConstants} addContact={this.openAddModal} />
            </Segment>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet)
