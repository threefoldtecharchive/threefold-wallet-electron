// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import { withRouter } from 'react-router-dom'
import { Grid, Menu, Icon, Divider } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'
import logo from '../../resources/icon.png'
import routes from '../constants/routes.json'
import Footer from '../components/footer'

const menuItemStyle = {
  color: 'white',
  height: '10vh',
  fontFamily: 'SF UI Text Bold',
  fontSize: 18,
  paddingTop: '10%',
  paddingLeft: '10%',
  boxShadow: 'none'
}

const iconStyle = {
  float: 'left',
  marginRight: 20
}

const mapStateToProps = state => {
  return {
    currentLocation: state.router.location.pathname,
    account: state.account.state
  }
}

class App extends Component {
  handleItemClick = (e, { name }) => {
    this.props.history.push(routes[name])
  }

  render () {
    const { children, currentLocation } = this.props
    const isGoldChain = this.props.account.chain_type === 'goldchain'

    return (
      <React.Fragment>
        <Grid style={{ height: 'calc(100vh - 50px)', marginBottom: 0 }}>
          <Grid.Column width='4' style={{ paddingRight: 0, borderRight: '1px solid grey', paddingBottom: 0, marginBottom: 0 }}>
            <Scrollbars style={{ height: '90vh' }} renderThumbVertical={props => <div {...props} style={{ backgroundColor: 'grey' }} />}>
              <div style={{ background: '#1C1D31' }}>
                <Menu vertical style={{ width: '100%', background: '#1C1D31' }}>
                  <Menu.Item style={{ display: 'flex', marginTop: 40, marginBottom: 30 }}>
                    <img style={{ width: 75, height: 75 }} src={logo} />
                    <p style={{ fontFamily: 'SF UI Text Heavy', fontSize: 25, color: 'white', marginTop: 15, marginLeft: 20 }}>TF Wallet</p>
                  </Menu.Item>
                  <Menu.Item
                    style={menuItemStyle}
                    name={'ACCOUNT'}
                    active={currentLocation === routes.ACCOUNT}
                    onClick={this.handleItemClick}
                  >
                    <Icon style={iconStyle} name='grid layout' />
                    <span>Account</span>
                  </Menu.Item>
                  <Menu.Item
                    style={menuItemStyle}
                    name={'TRANSFER'}
                    active={currentLocation === routes.TRANSFER}
                    onClick={this.handleItemClick}
                  >
                    <Icon style={iconStyle} name='send' />
                    <span>Send</span>
                  </Menu.Item>
                  <Menu.Item
                    style={menuItemStyle}
                    name={'WALLET_RECEIVE'}
                    active={currentLocation === routes.WALLET_RECEIVE}
                    onClick={this.handleItemClick}
                  >
                    <Icon style={iconStyle} name='arrow circle left' />
                    <span>Receive</span>
                  </Menu.Item>
                  {isGoldChain ? (null) : (
                    <Menu.Item
                      style={menuItemStyle}
                      name={'SIGN_TRANSACTIONS'}
                      active={currentLocation === routes.SIGN_TRANSACTIONS}
                      onClick={this.handleItemClick}
                    >
                      <Icon style={iconStyle} name='check circle' />
                      <span>Sign Transaction</span>
                    </Menu.Item>
                  )}
                  <Divider style={{ margin: 0 }} />
                  <Menu.Item
                    style={menuItemStyle}
                    name={'ACCOUNT_SETTINGS'}
                    active={currentLocation === routes.ACCOUNT_SETTINGS}
                    onClick={this.handleItemClick}
                  >
                    <Icon style={iconStyle} name='settings' />
                    <span>Settings</span>
                  </Menu.Item>
                  <Menu.Item
                    style={menuItemStyle}
                    name={'ADDRESS_BOOK'}
                    active={currentLocation === routes.ADDRESS_BOOK}
                    onClick={this.handleItemClick}
                  >
                    <Icon style={iconStyle} name='address book' />
                    <span>Address Book</span>
                  </Menu.Item>
                  <Menu.Item
                    style={menuItemStyle}
                    name={'HOME'}
                    active={currentLocation === routes.HOME}
                    onClick={this.handleItemClick}
                  >
                    <Icon style={iconStyle} name='sign-out' />
                    <span>Logout</span>
                  </Menu.Item>
                </Menu>
              </div>
            </Scrollbars>
          </Grid.Column>
          <Grid.Column width='12'>
            <Scrollbars style={{ height: '90vh' }} renderThumbVertical={props => <div {...props} style={{ backgroundColor: 'grey' }} />}>
              {children}
            </Scrollbars>
          </Grid.Column>
        </Grid>
        <Footer />
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      </React.Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(withRouter(App))
