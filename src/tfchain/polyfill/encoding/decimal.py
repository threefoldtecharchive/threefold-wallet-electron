from tfchain.polyfill.encoding.jsmods.decimaljs import api as jsdec

import tfchain.polyfill.encoding.str as jsstr

class Decimal:
    def __init__(self, value=None):
        if value is None:
            value = '0'
        if isinstance(value, Decimal):
            self._value = value.value
        else:
            output = None
            error = None
            __pragma__("js", "{}", """
            try {
                output = jsdec.new_decimal(value);
            } catch(e) {
                error = e;
            }
            """)
            if error is not None:
                raise ValueError(error)
            self._value = output

    @property
    def value(self):
        return self._value

    def as_tuple(self):
        # get sign
        sign = jsdec.sign(self.value)
        sign = 1 if sign < 0 else 0
        # get digits
        digits = [jsstr.to_int(s) for s in jsstr.split(jsstr.from_int(self.__int__()))]
        # get exponent
        exponent = self.value.decimalPlaces()
        exponent = 0 if exponent > 0 else exponent-1
        # return them all
        return (sign, digits, exponent)

    def str(self, prec=None):
        if isinstance(prec, int):
            if prec <= 0:
                return jsstr.from_int(self.__int__())
            return self.value.toNearest('.' + jsstr.repeat('0', prec-1) + '1').toString()
        return self.value.toString()

    def __str__(self):
        return self.str()

    def __int__(self):
        return self.value.truncated().toNumber()

    def __float__(self):
        return self.value.toNumber()

    def __neg__(self):
        return Decimal(self.value.negated())

    def __pos__(self):
        return Decimal(self.value)

    def __abs__(self):
        return Decimal(self.value.absoluteValue())

    def __eq__(self, other):
        if not isinstance(other, Decimal):
            return self.__eq__(Decimal(other))
        return self.value.equals(other.value)
    def __ne__(self, other):
        return not self.__eq__(other)

    def __add__(self, other):
        if not isinstance(other, Decimal):
            return self.__add__(Decimal(other))
        return Decimal(self.value.plus(other.value))
    def __sub__(self, other):
        if not isinstance(other, Decimal):
            return self.__sub__(Decimal(other))
        return Decimal(self.value.minus(other.value))

    def __mul__(self, other):
        if not isinstance(other, Decimal):
            return self.__mul__(Decimal(other))
        return Decimal(self.value.times(other.value))
    def __truediv__(self, other):
        if not isinstance(other, Decimal):
            return self.__truediv__(Decimal(other))
        return Decimal(self.value.dividedBy(other.value))
    def __mod__(self, other):
        if not isinstance(other, Decimal):
            return self.__mod__(Decimal(other))
        return Decimal(self.value.modulo(other.value))

    def __iadd__(self, other):
        if not isinstance(other, Decimal):
            return self.__iadd__(Decimal(other))
        self._value = self.value.plus(other.value)
        return self
    def __isub__(self, other):
        if not isinstance(other, Decimal):
            return self.__isub__(Decimal(other))
        self._value = self.value.minus(other.value)
        return self

    def __imul__(self, other):
        if not isinstance(other, Decimal):
            return self.__imul__(Decimal(other))
        self._value = self.value.times(other.value)
        return self
    def __itruediv__(self, other):
        if not isinstance(other, Decimal):
            return self.__itruediv__(Decimal(other))
        self._value = self.value.dividedBy(other.value)
        return self
    def __imod__(self, other):
        if not isinstance(other, Decimal):
            return self.__imod__(Decimal(other))
        self._value = self.value.modulo(other.value)
        return self

    def __lt__(self, other):
        if not isinstance(other, Decimal):
            return self.__lt__(Decimal(other))
        return self.value.lessThan(other.value)
    def __gt__(self, other):
        if not isinstance(other, Decimal):
            return self.__gt__(Decimal(other))
        return self.value.greaterThan(other.value)
    def __le__(self, other):
        if not isinstance(other, Decimal):
            return self.__le__(Decimal(other))
        return self.value.lessThanOrEqualTo(other.value)
    def __ge__(self, other):
        if not isinstance(other, Decimal):
            return self.__ge__(Decimal(other))
        return self.value.greaterThanOrEqualTo(other.value)
