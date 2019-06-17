# TFChain Electron Wallet

> :information_source: [More information about this desktop application and its positioning as a product.](about.md)

A desktop application that allows you to manage all your TFChain wallets. Each wallet is linked to an account, and an account is identified by a seed (mnemonic phrase). An account can have multiple wallets.

The mnemonic phrase (used as seed for an account) is compatible with [the TFChain mobile application](https://github.com/threefoldfoundation/tf_app), JumpscaleX light client and official TFChain binary tools.

> :warning: This project is currently still in alpha-mode. No direct support is offered at this point.
Do feel free to report issues if you encounter a problem or have suggestions.
Pull requests are also welcome.

## Index

- [Download docs](#download) (including macOS and Windows installatio instructions)
- [Usage docs](#usage)
- [Developer docs](#developer-docs)

## Download

![GitHub release](https://img.shields.io/github/release-pre/threefoldfoundation/tfchain-wallet-electron.svg)

- [Windows Installer](https://github.com/threefoldfoundation/tfchain-wallet-electron/releases/download/v0.1.2/TFT-Wallet.Setup.0.1.2.exe)
  - Windows 7 or later
  - ia32 (x86) and x64 (amd64)
- [macOS Installer](https://github.com/threefoldfoundation/tfchain-wallet-electron/releases/download/v0.1.2/TFT-Wallet-0.1.2.dmg)
  - 10.10 (Yosemite) or later
  - 64-bit only
- [Linux Installer](https://github.com/threefoldfoundation/tfchain-wallet-electron/releases/download/v0.1.2/TFT-Wallet.0.1.2.AppImage)
  - Fedora 21, Debina 8 or Ubuntu 12.04 and newer
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

### Home

![screenshot of home page](/docs/images/scrshot_home.png)

> When you start the application you'll have the option between creating a new account, by [recovering an account using your own seed](#account-recovery) or by [creating a new account using a generated seed](#account-creation), or [logging into a stored account](#account-login).

#### Account Creation

![screenshot of account creation page](/docs/images/scrshot_account_new.png)

> This page allows you to create a new account and store it on your local disk:
> - an account is linked to a TFChain network (this cannot be changed once the account is created):
>   - `standard` is the regular network and works with real money (TFT);
>   - `testnet` is the test network, works with test tokens, useful to play with the TFChain technology and test new features;
>   - `devnet` is for developers only
> - Account name is a label for you to know what account is what;
> - Password is used to encrypt your stored account (and its info);
> - The seed (mnemonic phrase) is a 24-word list that is used as the input for all your wallet's keys. Choose to generate a seed for you to create a new account;
>   - :exclamation: be sure to make a secure backup of this seed, so you can recover your account (and its linked wallets) when needed;

#### Account Recovery

![screenshot of account recovery page](/docs/images/scrshot_account_recover.png)

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

### MultiSignature Wallet Overview

![screenshot of multi-sig wallet overview page](/docs/images/scrshot_wallet_multisig_overview.png)

> Similar to the [wallet overview page](#wallet-overview) but with a focus on a specific multi-signature wallet.

#### Transfer

![screenshot of wallet transfer page](/docs/images/scrshot_wallet_transfer.png)

> Allows you to transfer tokens from one wallet to another. The destination can be a regular (personal) wallet, multi-signature wallet as well as one of your own wallets.
>
> You cannot transfer 0 tokens or more tokens (+ the minimum transaction fee of `0.1 TFT`) than available in your account.
>
> Optionally you can attach a timelock to your transfer, meaning the transfered funds are locked in the destination wallet until the specified date (and time). If no time is specified `00:00` is used. Note that the funds will immediately be taken from your wallet and sent to the destination wallet.

#### Recieve

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
>> For multi-signature wallets this is not used, and thus it is not available in the settings page of a multi-signature wallet.

## Developer Docs

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
