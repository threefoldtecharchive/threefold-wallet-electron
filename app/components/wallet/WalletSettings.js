// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Icon } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import { saveWallet } from '../../actions'

const mapStateToProps = state => ({
  selectedWallet: state.selectedWallet
})

const mapDispatchToProps = (dispatch) => ({
  saveWallet: (wallet) => {
    dispatch(saveWallet(wallet))
  }
})

class WalletSettings extends Component {
  constructor (props) {
      super(props)
      this.state = {
        name: this.props.selectedWallet.name
      }
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value })
  }
  
  saveWallet = () => {
    const { name } = this.state
    console.log(this.props.selectedWallet)

    const newWallet = Object.assign(this.props.selectedWallet, {
      name: name
    })

    this.props.saveWallet(newWallet)

    return this.props.history.push("/wallet")
  }

  render() {
    const { name } = this.state
    return (
        <div>
            <div className={styles.backButton} data-tid="backButton">
                <Link to={routes.WALLET}>
                    <Icon style={{ fontSize: 35, position: 'absolute', left: 20, cursor: 'pointer' }} name="chevron circle left"/>
                </Link>
            </div>
            <div className={styles.container} >
                <h2 >Wallet Settings</h2>
                <Form error style={{ width: '50%', margin: 'auto', marginTop: 60}}>
                    <Form.Field>
                        <label style={{ float: 'left' }}>Name</label>
                        <input placeholder='01X.....' value={this.state.name} onChange={this.handleNameChange}/>
                    </Form.Field>
                    {/* <Form.Input label='Destination address' placeholder='01X.....' /> */}
                    {/* {nameErrorMessage} */}
                    {/* <Form.Field>
                        <label style={{ float: 'left' }}>Destination message</label>
                        <input placeholder='message' value={description} onChange={this.handleDescriptionChange}/>
                    </Form.Field> */}
                    {/* <Form.Input label='Description message' placeholder='message' value={description} onChange={this.handleDescriptionChange}/> */}
                    {/* {seedErrorMessage} */}
                    <Link to={routes.ACCOUNT}><Button>Cancel</Button></Link>
                    <Button type='submit' onClick={this.saveWallet}>Save</Button>
                </Form>
            </div>
        </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletSettings)