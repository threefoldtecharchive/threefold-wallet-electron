package main

import (
	"crypto/rand"

	"github.com/threefoldtech/rivine/crypto"
	"github.com/threefoldtech/rivine/types"

	bip39 "github.com/tyler-smith/go-bip39"
)

// test code, does not reflect final API

func NewMnemonic() string {
	entropy, err := bip39.NewEntropy(256)
	if err != nil {
		return ""
	}
	mnemonic, err := bip39.NewMnemonic(entropy)
	if err != nil {
		return ""
	}
	return mnemonic
}

type Wallet struct {
	publicKey crypto.PublicKey
	secretKey crypto.SecretKey
}

func NewWallet(mnemonic string, index uint64) (*Wallet, error) {
	seed, err := bip39.EntropyFromMnemonic(mnemonic)
	if err != nil {
		return nil, err
	}
	sk, pk := crypto.GenerateKeyPairDeterministic(crypto.HashAll(seed, index))
	return &Wallet{
		publicKey: pk,
		secretKey: sk,
	}, nil
}

func (wallet *Wallet) Address() string {
	return types.NewEd25519PubKeyUnlockHash(wallet.publicKey).String()
}

func (wallet *Wallet) TestJSONTransaction() string {
	txn := types.Transaction{
		Version: types.TransactionVersion(1),
		CoinInputs: []types.CoinInput{
			{
				ParentID: randomCoinOutputID(),
				Fulfillment: types.NewFulfillment(types.NewSingleSignatureFulfillment(types.PublicKey{
					Algorithm: types.SignatureAlgoEd25519,
					Key:       types.ByteSlice(wallet.publicKey[:]),
				})),
			},
			{
				ParentID: randomCoinOutputID(),
				Fulfillment: types.NewFulfillment(types.NewSingleSignatureFulfillment(types.PublicKey{
					Algorithm: types.SignatureAlgoEd25519,
					Key:       types.ByteSlice(wallet.publicKey[:]),
				})),
			},
		},
		CoinOutputs: []types.CoinOutput{
			types.CoinOutput{
				Value:     types.NewCurrency64(75900000000000),
				Condition: types.NewCondition(types.NewUnlockHashCondition(randomUnlockHash())),
			},
			types.CoinOutput{
				Value:     types.NewCurrency64(130400000000000000),
				Condition: types.NewCondition(types.NewUnlockHashCondition(types.NewEd25519PubKeyUnlockHash(wallet.publicKey))),
			},
		},
		MinerFees: []types.Currency{
			types.NewCurrency64(100000000),
		},
		ArbitraryData: []byte("hello random transaction"),
	}
	for index, ci := range txn.CoinInputs {
		err := ci.Fulfillment.Sign(types.FulfillmentSignContext{
			ExtraObjects: []interface{}{index},
			Transaction:  txn,
			Key:          wallet.secretKey,
		})
		if err != nil {
			return ""
		}
	}
	b, err := txn.MarshalJSON()
	if err != nil {
		return ""
	}
	return string(b)
}

func randomUnlockHash() types.UnlockHash {
	var uh types.UnlockHash
	uh.Type = types.UnlockTypePubKey
	rand.Read(uh.Hash[:])
	return uh
}

func randomCoinOutputID() types.CoinOutputID {
	var coID types.CoinOutputID
	rand.Read(coID[:])
	return coID
}

func EncryptMnemonic(mnemonic string, passphrase string) []byte {
	seed, err := bip39.EntropyFromMnemonic(mnemonic)
	if err != nil {
		return nil
	}
	return []byte(crypto.TwofishKey(crypto.HashAll(passphrase)).EncryptBytes(seed))
}
