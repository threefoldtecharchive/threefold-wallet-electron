import tfchain.polyfill.json as jsjson 
import tfchain.polyfill.encode as jsencode

from tfchain.polyfill.jsmods.sjcl import api as sjcl
from tfchain.polyfill.jsmods.blakejs import api as b2b
from tfchain.polyfill.jsmods.tweetnacljs import api as nacl

def random(n):
  digest = ''
  __pragma__("js", "{}", """
  const words = sjcl.random.randomWords((n+3)/4);
  digest = sjcl.codec.hex.fromBits(words);
  """)
  return jsencode.hex_to_buffer(digest)

def sha256(data):
  data = jsencode.buffer_to_hex(data)
  digest = ''
  __pragma__("js", "{}", """
  const input = sjcl.codec.hex.toBits(data);
  const words = sjcl.hash.sha256.hash(input)
  digest = sjcl.codec.hex.fromBits(words);
  """)
  return jsencode.hex_to_buffer(digest)


class SymmetricKey:
  """
  Used to encrypt and decrypt text using a symmetric AES key.
  A new key will be generated for each encryption call,
  always using the callee-defined password to derive a new key using a random salt.
  The encryption is also protected using a random init vector, also unique per call.
  """

  def __init__(self, password):
    if not password:
      raise ValueError("no password is given, while one is expected")
    if not isinstance(password, str):
      raise TypeError("password has to be a str, not be of type {}".format(type(str)))
    self._password = password

  @property
  def password(self):
    """
    :returns: the callee-chosen password used as input for this key
    :rtype: str
    """
    return self._password

  def encrypt(self, pt):
    """
    Encrypt the given plain text.
    """
    if not isinstance(pt, str):
      pt = jsjson.json_dumps(pt)
    if not pt:
      raise ValueError("no plain text given to encrypt")
    password = self._password
    salt = None
    iv = None
    ct = None
    __pragma__("js", "{}", """
    const output = sjcl.encrypt(password, pt);
    const result = JSON.parse(output);
    salt = result.salt;
    iv = result.iv;
    ct = result.ct;
    """)
    return (ct, RandomSymmetricEncryptionInput(iv, salt))

  def decrypt(self, ct, rsei):
    """
    Decrypt the given cipher text.
    """
    # validate parameters
    if not isinstance(ct, str):
      raise TypeError("cipher text was expected to be a base64-encoded string, not be of type {}".format(type(ct)))
    if not ct:
      raise ValueError("no cipher text given to decrypt")
    if not isinstance(rsei, RandomSymmetricEncryptionInput):
      raise TypeError("rsei was expected to be of type RandomSymmetricEncryptionInput, not be of type {}".format(type(rsei)))

    password = self._password
    # assemble key and decrypt
    pt = None
    __pragma__("js", "{}", """
    const payload = JSON.stringify({
      "ct": ct,
      "iv": rsei.init_vector,
      "salt": rsei.salt,
    });
    pt = sjcl.decrypt(password, payload);
    """)
    return pt


class RandomSymmetricEncryptionInput:
  """
  Input that was used to derive a secure one-time Symmetric key (together with a user-defined password),
  as to be able to encrypt/decrypt given data with an init vector.
  """

  def __init__(self, iv, salt):
    """
    Create a Random Symmetric Encryption Input,
    as the result for encryption, or in order to decrypt already encrypted text.

    :param iv: init vector (base64-encoded) used once to encrypt a text, as a defensive mechanism
    :type iv: str
    :param salt: salt used to derive a key, as a defensive mechanism
    :type salt: str
    """
    # validate input
    for (label, prop) in [("init vector", iv), ("salt", salt)]:
      if not prop:
        raise ValueError("no " + label  + " is given while it is expected")
      if not isinstance(prop, str):
        raise TypeError(label + " is expected to be of type str, not be of type {}".format(type(prop)))
    # assign the props
    self._iv = iv
    self._salt = salt

  @property
  def init_vector(self):
    """
    :returns: the init vector used as input for the symmetric encryption
    :rtype: str
    """
    return self._iv

  @property
  def salt(self):
    """
    :returns: the salt used to derive a one-time symmetric key
    :rtype: str
    """
    return self._salt


def blake2b(input):
  """
  Hash the given input to a blake2b_256 32-bytes array.

  :param input: input to be hashed
  :type input: str
  :returns: the 32-byte hash matching the given input
  :rtype: bytes
  """
  output = None
  __pragma__("js", "{}", """
  output = b2b.blake2b(input, null, 32);
  """)
  return output

def blake2b_hex(input):
  """
  Hash the given input to a blake2b_256 hex-encoded str
  of length 64 (original byte size is 32).

  :param input: input to be hashed
  :type input: str
  :returns: the hex-encoded hash matching the given input
  :rtype: str
  """
  output = None
  __pragma__("js", "{}", """
  output = b2b.blake2bHex(input, null, 32);
  """)
  return output


class AssymetricSignKeyPair:
  """
  Used to create and verify ED25519 Signatures.
  """

  def __init__(self, entropy):
    if not entropy:
      raise ValueError("no entropy is given, while it is expected as input for the key pair generation")
    self._entropy = entropy
    self._key_pair = nacl.sign.keyPair.fromSeed(entropy)

  @property
  def entropy(self):
    """
    :returns: the callee-chosen entropy used as input for this key pair
    :rtype: bytes (Uint8Array)
    """
    return self._entropy

  @property
  def key_secret(self):
    """
    :returns: the generated secret key
    """
    return self._key_pair.secretKey

  @property
  def key_public(self):
    """
    :returns: the generated public key
    """
    return self._key_pair.publicKey

  def sign(self, message):
    """
    Sign a binary message.

    :returns: a raw binary signature
    """
    return nacl.sign.detached(message, self._key_pair.secretKey)

  def verify(self, message, signature):
    """
    Verify a signature.

    :returns: True if verification succeeded, False otherwise
    """
    return nacl.sign.detached.verify(message, signature, self._key_pair.publicKey)
