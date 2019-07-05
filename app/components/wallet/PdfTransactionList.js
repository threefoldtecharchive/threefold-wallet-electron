import React from 'react'
import { Document, Page, Text, View } from '@react-pdf/renderer'
import { find } from 'lodash'
import moment from 'moment-timezone'

const styles = {
  title: {
    margin: 'auto',
    fontSize: 25,
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
    paddingBottom: 10
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
  }
}

const PdfTransactionList = ({ transactions, startDate, endDate, account }) => {
  return (
    <Document>
      <Page wrap size='A4' style={styles.pageStyle}>
        <Text style={styles.title}>Transaction list</Text>
        <Text style={styles.dateTitle}>From: {moment.unix(startDate).format('DD-MM-YYYY')}, Until: {moment.unix(endDate).format('DD-MM-YYYY')}</Text>
        <View style={styles.body}>
          {transactions.map(tx => {
            return (
              tx.confirmed && (
                <View style={styles.column}>
                  <Text style={styles.txid}>
                    TXID: {tx.identifier}
                  </Text>
                  <View>
                    <Text style={styles.date}>
                        Confirmed at {moment.unix(tx.timestamp).format('DD-MM-YYYY, HH:mm')}
                    </Text>
                  </View>
                  <View>
                    {renderTransactionBody(tx, account)}
                  </View>
                  <View>
                    {tx.message ? (
                      <Text style={styles.addresses}>Message: {tx.message}</Text>
                    ) : null }
                  </View>
                </View>
              )
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
        <View style={styles.txBodyStyle}>
          <Text style={styles.receivedAmount}>Amount: + {input.amount.str({ unit: true })}</Text>
          {input.senders.map(sender => {
            return (
              <View style={styles.addresses}>
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
              <View style={styles.addresses}>
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
