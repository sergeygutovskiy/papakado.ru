export default class Currency {
    private _value: number
    private _symbol : string = ' ₽'

    constructor(value: number, symbol?: string) {
        this._value = value;

        if (symbol) this._symbol = symbol;
    }


    set value(new_value: number) {
        this._value = new_value;
    }
    get value() : number {
        return this._value;
    }
    
    get formatted() : string {
        return this._value + this._symbol;
    }
}