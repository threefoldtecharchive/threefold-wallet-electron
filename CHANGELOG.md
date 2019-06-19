# v0.1.3 (2018.06.19)

Features:

- make address fields searchable for easy input of known addresses.

Improvements:

- add README introduction.
- add information to the README about the product's positioning.
- add download-, installation-, and usage instructions to README.

Fixes:

- ensure the screens of the App can be used on a screen with low resolution.
- ensure the screens of the App can be used in magnified environments.
- improved error handling of the different forms found in the App.
- ensure transaction order (of a transaction within a block) is taken
  into account for transaction ordering as a secondary filter, following the block height filter.
- fix several critical errors caused by both valid and invalid actions, that caused the app to stop working.
- ensure the different (form) pages can be concluded and cancelled with respectively the enter and escape buttons.

# v0.1.2 (2018.06.14)

Features:

- support internal (coin) transfers: making it easy to transfer to your own wallets.
- add copy to clipboard for seed when creating account.

Fixes:

- GUI front-end fixes for small resolution screens.
- Fixed several critical errors caused by both valid and invalid actions, that caused the app to stop working.
- Prevent accounts from being overwritten.
- Load wallets one by one on initial account load, rather than waiting for all of them to finished loading.
- Prevent lonely wallets from being deleted.
- Limit account and wallet names to 48 characters 
- Display account name on top of account page.
- Allow trailing or leading spaces in mnemonic phrases and (wallet) addresses.
- Do not allow the same destination and source wallet for a single (coin) transfer.
- Clamp the wallet address count between 1 and 8 addresses (per wallet).
- Do not allow (in front-end) negative wallet indices.

# v0.1.1 (2018.06.12)

Fixes:

- fixed unlimited storage of previous know locations in app.
- fixed some filtering on wallet dropdowns.
- added new appimage icon for Linux.

# v0.1.0 (2018.06.11)

- A first version of the desktop wallet, available for MacOS, Windows, Linux.
- You can wallet multiple wallets per accounts, as many accounts you want.
- An account is identified by a seed.
- A wallet can be single-signature or multi-signature.
- You can send to single-signature or multi-signature wallets, and optionally with a time lock.
