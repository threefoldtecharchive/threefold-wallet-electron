"""
Public TFChain Errors
"""

import tfchain.polyfill.encoding.object as jsobj

from datetime import datetime

class TFChainBaseException(Exception):
    def str(self):
        return self.__str__()


class NotFoundError(TFChainBaseException):
    """
    NotFoundError error
    """


class InvalidPublicKeySpecifier(TFChainBaseException):
    """
    InvalidPublicKeySpecifier error
    """


class UnknownTransansactionVersion(TFChainBaseException):
    """
    UnknownTransansactionVersion error
    """


class InsufficientFunds(TFChainBaseException):
    """
    InsufficientFunds error
    """


class CurrencyPrecisionOverflow(TFChainBaseException):
    """
    CurrencyPrecisionOverflow error, caused when the value is too precise
    """
    def __init__(self, value):
        super().__init__("value {} is too precise to be a value, can have only 9 numbers after the decimal point".format(value))
        self._value = value

    @property
    def precision(self):
        """
        The precision of the value that caused the overflow.
        """
        _, _, exp = self.value
        return abs(exp)

    @property
    def value(self):
        """
        The value that caused the overflow.
        """
        return self._value

class CurrencyNegativeValue(TFChainBaseException):
    """
    CurrencyNegativeValue error, caused when the value is negative
    """
    def __init__(self, value):
        super().__init__("currency has to be at least 0, while value {} is negative".format(value))
        self._value = value

    @property
    def value(self):
        """
        The value that caused the overflow.
        """
        return self._value


class ExplorerError(TFChainBaseException):
    """
    Generic Explorer error
    """
    def __init__(self, message, endpoint):
        super().__init__("{}: {}".format(endpoint, message))
        if not isinstance(endpoint, str):
            raise TypeError("invalid endpoint, expected it to be of type str not {}".format(type(endpoint)))
        self._endpoint = endpoint
    
    @property
    def endpoint(self):
        """
        The endpoint that was called.
        """
        return self._endpoint


class ExplorerUserError(ExplorerError):
    """
    ExplorerUserError error
    """

class ExplorerNoContent(ExplorerError):
    """
    ExplorerNoContent error

    NOTE: normally it should be a User error, but due to forks it could also
          be caused by an explorer node not up to date with the actual fork
    """

class ExplorerBadRequest(ExplorerUserError):
    """
    ExplorerBadRequest error
    """

class ExplorerServerError(ExplorerError):
    """
    ExplorerServerError error
    """

class ExplorerServerPostError(ExplorerError):
    """
    ExplorerServerPostError error
    """
    def __init__(self, message, endpoint, data):
        super().__init__(message, endpoint)
        self._data = data
    
    @property
    def data(self):
        """
        The data that could not be posted.
        """
        return self._data

class ExplorerNotAvailable(ExplorerError):
    """
    ExplorerNotAvailable error
    """
    def __init__(self, message, endpoint, addresses):
        super().__init__(message, endpoint)
        if not isinstance(addresses, list):
            raise TypeError("invalid addresses, expected it to be of type list not {}".format(type(addresses)))
        self._addresses = addresses

    @property
    def addresses(self):
        """
        The addresses that were used to try to reach an explorer.
        """
        return self._addresses

class ExplorerInvalidResponse(ExplorerError):
    """
    ExplorerInvalidResponse error
    """
    def __init__(self, message, endpoint, response):
        super().__init__(message, endpoint)
        if not isinstance(response, dict) and not jsobj.is_js_obj(response):
            raise TypeError("invalid response, expected it to be of type dict not {}".format(type(response)))
        self._response = response

    @property
    def response(self):
        """
        The invalid response
        """
        return self._response


class DoubleSignError(TFChainBaseException):
    """
    DoubleSignError error
    """


