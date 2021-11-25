export default class Toast {
    key: number
    text: string
    style: string

    constructor({
        text,
        style
    } : {
        text: string,
        style: string
    }) {
        this.text = text;
        this.style = style;

        this.key = Date.now();
    }
}