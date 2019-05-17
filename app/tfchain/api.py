import tfchain.crypto.merkletree as mtree
import tfchain.explorer as tfexplorer
import tfchain.encoding.json as tfjson
import tfchain.polyfill as jspolyfill

class Tree:
    def __init__(self):
        self._tree = mtree.Tree(None)

    def hello(self):
        print(type(self._tree))

ExplorerClient = tfexplorer.ExplorerClient

class Answer(tfjson.BaseJSONObject):
    def __init__(self, answer):
        self._answer = answer

    @property
    def answer(self):
        return self._answer

    def answer_str(self):
        return "the answer is: {}".format(self.answer)

    @classmethod
    def from_json(cls, obj):
        answer = obj['answer']
        if not isinstance(answer, int):
            raise TypeError("answer has to be of type int, not be of type {}".format(type(answer)))
        if 'banner' in obj:
            print(obj['banner'])
        return Answer(answer)

    def json(self):
        return {
            'answer': self._answer,
            'banner': 'sponsered by poca-pola and Dylan Co',
        }

json_dumps = jspolyfill.json_dumps
json_loads = jspolyfill.json_loads

def foo():
    print(isinstance(Answer(42), tfjson.BaseJSONObject))
