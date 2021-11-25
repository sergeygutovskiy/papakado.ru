export default class Setting {
    id: number
    label: string
    value: string

    constructor({ 
        id,
        label, 
        value,
    } : {
        id: number,
        label: string,
        value: string,
    }) {
        this.id = id;
        this.label = label;
        this.value = value;
    }
}