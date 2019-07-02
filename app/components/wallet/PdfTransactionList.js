import React from 'react'
import { Document, Page, Text, View } from '@react-pdf/renderer'
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

const PdfTransactionList = ({ transactions, startDate, endDate }) => {
  return (
    <Document>
      <Page wrap size='A4' style={styles.pageStyle}>
        <Text style={styles.title}>Transaction list</Text>
        {<Text style={styles.dateTitle}>From: {moment.unix(startDate).format('DD-MM-YYYY')}, Until: {moment.unix(endDate).format('DD-MM-YYYY')}</Text>}
        {transactions.map(tx => {
          return (
            <View style={styles.body}>
              <View style={styles.row}>
                <Text style={styles.txid}>
                  TXID: {tx.identifier}
                </Text>
                <View>
                  {tx.confirmed
                    ? (<Text style={styles.date}>
                      Confirmed at {moment.unix(tx.timestamp).format('DD-MM-YYYY, HH:mm')}
                    </Text>)
                    : (<Text>Unconfirmed</Text>)}
                </View>
                <View>
                  {renderTransactionBody(tx)}
                </View>
                <View>
                  {tx.message ? (
                    <Text style={styles.addresses}>Message: {tx.message}</Text>
                  ) : null }
                </View>
              </View>
            </View>
          )
        })}
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  )
}

function renderTransactionBody (tx) {
  if (tx.inputs.length > 0) {
    return tx.inputs.map(input => {
      return (
        <View style={styles.txBodyStyle}>
          <Text style={styles.receivedAmount}>Amount: + {input.amount.str({ unit: true })}</Text>
          {input.senders.map(sender => {
            return (
              <Text style={styles.addresses}>
                From: {sender}
              </Text>
            )
          })}
          <Text style={styles.addresses}>
            To: {input.recipient}
          </Text>
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
              <Text style={styles.addresses}>From: {sender}</Text>
            )
          })}
          <Text style={styles.addresses}>To: {out.recipient}</Text>
        </View>
      )
    })
  }
}

export default PdfTransactionList
