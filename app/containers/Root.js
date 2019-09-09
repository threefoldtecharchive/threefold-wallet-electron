// @flow
import { connect, Provider } from 'react-redux'
import React, { Component } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import Routes from '../Routes'
import { loadAccounts, updateAccount, setError } from '../actions'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'

const mapStateToProps = state => ({
  account: state.account.state
})

const mapDispatchToProps = (dispatch) => ({
  loadAccounts: (accounts) => {
    dispatch(loadAccounts(accounts))
  },
  updateAccount: (account) => {
    dispatch(updateAccount(account))
  },
  setError: (error) => {
    dispatch(setError(error))
  }
})

class Root extends Component {
  constructor (props) {
    super(props)
    this.state = { errorOccurred: false }
  }

  componentDidCatch = (error, info) => {
    console.log(error)
    if (error) {
      this.props.setError(error)
      this.props.history.push('/')
    }
    this.setState({ errorOccurred: true })
  }

  async componentWillMount () {
    Moment.locale()
    momentLocalizer()

    // Refresh account balance every 1 minutes
    this.intervalID = setInterval(() => {
      const { account } = this.props
      if (account && !(account instanceof Array)) {
        this.props.updateAccount(account)
      }
    }, 60000)
  }

  componentWillUnmount () {
    clearInterval(this.intervalID)
  }

  render () {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)
