class Currency {
    constructor(value) {
        this._value = value;
    }

    get get_value() {
        return this._value;
    }

    get get_formatted() {
        return this.get_value + ' ₽';
    }
}

Currency.prototype.valueOf = function() { return this.get_value; }

export default Currency;