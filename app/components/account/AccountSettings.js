// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Icon } from 'semantic-ui-react'
import routes from '../../constants/routes'
import styles from '../home/Home.css'
import { saveAccount } from '../../actions'

const mapStateToProps = state => ({
  account: state.account
})

const mapDispatchToProps = (dispatch) => ({
  saveAccount: (account) => {
    dispatch(saveAccount(account))
  }
})

class AccountSettings extends Component {
  constructor (props) {
      super(props)
      this.state = {
        name: this.props.account.name
      }
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value })
  }
  
  saveAccount = () => {
    const { name } = this.state
    console.log(this.props.account)

    const newAccount = Object.assign(this.props.account, {
      name: name
    })

    console.log(newAccount)
    this.props.saveAccount(newAccount)

    return this.props.history.push("/account")
  }

  render() {
    const { name } = this.state
    return (
        <div>
            <div className={styles.backButton} data-tid="backButton">
                <Link to={routes.ACCOUNT}>
                    <Icon style={{ fontSize: 35, position: 'absolute', left: 20, cursor: 'pointer' }} name="chevron circle left"/>
                </Link>
            </div>
            <div className={styles.container} >
                <h2 >Account Settings</h2>
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
                    <Button type='submit' onClick={this.saveAccount}>Save</Button>
                </Form>
            </div>
        </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettings)