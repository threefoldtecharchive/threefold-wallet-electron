// @flow
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Button, Icon, Divider, TextArea, Label } from 'semantic-ui-react'
import styles from '../home/Home.css'
import Footer from '../footer'
import routes from '../../constants/routes'
import { selectWallet, setBalance, clearTransactionJson } from '../../actions'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

const mapStateToProps = state => ({
  account: state.account,
  wallet: state.wallet,
  json: state.transactions.json
})

const mapDispatchToProps = (dispatch) => ({
  selectWallet: (wallet) => {
    dispatch(selectWallet(wallet))
  },
  setBalance: (account) => {
    dispatch(setBalance(account))
  },
  clearTransactionJson: () => {
    dispatch(clearTransactionJson())
  }
})

class Sign extends Component {
  goBackToWallet = () => {
    this.props.clearTransactionJson()
    this.props.history.push(routes.ACCOUNT)
  }

  render () {
    const { json } = this.props
    return (
      <div>
        <div className={styles.container} >
          <h2 >Sign Transaction</h2>
        </div>
        <Divider style={{ background: '#1A253F' }} />
        <Icon onClick={() => this.props.history.goBack()} style={{ fontSize: 25, marginLeft: 15, marginTop: 15, cursor: 'pointer' }} name='chevron circle left' />
        <span onClick={() => this.props.history.goBack()} style={{ width: 60, fontFamily: 'SF UI Text Light', fontSize: 12, cursor: 'pointer', position: 'relative', top: -5 }}>Go Back</span>
        <Form error style={{ width: '50%', margin: 'auto', marginTop: 0 }}>
          <Form.Field style={{ marginTop: 30 }}>
            <p style={{ fontSize: 14 }}>Before completing this transaction, one or more signatures are required. Copy this transaction JSON and send it to the persons that must sign this.</p>
          </Form.Field>
          <Form.Field style={{ marginTop: 10 }}>
            <TextArea
              style={{ background: '#0c111d !important', color: '#7784a9', height: 250 }}
              icon={<Icon name='send' style={{ color: '#0e72f5' }} />}
              iconPosition='left'
              placeholder='raw json'
              value={json}
              onChange={this.handleDestinationChange}
              disabledjson_loads
            />
          </Form.Field>
          <CopyToClipboard text={json} onCopy={() => console.log('copied')}>
            <Label onClick={() => toast('Seed copied to clipboard')} style={{ display: 'block', margin: 'auto', width: 200, cursor: 'pointer' }}><Icon name='clipboard' /> copy json to clipboard</Label>
          </CopyToClipboard>
        </Form>
        <div style={{ position: 'absolute', bottom: 150, right: 80 }}>
          <Button className={styles.cancelButton} onClick={() => this.goBackToWallet()} style={{ marginTop: 20, float: 'left', background: '#2B3C72', color: 'white', marginRight: 15 }} size='big'>Go to account</Button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sign)
