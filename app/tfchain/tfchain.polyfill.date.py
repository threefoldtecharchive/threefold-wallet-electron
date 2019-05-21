import re

from tfchain.polyfill.jsmods.datejs import api as datejs

import tfchain.polyfill.encoding.str as jsstr
import tfchain.polyfill.encoding.decimal as jsdec

from datetime import timedelta

class Date:
    _EPOCH_DATE = datejs.parse("1970/01/01 00:00:00 UTC")

    def __init__(self, obj):
        if isinstance(obj, str):
            self._date = datejs.parse(str)
        if isinstance(obj, (int, float)):
            self._date = Date._EPOCH_DATE.addSeconds(obj)
        elif isinstance(obj, Date):
            self._date = obj._date
        else:
            self._date = obj

    def __str__(self):
        return self._date.toString()

    def timestamp(self):
        return Date._EPOCH_DATE.getElapsed(self._date) // 1000


_duration_re = re.compile(r'^((?P<days>[\.\d]+?)d)?((?P<hours>[\.\d]+?)h)?((?P<minutes>[\.\d]+?)m)?((?P<seconds>[\.\d]+?)s)?$')
def parse_duration(v):
    """
    support following formats:
    - None, 0: means undefined date
    - seconds = int
    - 1 (seconds)
    - 1s (seconds)
    - 2m (minutes)
    - 3h (hours)
    - 4d (days)
    - 1d4h2m3s (can also combine multiple, has to be from biggest to smallest and each unit has to be unique (e.g. cannot have 2 times hour specified))
    will return seconds
    """
    if v in [0, "0", None, ""]:
        return 0
    if isinstance(v, str):
        v = jsstr.String(v).replace("'", "").replace("\"", "").strip()
        if v.isdigit():
            return jsstr.to_int(v) # shortcut for when string is an integer
        parts = _duration_re.match(v.value)
        if parts is None:
            raise ValueError(
                "Could not parse any time information from '{}'.  Examples of valid strings: '8h', '2d8h5m20s', '2m4s'".format(v.value))
        time_params = {name: jsdec.Decimal(param).__float__() for name, param in parts.groupdict().items() if param}
        return int(timedelta(**time_params).total_seconds())
    elif isinstance(v, int):
        return v
    else:
        raise ValueError(
            "Input needs to be string or int: {} ({})".format(v, type(v)))
