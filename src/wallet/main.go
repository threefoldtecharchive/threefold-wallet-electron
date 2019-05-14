package main

import "github.com/gopherjs/gopherjs/js"

func NewJSWallet(mnemonic string, index uint64) *js.Object {
	wallet, err := NewWallet(mnemonic, index)
	if err != nil {
		panic(err)
	}
	return js.MakeWrapper(wallet)
}

func main() {
	js.Global.Set("tfwallet", map[string]interface{}{
		"New":             NewJSWallet,
		"NewMnemonic":     NewMnemonic,
		"EncryptMnemonic": EncryptMnemonic,
	})
}
