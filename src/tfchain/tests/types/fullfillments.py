
from tfchain.types.CryptoTypes import PublicKey
from tfchain.types.PrimitiveTypes import Hash
from tfchain.types.ConditionTypes import UnlockHash, ConditionNil, \
    ConditionUnlockHash, ConditionAtomicSwap, ConditionMultiSignature, AtomicSwapSecret
import tfchain.types.FulfillmentTypes as FulfillmentTypes
from tfchain.polyfill.encoding.json import json_loads
from tfchain.encoding.rivbin import RivineBinaryEncoder, RivineBinaryObjectEncoderBase
from tfchain.encoding.siabin import SiaBinaryEncoder, SiaBinaryObjectEncoderBase
import tfchain.tests.jsassert as jsass

def test_fulfillments():
    def test_encoded(encoder, obj, expected):
        encoder.add(obj)
        jsass.equals(encoder.data, expected)

    def test_sia_encoded(obj, expected):
        test_encoded(SiaBinaryEncoder(), obj, expected)

    def test_rivine_encoded(obj, expected):
        test_encoded(RivineBinaryEncoder(), obj, expected)

    # single signature fulfillments are supported
    ss_json = json_loads('{"type":1,"data":{"publickey":"ed25519:dda39750fff2d869badc797aaad1dea8c6bcf943879421c58ac8d8e2072d5b5f","signature":"818dfccee2cb7dbe4156169f8e1c5be49a3f6d83a4ace310863d7b3b698748e3e4d12522fc1921d5eccdc108b36c84d769a9cf301e969bb05db1de9295820300"}}')
    ssf = FulfillmentTypes.from_json(ss_json)
    jsass.equals(ssf.json(), ss_json)
    test_sia_encoded(ssf, '018000000000000000656432353531390000000000000000002000000000000000dda39750fff2d869badc797aaad1dea8c6bcf943879421c58ac8d8e2072d5b5f4000000000000000818dfccee2cb7dbe4156169f8e1c5be49a3f6d83a4ace310863d7b3b698748e3e4d12522fc1921d5eccdc108b36c84d769a9cf301e969bb05db1de9295820300')
    test_rivine_encoded(ssf, '01c401dda39750fff2d869badc797aaad1dea8c6bcf943879421c58ac8d8e2072d5b5f80818dfccee2cb7dbe4156169f8e1c5be49a3f6d83a4ace310863d7b3b698748e3e4d12522fc1921d5eccdc108b36c84d769a9cf301e969bb05db1de9295820300')
    jsass.is_true(ssf.is_fulfilled(ConditionUnlockHash()))

    # atomic swap fulfillments are supported
    as_json = json_loads('{"type":2,"data":{"publickey":"ed25519:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","signature":"abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab","secret":"def789def789def789def789def789dedef789def789def789def789def789de"}}')
    asf = FulfillmentTypes.from_json(as_json)
    jsass.equals(asf.json(), as_json)
    test_sia_encoded(asf, '02a000000000000000656432353531390000000000000000002000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4000000000000000abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabdef789def789def789def789def789dedef789def789def789def789def789de')
    test_rivine_encoded(asf, '02090201ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabdef789def789def789def789def789dedef789def789def789def789def789de')
    jsass.is_true(asf.is_fulfilled(ConditionAtomicSwap()))
    # atomic swap fulfillments without secrets are supported
    as_json = json_loads('{"type":2,"data":{"publickey":"ed25519:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","signature":"abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab"}}')
    asf = FulfillmentTypes.from_json(as_json)
    jsass.equals(asf.json(), as_json)
    test_sia_encoded(asf, '028000000000000000656432353531390000000000000000002000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4000000000000000abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab')
    test_rivine_encoded(asf, '02c401ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab')
    jsass.is_true(asf.is_fulfilled(ConditionAtomicSwap()))

    # multi signature fulfillments are supported
    ms_json = json_loads('{"type":3,"data":{"pairs":[{"publickey":"ed25519:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","signature":"abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab"},{"publickey":"ed25519:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","signature":"abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab"}]}}')
    msf = FulfillmentTypes.from_json(ms_json)
    jsass.equals(msf.json(), ms_json)
    test_sia_encoded(msf, '0308010000000000000200000000000000656432353531390000000000000000002000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4000000000000000abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab656432353531390000000000000000002000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4000000000000000abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab')
    test_rivine_encoded(msf, '0315030401ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab01ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab')
    jsass.is_true(msf.is_fulfilled(ConditionMultiSignature(min_nr_sig=1)))
    jsass.is_true(msf.is_fulfilled(ConditionMultiSignature(min_nr_sig=2)))

def tests():
   test_fulfillments()
