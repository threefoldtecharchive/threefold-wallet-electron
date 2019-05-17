// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import routes from '../../constants/routes'
import { selectAccount } from '../../actions'
import * as tfchain from '../../tfchain/api'

const mapStateToProps = state => ({
  account: state.account
})

const mapDispatchToProps = (dispatch) => ({
  SelectAccount: (account) => {
    dispatch(selectAccount(account))
  }
})

class Login extends Component {
  constructor (props) {
      super(props)
      this.state = {
        name: this.props.account.account_name,
        password: '',
        passwordError: false
      }
  }

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value })
  }

  login = () => {
    const { password } = this.state
    try {
      const account = tfchain.Account.deserialize(this.props.account.account_name,  password, this.props.account)
      this.props.SelectAccount(account)
      return this.props.history.push("/account")
    } catch (error) {
      console.log(error)
      this.setState({ passwordError: true })
    }
  }

  render() {
    const { password, passwordError } = this.state
    return (
      <div style={{ margin: 'auto' }}>
          <div style={{ marginTop: 200, textAlign: 'center' }} >
          <h3>Sign in to account: {this.props.account.account_name}</h3>
            <Form style={{ width: '50%', margin: 'auto', marginTop: 10 }}>
                <Form.Field error={passwordError}>
                    <label style={{ float: 'left', color: 'white' }}>Password</label>
                    <input type='password' placeholder='.....' value={password} onChange={this.handlePasswordChange}/>
                </Form.Field>
                <div style={{ marginTop: 50 }}>
                  <Button onClick={() => this.props.history.push(routes.HOME)} style={{ background: '#2B3D72', color: 'white', marginRight: 15 }}>Cancel</Button>
                  <Button type='submit' onClick={this.login} style={{ background: '#015DE1', color: 'white' }}>Login</Button>
                </div>
            </Form>
          </div>
        </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)