class AtomicSwapInsufficientAmountError(TFChainBaseException):
    """
    AtomicSwapInsufficientAmountError error,
    triggered when creating a contract with an amount equal or lower than
    minimum fee, which isn't allowed as such a contract cannot be redeemed/refunded.
    """
    def __init__(self, amount, minimum_miner_fee):
        super().__init__(
            "atomic swap contract requires an amount higher than the minimum miner fee ({}): {} is an invalid value".format(
                minimum_miner_fee, amount))
        self._amount = amount
        self._minimum_miner_fee = minimum_miner_fee

    @property
    def amount(self):
        """
        The insufficient amount that was used.
        """
        return self._amount

    @property
    def minimum_miner_fee(self):
        """
        The minimum miner fee required on the network used.
        """
        return self._minimum_miner_fee


class AtomicSwapContractError(TFChainBaseException):
    """
    AtomicSwapError generic Base error,
    containing the contract that went wrong.
    """
    def __init__(self, message, contract):
        super().__init__(message)
        self._contract = contract

    @property
    def contract(self):
        """
        The contract that was verified against.
        """
        return self._contract

class AtomicSwapForbidden(AtomicSwapContractError):
    """
    AtomicSwapForbidden error, caused when a contract was trying
    to be spent by an unautohorized wallet.
    """

class AtomicSwapInvalidSecret(AtomicSwapContractError):
    """
    AtomicSwapInvalidSecret error, caused when a wrong secret was used
    as an attempt to redeem an atomic swap contract. 
    """
    def __init__(self, contract):
        super().__init__(message="defined secret does not match the atomic swap's contract secret hash", contract=contract)

class AtomicSwapContractInvalid(AtomicSwapContractError):
    """
    AtomicSwapContractInvalid error, caused when a contract was deemed
    invalid during verification.
    """

class AtomicSwapContractSpent(AtomicSwapContractError):
    """
    AtomicSwapContractSpent error, caused when
    a callee tried to spend a contract that was already spent.
    """
    def __init__(self, contract, transaction):
        txid = getattr(transaction, 'id', '')
        super().__init__(message="atomic swap contract has already been spent in transaction {}".format(txid), contract=contract)
        self._transaction = transaction

    @property
    def transaction(self):
        """
        The transaction in which the contract was spent.
        """
        return self._transaction

class AtomicSwapContractNotFound(TFChainBaseException):
    """
    AtomicSwapContractNotFound error, caused when
    a callee tried to get an atomic swap contract that could not be found.
    """
    def __init__(self, outputid):
        super().__init__("atomic swap contract {} could not be found".format(outputid))
        self._outputid = outputid

    @property
    def outputid(self):
        """
        The outputid that was used to look up the contract that could not be found.
        """
        return self._outputid


class ThreeBotNotFound(TFChainBaseException):
    """
    ThreeBotNotFound error, triggered when a 3Bot was not found.
    """
    def __init__(self, identifier):
        super().__init__("3Bot {} could not be found".format(identifier))
        self._identifier = identifier

    @property
    def identifier(self):
        """
        The (unique) identifier of the 3Bot that could not be found.
        """
        return self._identifier


class ThreeBotInactive(TFChainBaseException):
    """
    ThreeBotInactive error, triggered when a 3Bot is an active,
    and the operation to be applied to the 3Bot would not change that fact.
    """
    def __init__(self, identifier, expiration):
        super().__init__("3Bot {} is inactive since {}".format(identifier, datetime.utcfromtimestamp(expiration)))
        self._identifier = identifier
        self._expiration = expiration

    @property
    def identifier(self):
        """
        The (unique) identifier of the 3Bot that could not be found.
        """
        return self._identifier

    @property
    def expiration(self):
        """
        The timestamp on which the 3Bot became inactive.
        """
        return self._expiration


class AddressNotInWallet(TFChainBaseException):
    """
    AddressNotInWallet error, triggered
    when trying to use an address on a wallet that does not own it
    """
    def __init__(self, address):
        super().__init__("address {} is not owned by the used wallet".format(address))
        self._address = address

    @property
    def address(self):
        """
        The address attempted to be used.
        """
        return self._address


class ERC20RegistrationForbidden(TFChainBaseException):
    """
    ERC20RegistrationForbidden error, triggered
    when trying to register an ERC20 address not owned by the used wallet.
    """
    def __init__(self, address):
        super().__init__("address {} is not owned by the used wallet".format(address))
        self._address = address

    @property
    def address(self):
        """
        The address attempted to be registered.
        """
        return self._address
