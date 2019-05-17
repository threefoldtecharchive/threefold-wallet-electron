class BaseJSONObject:
    @classmethod
    def from_json(cls, obj):
        raise NotImplementedError("from_json has not yet been implemented")

    def json(self):
        raise NotImplementedError("from_json has not yet been implemented")
