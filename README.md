# Threefold Electron Wallet

> :information_source: [More information about this desktop application and its positioning as a product.](about.md)

A desktop application that allows you to manage all your Threefold wallets. We support four types of tokens, Threefold token (TFT), Goldchain token (GFT), EuroToken (EUR), Free Flow token (FFT) and Threefold Bonus token (TFB). Each wallet is linked to an account, and an account is identified by a seed (mnemonic phrase). An account can have multiple wallets. Each wallet can have up to `8` addresses and requires a minimum `1` address (the default).

The mnemonic phrase (used as seed for an account) is compatible with [the Threefold mobile application](https://github.com/threefoldfoundation/tf_app), JumpscaleX light client and official Threefold binary tools. This allows you to recover your wallets created in these clients as an account of this client. Accounts created with this client can also recovered with the other clients. Do note that the [the Threefold mobile application](https://github.com/threefoldfoundation/tf_app) and JumpscaleX light client will only recover the default wallet of your account. In these other clients there is also no concept of account, but just a single wallet. The JumpscaleX light client does allow you to load as many addresses as you want in a single wallet, the [the Threefold mobile application](https://github.com/threefoldfoundation/tf_app) is limited to just one address of just one wallet.

> :warning: This project is currently still in alpha-mode. No direct support is offered at this point.
> Do feel free to report issues if you encounter a problem or have suggestions.
> Pull requests are also welcome. As this is also not an official Threefold product, it is not expected
> that direct support will ever be offered. It might also mean that while some features could be useful for this App,
> it won't be added due to time constraints.

## Index

- [Download docs](#download) (including macOS and Windows installation instructions)
- [Usage docs](#usage)
- [Scripted transactions](#scripted-transactions)
- [Developer docs](#developer-docs)

## Download

![GitHub release](https://img.shields.io/github/release-pre/threefoldtech/threefold-wallet-electron.svg)

- [Windows Installer](https://github.com/threefoldtech/threefold-wallet-electron/releases/download/v0.6.2/Threefold-Wallet.Setup.0.6.2.exe)
  - Windows 7 or later
  - ia32 (x86) and x64 (amd64)
- [macOS Installer](https://github.com/threefoldtech/threefold-wallet-electron/releases/download/v0.6.2/Threefold-Wallet-0.6.2.dmg)
  - 10.10 (Yosemite) or later
  - 64-bit only
- [Linux Installer](https://github.com/threefoldtech/threefold-wallet-electron/releases/download/v0.6.2/Threefold-Wallet.0.6.2.AppImage)
  - Fedora 21, Debian 8 or Ubuntu 12.04 and newer
  - ia32 (i686), x64 (amd64), armv7l (ARM v7)

> :exclamation: macOS and Windows users will have to do some extra steps to be able to use our application, given it will be marked as an untrusted application (or at least an application from an untrusted developer).
> - macOS users can find more information on how to open an application such as ours for the first time (after installation): <https://support.apple.com/kb/ph25088>
> - For windows users we did not find official documentation so far. However here is some quick guidance to get your started in using our App as a Windows user:
>   - your browser (e.g. Chrome) might not want to finish downloading our `exe` installer. You can keep it by pressing a button (e.g. an arrow) somewhere in the download area and choose to keep our download)
>   - Windows itself (since Windows 10) won't like to install it either. When installing it will warn you that the app cannot be trusted and offer you only to close the installation. However upon pressing the "More Information" button (or something like it) you'll see a button that allows you to continue the installation
>   - If you have a virus scanner, it might not like the installer and/or application either, you'll have to force to trust it

## Usage

While we hope that the Application is intuitive and easy to use, it might very well be possible that it is still not clear to you on what to do. Should this be the case feel free to open an issue so we can improve our user experience (UX). In the meanwhile, hopefully this Usage chapter allows you to figure out how to achieve what you want to do.

Index:
- [Home page](#home), links to:
 - [Account creation page](#account-creation)
 - [Account recovery page](#account-recovery)
 - [Account login page](#account-login), links to:
   - [Account overview page](#account-overview), links to:
     - [Account settings page](#account-settings)
     - [Wallet transfer page](#transfer)
     - [Wallet receive page](#receive)
     - [Wallet sign page](#sign)
     - [Wallet overview page](#wallet-overview), links to:
       - [Wallet settings page](#wallet-settings)
       - [Wallet transfer page](#transfer)
       - [Wallet receive page](#receive)
       - [Wallet sign page](#sign)
  - [Address book page](#address-book)

### Home

![screenshot of home page](/docs/images/scrshot_home.png)

> When you start the application you'll have the option between creating a new account, by [recovering an account using your own seed](#account-recovery) or by [creating a new account using a generated seed](#account-creation), or [logging into a stored account](#account-login).

#### Account Creation

![screenshot of account creation page](/docs/images/scrshot_account_new.png)

> This page allows you to create a new account and store it on your local disk:
> - an account is linked to a TFChain or Goldchain network (this cannot be changed once the account is created):
>   - `standard` is the regular network and works with real money (TFT / GFT);
>   - `testnet` is the test network, works with test tokens, useful to play with the TFChain or Goldchain technology and test new features;
> - Account name is a label for you to know what account is what;
> - Password is used to encrypt your stored account (and its info);
> - The seed (mnemonic phrase) is a 24-word list that is used as the input for all your wallet's keys. Choose to generate a seed for you to create a new account;
>   - :exclamation: be sure to make a secure backup of this seed, so you can recover your account (and its linked wallets) when needed;

#### Account Recovery

![screenshot of account recovery page](/docs/images/scrshot_account_new.png)

> Similar to [account creation](#account-creation), except that you'll provide the seed (mnemonic phrase, a 24-word list) yourself, instead of opting to generate one.

#### Account Login

![screenshot of account login page](/docs/images/scrshot_account_login.png)

> Provide the password you choose at [account creation](#account-creation) or [account-recovery](#account-recovery) to start using your account. This is required in order to decrypt your account details from the local disk.

### Account Overview

![screenshot of account overview page](/docs/images/scrshot_account_overview.png)

> Shows an overview of your wallets as well as your account's total balance. On the left pane you'll find your regular (personal) wallets separated by the multi-signature wallets (wallets co-owned by you and others) below.
>
> Account settings can be found at the top right, next to the "Account Logout" button.
>
> [Receive](#receive), [Transfer](#transfer) and [Sign](#sign) buttons go to the same pages as those available on the [wallet overview page](#wallet-overview), using/selecting the default (first personal/regular wallet) as the wallet of choice.

#### Account Settings

![screenshot of account settings page](/docs/images/scrshot_account_settings.png)

> Allows you to change the account's name and delete the account. You'll also find shortcuts to the [wallet settings page](#wallet-settings) as well as a shortcut for each wallet to delete it.

### Wallet Overview

![screenshot of wallet overview page](/docs/images/scrshot_wallet_overview.png)

> Similar to the [account overview page](#account-overview) but with a focus on a specific (regular/personal) wallet.
>
> Additionally you'll also find a transaction history on this page, sorted from newest to oldest.

### MultiSignature Wallet Overview

![screenshot of multi-sig wallet overview page](/docs/images/scrshot_wallet_multisig_overview.png)

> Similar to the [wallet overview page](#wallet-overview) but with a focus on a specific multi-signature wallet.

#### Transfer

![screenshot of wallet transfer page](/docs/images/scrshot_wallet_transfer.png)

> Allows you to transfer tokens from one wallet to another. The destination can be a regular (personal) wallet, multi-signature wallet as well as one of your own wallets.
> Depending on which destination wallet you want to send you, you'll need to select the correct tab.
>
> You cannot transfer 0 tokens or more tokens (+ the minimum transaction fee of `0.1 TFT or 0.1 GFT`) than available in your account.
>
> Optionally you can attach a timelock to your transfer, meaning the transfered funds are locked in the destination wallet until the specified date (and time). If no time is specified `00:00` is used. Note that the funds will immediately be taken from your wallet and sent to the destination wallet.

#### Receive

![screenshot of wallet receive page](/docs/images/scrshot_wallet_receive.png)

> Allows you to copy your wallet address(es).
> 
> The provided QR Code (for single signature wallets) is compatible with [the official Threefold Mobile App](https://github.com/threefoldfoundation/tf_app), meaning you can use that app to scan this QR code and immediately transfer tokens to this wallet (Please ensure that you're on the same network as this account, or your tokens won't arrive where you expect them).

#### Sign

![screenshot of wallet sign page](/docs/images/scrshot_wallet_sign.png)

> Allows you to sign the transaction and if possible send it. This page is currently only required for co-signing a transaction that could be not be send yet after trying to transfer from a Multi-signature wallet which requires multiple signatures.
>
> For example: if you and your partner co-own a 2-of-2 wallet, meaning you 2 are the only owners and both of you have to sign. Than you'll see that if you try to transfer funds from that wallet to another wallet that it will direct you to a page complaining it required more signatures. At that point you need to copy the provided JSON (transaction) output to your clipboard and send it to your partner (e.g. via an IM application). When receiving this JSON (transaction) output from you, your partner will paste the content on this page and press the "Sign and Send" button. The transaction will now succesfully be signed and sent to the official explorer nodes.
>
> :exclamation: ensure that you sign from the correct wallet or it will give you an error that it failed to sign and submit.

#### Wallet Settings

![screenshot of wallet settings page](/docs/images/scrshot_wallet_settings.png)

> Allows you to change the wallet's name and delete the wallet.
> 
> For regular (personal) wallets you can also update the start index and address length. You can have no more than `8` addresses per wallet, and at least `1` is required. This allows you to provide aliases for different purposes to the same wallet. The start index defines what addresses are generated. In short, each address is generated using the seed of your account plus an index as the input for the private/public cryptographic key pair that is used to sign with a wallet and from which an address is generated. As an example if you have start index `1`, and address length `3`, than the wallet will use the indices `2, 3, 4 and 5`.
>> :bulb: For multi-signature wallets this is not used, and thus it is not available in the settings page of a multi-signature wallet.

#### Address Book

![screenshot of account creation page](/docs/images/scrshot_address_book.png)

> This page allows you to create, delete and modify contacts.
> A contact is identified by a name and can represent a single-signature wallet as well as a multi-signature wallet.

## Scripted Transactions

No matter how many transaction forms we'll provide the user,
there will always be use cases that cannot be achieved using the GUI.
That is where the Scripted Transactions Send page comes in.

It allows you to use modern ES6 javascript directly to define your logic,
using our internal JS API. It is currently still undocumented,
but you can view the API code at [/src/api.py](/src/api.py).

Your script will have access to the following two global variables exposed by the eval code:
- `wallet`: the wallet selected (see the API src code for the Wallet API)
- `Currency`: the class that can be used for doing safe currency value computations (see the API src code for the Currency API)

Besides our exposed tfchain globals you can also access the standard builtin JS globals (e.g. `Date`).

### Examples

This is an example script allowing you to transfer a total amount of tokens to someone,
spreaded over several months (default is 24), where each of those months 1/24 of the total amount will unlock:

```javascript
function() {

// script constants
const destination = '<ENTER WALLET ADDRESS HERE>'
const periodMonthCount = 24
const startUnlockDateTime = '2020.01.01 00:00:00'
const amount = new Currency('<ENTER AMOUNT HERE, e.g: 42.345>')
const message = ''

// generate periodic pay info
const startUnlockDate = new Date(startUnlockDateTime)
let unlockInfo = []
const periodicAmount = amount.divided_by(periodMonthCount)
for (let i = 0; i < periodMonthCount; i++) {
    var m, d = (date = new Date(+startUnlockDate)).getUTCDate()
    date.setUTCMonth(date.getUTCMonth() + i, 1)
    m = date.getUTCMonth()
    date.setUTCDate(d)
    if (date.getUTCMonth() !== m) date.setUTCDate(0)
    unlockInfo.push({
        timestamp: date.getTime() / 1000,
        amount: new Currency(periodicAmount),
    })
}

// correct first payment in case rounding errors have occured
const totalAmount = periodicAmount.times(periodMonthCount)
const difference = amount.minus(totalAmount)
if (difference.not_equal_to(0)) {
    unlockInfo[0].amount = unlockInfo[0].amount.plus(difference)
}

// ensure our total amount equals the desired amount
let newTotalAmount = new Currency()
unlockInfo.forEach((unlockPair) => newTotalAmount = newTotalAmount.plus(unlockPair.amount))
if (amount.not_equal_to(newTotalAmount)) {
    throw 'unexpected total amount of ' + newTotalAmount.str({unit: true})
}

// build transaction
const builder = wallet.transaction_new()
unlockInfo.forEach((unlockPair) => {
    builder.output_add(destination, unlockPair.amount.str(), { lock: unlockPair.timestamp })
})

// send the transaction and return the result promise
const resprom = builder.send({ message: message ? message : null }).then(result => {
    return {
        output: `successfully sent ${amount.str({unit: true})} to ${destination} unlocked over ${periodMonthCount} month(s) starting at ${startUnlockDateTime} as Txn ${result.transaction.id}`,
    }
})

// return our resulting promise
return {
    output: resprom,
}

}()
```

This is an example script that allows you to ensure your wallet only has a
limited amount of coin outputs, doing paid merge transactions if required:

```javascript
function() {

// script constants
const maxOutputsPerWalletCount = 32

// callback used to merge
let txs = []
const merge_callback = (result) => {
    if (result) {
        if (!result.submitted) {
            // special case in case no transactions were submitted
            if (txs.length == 0) {
                return { output: 'No merge transactions have been submitted!' }
            }

            // get the total merged value
            let mergeTotal = new Currency()
            txs.forEach(tx => {
                tx.coin_outputs.forEach(co => {
                    mergeTotal = mergeTotal.plus(co.value)
                })
            })

            // return the merge info
            let output = `Successfully merged ${mergeTotal.str({unit: true})} in ${txs.length} merge transaction(s). All Transactions: `
            output += txs.map(tx => tx.id).join(', ')
            return { output }
        }

        // add submitted transaction
        txs.push(result.transaction)
    }

    // send next merge transaction
    const builder = wallet.transaction_new()
    return builder.send({ merge: true, mergeMinOutputCount: maxOutputsPerWalletCount+1 }).then(merge_callback)
}

// merge & report
return { output: merge_callback() }

}()
```

## Developer Docs

### Debug a Production Build

#### Debug a Production Build on MacOS

1. open App through `lldb` (required Xcode command-line tools, which can be installed using `xcode-select --install`)
```
lldb /Applications/Threefold-Wallet.app
```
2. Using the opened debugger open a window of your app:
```
run --remote-debugging-port=8315
```
3. Open Chrome at http://localhost:8315/
4. Click on the name of the App "Threefold Wallet"
5. Many of the regular dev tools that you are used to in dev builds are now available. To check warnings and errors you can for example open the console.

### Run as developer

**Install dependencies**
```bash
$ yarn
```

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

If you don't need autofocus when your files are changed, then run `dev` with env `START_MINIMIZED=true`:

```bash
$ START_MINIMIZED=true yarn dev
```

### Packaging

To package apps for the local platform:

```bash
$ yarn package
```

To package apps for all platforms:

First, refer to the [Multi Platform Build docs](https://www.electron.build/multi-platform-build) for dependencies.

Then,

```bash
$ yarn package-all
```

To package apps with options:

```bash
$ yarn package --[option]
```

###  Linux packaging

```bash
$ yarn package-linux
```
Will generate [AppImage](https://appimage.org), snap, deb, rpm packages. We recommend using `AppImage`

####  Running AppImage
Just Download the application, make it executable, and run! No need to install. No system libraries or system preferences are altered. 
- Make sure to have libfuse installed
- `chmod +x file.AppImage` 
- `./file.AppImage`
