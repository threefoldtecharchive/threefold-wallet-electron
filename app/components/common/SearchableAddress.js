import { connect } from 'react-redux'
import React, { Component } from 'react'
import { debounce, flatten, escapeRegExp, filter } from 'lodash'
import { Search, Message, Icon } from 'semantic-ui-react'
import * as tfchain from '../../tfchain/api'
import routes from '../../constants/routes.json'

const initialState = { results: [], addressError: false, showNoResults: true }

const mapStateToProps = state => ({
  currentLocation: state.router.location.pathname,
  account: state.account.state,
  form: state.form
})

class SearchableAddress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...initialState,
      value: '' || this.props.value,
      multiSig: this.props.multiSig
    }
  }

  componentWillMount () {
    const sources = this.props.sources || {}
    let wallets = []
    let contacts = []
    if (sources.wallets !== false) {
      wallets = flatten(this.props.account.wallets.map(wallet => {
        return wallet.addresses.map(a => {
          return {
            wallet_name: wallet.wallet_name,
            title: `wallet: ${wallet.wallet_name} - ${a}`,
            value: a
          }
        })
      }))
    }

    if (sources.contacts !== false) {
      contacts = flatten(this.props.account.address_book.contacts.map(contact => {
        if (contact.recipient instanceof Array) return null
        const name = contact.contact_name
        return {
          contact_name: name,
          title: `contact: ${name}`,
          value: contact.recipient
        }
      }))
    }

    const source = wallets.concat(contacts.filter(Boolean))
    this.setState({ source })
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.value, addressError: false })
    this.props.setSearchValue(result.value)
  }

  handleSearchChange = (e, { value }) => {
    this.filterSearchInput(value)
  }

  filterSearchInput = (value) => {
    this.setState({ addressError: !tfchain.wallet_address_is_valid(value) })
    this.props.setSearchValue(value)
    this.searchResults(value)
  }

  searchResults = (value) => {
    const { currentLocation, account } = this.props
    const { source, multiSig } = this.state
    let results

    console.log(this.state.multiSig)

    const re = new RegExp(escapeRegExp(value), 'i')

    // enable searching on name or address
    const isMatch = result => (re.test(result.wallet_name) || re.test(result.value) || re.test(result.title) || re.test(result.contact_name))
    results = filter(this.state.source, isMatch)

    if (currentLocation !== routes.ADDRESS_BOOK) {
      results = results.filter(w => w.value !== this.props.form.transactionForm.values.selectedWallet.address)
    } else if (multiSig) {
      results = source
    } else {
      results = results.filter(w => !account.addresses.includes(w.value))
    }

    console.log(results)

    // If no results, this means the user copied or typed an address that he does not know yet.
    // Pass this address
    if (results.length === 0) {
      return this.setState({ results, showNoResults: true, value })
    }

    // If results are found, show a dropdown list with possible selection
    this.setState({
      results, value
    })
  }

  handleOnFocus = (e) => {
    const { value } = this.props

    if (value) {
      return this.filterSearchInput(value)
    }

    this.searchResults(value)
  }

  handleOnBlur = () => {
    this.setState({
      showNoResults: true, results: []
    })
  }

  render () {
    const { results, addressError, showNoResults } = this.state
    return (
      <div>
        <Search
          style={this.props.style}
          onResultSelect={this.handleResultSelect}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          onSearchChange={debounce(this.handleSearchChange, 100, {
            leading: true
          })}
          results={results}
          value={this.props.value}
          placeholder='address'
          showNoResults={showNoResults}
          minCharacters={3}
          icon={<Icon name={this.props.icon} position='left' style={{ color: '#0e72f5' }} />}
        />
        {addressError ? (
          <Message
            error
            header={'Address is not a valid format'}
          />
        ) : null}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(SearchableAddress)
