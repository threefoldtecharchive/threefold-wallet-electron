import tfchain.tests.jsassert as jsass

import tfchain.polyfill.encoding.hex as jshex
import tfchain.crypto.mnemonic as bip39
import tfchain.wallet as tfwallet

from tfchain.types.ConditionTypes import UnlockHash, UnlockHashType

__bip39 = bip39.Mnemonic()

def test_assymetric_key_pair_generate():
    entropy = __bip39.to_entropy('usage video strategy recall chair brown enforce leopard liar captain churn pill usage column save copper kitten panel heavy bless history business attack sauce')
    pair = tfwallet.assymetric_key_pair_generate(entropy, 0)
    jsass.equals(pair.key_secret, '68a5d13bd36777e09aaa38c99f269e3753276cc960a80447157614a2b71b76290e2975598765b233a73cdc7cf467468454788701b3dc6fa7bb05e0d332b5551c')
    uh = tfwallet.unlockhash_from_assymetric_key_pair(pair)
    address = uh.__str__()
    jsass.equals(address, '01ed90bee1d6d50b730a1aacf2890ac6fc0f7718849fba5f7c5719e3cfcc4641be09c5607b0210')

def tests():
    test_assymetric_key_pair_generate()
