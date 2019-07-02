import { connect } from 'react-redux'
import { remote } from 'electron'
import React, { Component } from 'react'
import { Button, Icon, Modal, Message, Form } from 'semantic-ui-react'
import ReactPDF from '@react-pdf/renderer'
import PdfTransactionList from './PdfTransactionList'
import { DateTimePicker } from 'react-widgets'
import moment from 'moment-timezone'

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

class ExportToPDF extends Component {
  constructor (props) {
    super(props)
    const wallet = this.props.account.selected_wallet
    const transactions = wallet.balance.transactions

    this.state = {
      noTransactions: false,
      disableExportButton: false,
      startDate: transactions[transactions.length - 1].timestamp,
      endDate: transactions[0].timestamp,
      filePath: `${remote.app.getPath('userData')}/transactions_${wallet.wallet_name}.pdf`
    }
  }

  componentWillMount () {
    if (this.props.openExportModal) {
      const wallet = this.props.account.selected_wallet
      console.log(this.state.filePath)
      ReactPDF.render(<PdfTransactionList transactions={wallet.balance.transactions} />, this.state.filePath)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const { startDate, endDate } = prevState
    const { startDate: stateStartDate, endDate: stateEndDate } = this.state

    // Typical usage (don't forget to compare props):
    if (stateStartDate || stateEndDate) {
      if (endDate !== stateEndDate || startDate !== stateStartDate) {
        this.handleGeneratePDF(stateStartDate, stateEndDate)
      }
    }
  }

  handleStartDateChange = (v) => {
    const wallet = this.props.account.selected_wallet
    const transactions = wallet.balance.transactions
    const startDate = v !== null ? moment(v).unix() : transactions[transactions.length - 1].timestamp
    this.setState({ startDate })
  }

  handleEndDateChange = (v) => {
    const wallet = this.props.account.selected_wallet
    const transactions = wallet.balance.transactions
    const endDate = v !== null ? moment(v).unix() : transactions[0].timestamp
    this.setState({ endDate })
  }

  handleGeneratePDF = (startDate, endDate) => {
    const wallet = this.props.account.selected_wallet
    let transactions = wallet.balance.transactions

    transactions = transactions.map(tx => {
      if (tx.timestamp >= startDate && tx.timestamp <= endDate) {
        return tx
      }
    }).filter(Boolean)

    if (transactions.length === 0) {
      return this.setState({ noTransactions: true, disableExportButton: true })
    }
    ReactPDF.render(<PdfTransactionList transactions={transactions} />, this.state.filePath)
    this.setState({ noTransactions: false, disableExportButton: false })
  }

  render () {
    const closeOnEscape = true
    const filePath = this.state.filePath
    const { openExportModal, closeExportModal } = this.props
    return (
      <Modal open={openExportModal} closeOnEscape={closeOnEscape} onClose={closeExportModal} basic size='small'>
        <Modal.Header>Export Transactions to PDF</Modal.Header>
        <Modal.Content>
          You can choose a date range for exporting transactions, if no range is chosen then all transactions will be exported.
          <Form>
            <Form.Field>
              <label style={{ color: 'white' }}>Choose a start date (optional)</label>
              <DateTimePicker onChange={(value) => this.handleStartDateChange(value)} />
            </Form.Field>
            <Form.Field>
              <label style={{ color: 'white' }}>Choose an end date (optional)</label>
              <DateTimePicker onChange={value => this.handleEndDateChange(value)} />
            </Form.Field>
            {this.state.noTransactions ? (
              <Message negative>
                No Transaction found! Please pick other dates
              </Message>
            ) : (null)}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={closeExportModal}>
            <Icon name='remove' /> Cancel
          </Button>
          <Button color='green' inverted href={filePath} onClick={this.props.closeExportModal} disabled={this.state.disableExportButton} >
            <Icon name='checkmark' /> Export
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(ExportToPDF)
