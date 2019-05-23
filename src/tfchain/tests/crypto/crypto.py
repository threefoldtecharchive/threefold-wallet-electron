from tfchain.crypto.merkletree import Tree
from tfchain.polyfill.crypto import blake2b
import tfchain.tests.jsassert as jsass

def test_basic_merkletree():
    tree = Tree(hash_func=blake2b)
    tree.push(bytearray([1]))
    tree.push(bytearray([2]))
    tree.push(bytearray([3]))
    tree.push(bytearray([4]))
    tree.push(bytearray([5]))
    root = tree.root()
    jsass.equals(root, '0002789a97a9feee38af3709f06377ef0ad7d91407cbcad1ccb8605556b6578e')
    # print('Root is {}'.format(root))

def tests():
    test_basic_merkletree()
