package main

import "github.com/gopherjs/gopherjs/js"

func NewJSWallet(mnemonic string, index uint64) *js.Object {
	wallet, err := NewWallet(mnemonic, index)
	if err != nil {
		panic(err)
	}
	return js.MakeWrapper(wallet)
}

func NewJSAccount(name string, mnemonic string, index uint64) *js.Object {
	account, err := NewAccount(name, mnemonic, index)
	if err != nil {
		panic(err)
	}
	return js.MakeWrapper(account)
}

func main() {
	js.Global.Set("tfwallet", map[string]interface{}{
		"New":             NewJSWallet,
		"NewMnemonic":     NewMnemonic,
		"EncryptMnemonic": EncryptMnemonic,
		"NewAccount":      NewJSAccount,
	})
}
