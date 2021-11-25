export default class FormField {
    value: string = ''
    required: boolean

    private validator: (value: string) => boolean = (value) => value.length > 0;

    constructor(required?: boolean, validator?: (value: string) => boolean) {
        this.required = required ? required : false;
        if ( validator ) this.validator = validator
    }

    get valid() : boolean { return this.required ? this.validator(this.value) : true; }
}