import tfchain.crypto.merkletree as mtree
import tfchain.explorer as tfexplorer

class Tree:
    def __init__(self):
        self._tree = mtree.Tree(None)

    def hello(self):
        print(type(self._tree))

ExplorerClient = tfexplorer.ExplorerClient
