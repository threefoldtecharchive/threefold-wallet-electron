import { connect } from 'react-redux'
import React, { Component } from 'react'
import { debounce, escapeRegExp, filter, flatten } from 'lodash'
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
      value: '' || this.props.value
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

    const re = new RegExp(escapeRegExp(value), 'i')

    // enable searching on name or address
    const isMatch = result => (re.test(result.wallet_name) || re.test(result.value) || re.test(result.title) || re.test(result.contact_name))
    const results = filter(this.state.source, isMatch)

    this.props.setSearchValue(value)
    // If no results, this means the user copied or typed an address that he does not know yet.
    // Pass this address
    if (results.length === 0) {
      return this.setState({ results, showNoResults: false, value })
    }

    // If results are found, show a dropdown list with possible selection
    this.setState({
      results
    })
  }

  handleOnFocus = (e) => {
    const { source } = this.state
    const { value, currentLocation, account } = this.props

    if (value) {
      return this.filterSearchInput(value)
    }

    let result

    if (currentLocation !== routes.ADDRESS_BOOK) {
      result = source.filter(w => w.value !== this.props.form.transactionForm.values.selectedWallet.address)
    } else {
      result = source.filter(w => !account.addresses.includes(w.value))
    }

    this.setState({
      showNoResults: false, results: result
    })
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
          minCharacters={0}
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
