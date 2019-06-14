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
- Limit account names to 48 characters.
- Display account name on top of account page.

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
