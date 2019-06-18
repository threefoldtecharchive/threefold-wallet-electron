import { connect } from 'react-redux'
import React, { Component } from 'react'
import { debounce, escapeRegExp, filter } from 'lodash'
import { Search, Message, Icon } from 'semantic-ui-react'
import * as tfchain from '../../tfchain/api'

const initialState = { isLoading: false, results: [], value: '', addressError: false, showNoResults: true }

const mapStateToProps = state => ({
  account: state.account.state
})

class SearchableAddress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...initialState
    }
  }

  componentWillMount () {
    let wallets = this.props.account.wallets.map(w => {
      return {
        wallet_name: w.wallet_name,
        title: `wallet: ${w.wallet_name} - ${w.address}`,
        value: w.address
      }
    })

    let msWallets = this.props.account.multisig_wallets.map(w => {
      return {
        wallet_name: w.wallet_name,
        title: `multisig wallet: ${w.wallet_name} - ${w.address}`,
        value: w.address
      }
    })

    const source = wallets.concat(msWallets)
    this.setState({ source })
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.value, addressError: false })
    this.props.setSearchValue(result.value)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)
      if (!tfchain.wallet_address_is_valid(value)) {
        this.setState({ addressError: true })
      } else {
        this.setState({ addressError: false })
      }

      const re = new RegExp(escapeRegExp(this.state.value), 'i')

      // enable searching on name or address
      const isMatch = result => (re.test(result.wallet_name) || re.test(result.value) || re.test(result.title))
      const results = filter(this.state.source, isMatch)

      // If no results, this means the user copied or typed an address that he does not know yet.
      // Pass this address
      if (results.length === 0) {
        this.props.setSearchValue(value)
        return this.setState({ value, isLoading: false, results, showNoResults: false })
      }

      // If results are found, show a dropdown list with possible selection
      this.setState({
        isLoading: false,
        results: filter(this.state.source, isMatch)
      })
    }, 300)
  }

  render () {
    const { isLoading, value, results, addressError, showNoResults } = this.state

    return (
      <div>
        <Search
          style={this.props.style}
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          value={value}
          placeholder='address'
          showNoResults={showNoResults}
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
