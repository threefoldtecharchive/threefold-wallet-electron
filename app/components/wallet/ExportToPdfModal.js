import { connect } from 'react-redux'
import { remote } from 'electron'
import React, { Component } from 'react'
import { Button, Icon, Modal, Message, Form } from 'semantic-ui-react'
import ReactPDF from '@react-pdf/renderer'
import PdfTransactionList from './PdfTransactionList'
import { DateTimePicker } from 'react-widgets'
import moment from 'moment-timezone'
import { first, last, groupBy, toArray, isEmpty } from 'lodash'
import { toast } from 'react-toastify'
import { move } from 'fs-extra-p'

const { dialog } = remote

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

    this.state = {
      noTransactions: false,
      disableExportButton: false,
      generatingPdf: false,
      transactions: [],
      mappedTransactions: []
    }
    this._isMounted = false
  }

  mapTransactions = () => {
    const wallet = this.props.account.selected_wallet
    const transactionlist = wallet.balance.transactions

    let currentYear = moment.unix(transactionlist[0].timestamp).year()
    let index = 1

    const tempFilePath = `${remote.app.getPath('temp')}/transactions_${wallet.wallet_name}.pdf`
    const filePath = `${remote.app.getPath('downloads')}/transactions_${wallet.wallet_name}.pdf`

    let beginBalance
    let endBalance
    let previousDate = moment.unix(transactionlist[0].timestamp).format('YYYY/MM/DD')

    const transactions = transactionlist.reverse().map((tx, txIndex) => {
      const year = moment.unix(tx.timestamp).year()
      if (year !== currentYear) {
        currentYear = year
        index = 1
      }

      const currentDate = moment.unix(tx.timestamp).format('YYYY/MM/DD')
      if (currentDate !== previousDate) {
        index++
        previousDate = currentDate
      }

      beginBalance = endBalance

      if (tx.inputs.length > 0) {
        tx.inputs.map((input) => {
          if (txIndex >= 1) {
            endBalance = beginBalance.plus(input.amount)
          } else {
            beginBalance = input.amount.from_str('0')
            endBalance = input.amount
          }
        })
      }

      if (tx.outputs.length > 0) {
        tx.outputs.map(output => {
          endBalance = endBalance.minus(output.amount)
        })
      }

      return Object.assign(tx, { index }, { beginBalance }, { endBalance })
    })

    // Grouping by day
    const groupedTxs = toArray(groupBy(transactions, tx => moment.unix(tx.timestamp).format('YYYY/MM/DD')))
    this.setState({ mappedTransactions: groupedTxs, transactions: groupedTxs, tempFilePath, filePath })
  }

  componentDidMount () {
    this._isMounted = true
    this.mapTransactions()
  }

  componentDidUpdate (prevProps, prevState) {
    const { startDate, endDate } = prevState
    const { startDate: stateStartDate, endDate: stateEndDate } = this.state

    // Typical usage (don't forget to compare props):
    if (stateStartDate || stateEndDate) {
      if (endDate !== stateEndDate || startDate !== stateStartDate) {
        this.checkDateInput(stateStartDate, stateEndDate)
      }
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  handleStartDateChange = (v) => {
    if (v !== null) {
      return this.setState({ startDate: moment(v).unix() })
    }
    const startDate = this.findOldestDate()
    this.setState({ startDate })
  }

  handleEndDateChange = (v) => {
    if (v !== null) {
      return this.setState({ endDate: moment(v).unix() })
    }

    const endDate = this.findLatestDate()
    this.setState({ endDate })
  }

  findOldestDate = () => {
    const wallet = this.props.account.selected_wallet
    const transactions = wallet.balance.transactions
    return last(transactions, { confirmed: true }).timestamp
  }

  findLatestDate = () => {
    const wallet = this.props.account.selected_wallet
    const transactions = wallet.balance.transactions
    return first(transactions, { confirmed: true }).timestamp
  }

  checkDateInput = (startDate, endDate) => {
    let { transactions } = this.state
    if (!startDate) {
      startDate = this.findOldestDate()
    }
    if (!endDate) {
      endDate = this.findLatestDate()
    }

    transactions = transactions.map(tx => {
      return tx.map(t => {
        if (t.confirmed && t.timestamp >= startDate && t.timestamp <= endDate) {
          return t
        }
      }).filter(Boolean)
    })

    transactions = transactions.filter(t => (!isEmpty(t)))

    const amountOfDays = transactions.length

    if (amountOfDays === 0) {
      return this.setState({ noTransactions: true, disableExportButton: true, generatingPdf: false })
    }

    return this.setState({ mappedTransactions: transactions, noTransactions: false, disableExportButton: false })
  }

  handleGeneratePDF = (startDate, endDate) => {
    this.checkDateInput(startDate, endDate)
    const { mappedTransactions } = this.state

    if (this.state.noTransactions) {
      return this.setState({ generatingPdf: false })
    }

    ReactPDF.render(<PdfTransactionList transactions={mappedTransactions} startDate={first(mappedTransactions)[0].timestamp} endDate={last(last(mappedTransactions)).timestamp} account={this.props.account} />, this.state.tempFilePath)
    this.savePdf()
    return this.setState({ noTransactions: false, disableExportButton: false })
  }

  savePdf = () => {
    dialog.showSaveDialog({ title: 'Save transactionlist', defaultPath: this.state.filePath }, (path) => {
      if (path) {
        move(this.state.tempFilePath, path, { overwrite: true })
        toast(`Transactionlist exported to ${path}`)
        this.props.closeExportModal()
      }
      if (this._isMounted) {
        return this.setState({ generatingPdf: false })
      }
    })
  }

  generatePdfFile = () => {
    const { startDate, endDate } = this.state
    this.setState({ generatingPdf: true }, () => {
      this.handleGeneratePDF(startDate, endDate)
    })
  }

  render () {
    const closeOnEscape = true
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
          <Button color='green' inverted onClick={this.generatePdfFile} loading={this.state.generatingPdf} disabled={this.state.disableExportButton} >
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
