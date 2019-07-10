import React from 'react'
import { Document, Page, Text, View } from '@react-pdf/renderer'
import { find } from 'lodash'
import moment from 'moment-timezone'

const styles = {
  title: {
    width: 250,
    padding: 2,
    fontSize: 24,
    flexGrow: 1,
    textAlign: 'center',
    backgroundColor: '#e4e4e4',
    textTransform: 'uppercase'
  },
  dateTitle: {
    marginTop: 10,
    fontSize: 14
  },
  pageStyle: {
    padding: 50
  },
  body: {
    flexGrow: 1,
    marginTop: 15,
    marginBottom: 15
  },
  txBodyStyle: {
    marginTop: 5,
    marginBottom: 5
  },
  txid: {
    fontSize: 12
  },
  addresses: {
    fontSize: 10
  },
  column: {
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: 20
  },
  headerBlock: {
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 10
  },
  accountBlock: {
    paddingRight: 20,
    flexDirection: 'column'
  },
  receivedAmount: {
    color: 'green',
    fontSize: 10
  },
  sentAmount: {
    color: 'red',
    fontSize: 10
  },
  date: {
    fontSize: 10
  },
  pageNumber: {
    float: 'right',
    fontSize: 12
  },
  balance: {
    fontSize: 13,
    flexDirection: 'row',
    paddingTop: 10
  },
  balanceRight: {
    fontSize: 13,
    flexDirection: 'row-reverse',
    paddingTop: 10
  },
  endLine: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5
  }
}

const PdfTransactionList = ({ transactions, startDate, endDate, account }) => {
  return (
    <Document>
      <Page wrap size='A4' style={styles.pageStyle}>
        <View style={styles.headerBlock}>
          <View style={styles.accountBlock}>
            <Text>Account: {account.account_name}</Text>
            <Text>Wallet: {account.selected_wallet.wallet_name}</Text>
          </View>
          <Text style={styles.title}>Transaction list</Text>
        </View>
        <Text style={styles.dateTitle}>From: {moment.unix(startDate).format('DD-MM-YYYY')}, Until: {moment.unix(endDate).format('DD-MM-YYYY')}</Text>
        <View style={styles.body}>
          {transactions.map((tx) => {
            return (tx.length > 0 &&
              <View>
                <View style={styles.balance}>
                  <Text>{tx[0].beginBalance.str() && (`Begin balance: ${tx[0].beginBalance.str({ unit: true })}`)}</Text>
                </View>
                {tx.map((t, index) => {
                  return (
                    <View style={styles.column} key={t.identifier}>
                      <Text style={styles.txid}>
                        {t.index}. TXID: {t.identifier}
                      </Text>
                      <View>
                        <Text style={styles.date}>
                        Confirmed at {moment.unix(t.timestamp).format('DD-MM-YYYY, HH:mm')}
                        </Text>
                      </View>
                      <View>
                        {renderTransactionBody(t, account)}
                      </View>
                      <View>
                        {t.message ? (
                          <Text style={styles.addresses}>Message: {t.message}</Text>
                        ) : null }
                      </View>
                    </View>
                  )
                })}
                <View style={styles.balanceRight}>
                  <Text>{tx[tx.length - 1].endBalance && (`End balance: ${tx[tx.length - 1].endBalance.str({ unit: true })}`)}</Text>
                </View>
                <View style={styles.endLine} />
              </View>
            )
          })}
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  )
}

function renderTransactionBody (tx, account) {
  if (tx.inputs.length > 0) {
    return tx.inputs.map(input => {
      return (
        <View style={styles.txBodyStyle} key={input.identifier}>
          <Text style={styles.receivedAmount}>Amount: + {input.amount.str({ unit: true })}</Text>
          {input.senders.map(sender => {
            return (
              <View style={styles.addresses} key={sender}>
                <Text>
                  From: {sender}
                </Text>
                <Text>
                  {getAddressName(sender, account)}
                </Text>
              </View>
            )
          })}
          <View style={styles.addresses}>
            <Text>
              From: {input.recipient}
            </Text>
            <Text>
              {getAddressName(input.recipient, account)}
            </Text>
          </View>
        </View>
      )
    })
  } else if (tx.outputs.length > 0) {
    return tx.outputs.map(out => {
      return (
        <View style={styles.txBodyStyle}>
          <Text style={styles.sentAmount}>
            Amount:  - {out.amount.str({ unit: true })}
            {out.is_fee ? (<Text>  Fee</Text>) : null}
          </Text>
          {out.senders.map(sender => {
            return (
              <View key={sender} style={styles.addresses}>
                <Text>
                  From: {sender}
                </Text>
                <Text>
                  {getAddressName(sender, account)}
                </Text>
              </View>
            )
          })}
          <View style={styles.addresses}>
            <Text>
              To: {out.recipient}
            </Text>
            <Text>
              {getAddressName(out.recipient, account)}
            </Text>
          </View>
        </View>
      )
    })
  }
}

function getAddressName (sender, account) {
  const { address_book: addressbook } = account
  const { contacts } = addressbook
  const singleContacts = contacts.filter(contact => !(contact.recipient instanceof Array))
  const contact = find(singleContacts, contact => contact.recipient === sender)
  const wallet = account.wallet_for_address(sender)

  if (contact) {
    return ` (contact: ${contact.contact_name})`
  } else if (wallet) {
    return ` (wallet: ${wallet.wallet_name})`
  }

  return ''
}

export default PdfTransactionList
