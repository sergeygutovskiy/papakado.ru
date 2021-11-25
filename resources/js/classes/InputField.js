export default class InputField {
    constructor({ required }) {
        this.value = '';
        this._required = required;
    }

    get is_required() {
        return this._required;
    }

    get is_valid() {
        return ( this._required && this.value.length > 0 ) || ( !this._required );
    }
} 